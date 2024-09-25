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
  addItemInCart(code) {
    let item = this.state.cart.filter((v) => v.code == code)[0]
    if (item == null) {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...this.state.list.filter(v => v.code == code)[0], countItem: 1 }],
      });
    } else {
      this.setState({
        ...this.state,
        cart: [...this.state.cart.filter(v => v.code != code), { ...item, countItem: item.countItem + 1 }],
      });
    }
  }

  addInSumCart(price) {
    this.setState({
      ...this.state,
      sumCart: this.state.sumCart + price
    })
  }

  subInSumCart(price) {
    this.setState({
      ...this.state,
      sumCart: this.state.sumCart - price
    })
  }

  changeCountCart() {
    this.setState({
      ...this.state,
      countCart: this.state.cart.length
    })
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItemInCart(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: this.state.cart.filter(item => item.code !== code),
    });
  }
}

export default Store;
