/**
<<<<<<< HEAD
 * Базовый класс для модулей хранилища
=======
 * Базовый класс для модулей хранилища (внешнего состояния)
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
 * Для группировки действий над внешним состоянием
 */
class StoreModule {
  constructor(store, name) {
    this.store = store;
    this.name = name;
  }

  initState() {
    return {};
  }

  getState() {
    return this.store.getState()[this.name];
  }

  setState(newState, description = 'setState') {
    this.store.setState(
      {
        ...this.store.getState(),
        [this.name]: newState,
      },
      description,
    );
  }
}

export default StoreModule;
