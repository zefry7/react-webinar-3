import card from './components/card';
import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItemInCard(item) {
    let it = this.state.card.filter((v) => v.code == item.code)[0]
    if (it == null) {
      this.setState({
        ...this.state,
        card: [...this.state.card, { ...item, countItem: 1 }],
      });
    } else {
      this.setState({
        ...this.state,
        card: [...this.state.card.filter(v => v.code != it.code), { ...it, countItem: it.countItem + 1 }],
      });
    }
  }

  addInSumCard(price) {
    this.setState({
      ...this.state,
      sumCard: this.state.sumCard + price
    })
  }

  subInSumCard(price) {
    this.setState({
      ...this.state,
      sumCard: this.state.sumCard - price
    })
  }

  changeCountCard() {
    this.setState({
      ...this.state,
      countCard: this.state.card.length
    })
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItemInCard(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      card: this.state.card.filter(item => item.code !== code),
    });
  }
}

export default Store;
