import StoreModule from '../module';

<<<<<<< HEAD
class Modals extends StoreModule {
=======
class ModalsState extends StoreModule {
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
  initState() {
    return {
      name: null,
    };
  }

  open(name) {
    this.setState({ name }, `Открытие модалки ${name}`);
  }

  close() {
    this.setState({ name: null }, `Закрытие модалки`);
  }
}

<<<<<<< HEAD
export default Modals;
=======
export default ModalsState;
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
