import * as modules from './exports.js';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.listeners = []; // Слушатели изменений состояния
    this.state = initState;
    /** @type {{
<<<<<<< HEAD
     * basket: Basket,
     * catalog: Catalog,
     * modals: Modals
=======
     * basket: BasketState,
     * catalog: CatalogState,
     * modals: ModalsState,
     * article: ArticleState,
     * locale: LocaleState
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
     * }} */
    this.actions = {};
    for (const name of Object.keys(modules)) {
      this.actions[name] = new modules[name](this, name);
      this.state[name] = this.actions[name].initState();
    }
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
<<<<<<< HEAD
   * @returns {{basket: Object, catalog: Object, modals: Object}}
=======
   * @returns {{
   * basket: Object,
   * catalog: Object,
   * modals: Object,
   * article: Object,
   * locale: Object
   * }}
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState, description = 'setState') {
    console.group(
      `%c${'store.setState'} %c${description}`,
      `color: ${'#777'}; font-weight: normal`,
      `color: ${'#333'}; font-weight: bold`,
    );
    console.log(`%c${'prev:'}`, `color: ${'#d77332'}`, this.state);
    console.log(`%c${'next:'}`, `color: ${'#2fa827'}`, newState);
    console.groupEnd();

    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener(this.state);
  }
}

export default Store;
