import StoreModule from '../module';

<<<<<<< HEAD
class Basket extends StoreModule {
=======
/**
 * Покупательская корзина
 */
class BasketState extends StoreModule {
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0,
    };
  }

  /**
   * Добавление товара в корзину
<<<<<<< HEAD
   * @param _id Код товара
   */
  addToBasket(_id) {
=======
   * @param _id {String} Код товара
   */
  async addToBasket(_id) {
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
    let sum = 0;
    // Ищем товар в корзине, чтобы увеличить его количество
    let exist = false;
    const list = this.getState().list.map(item => {
      let result = item;
      if (item._id === _id) {
        exist = true; // Запомним, что был найден в корзине
        result = { ...item, amount: item.amount + 1 };
      }
      sum += result.price * result.amount;
      return result;
    });

    if (!exist) {
      // Поиск товара в каталоге, чтобы его добавить в корзину.
<<<<<<< HEAD
      // @todo В реальном приложении будет запрос к АПИ вместо поиска по состоянию.
      const item = this.store.getState().catalog.list.find(item => item._id === _id);
=======
      const response = await fetch(`/api/v1/articles/${_id}`);
      const json = await response.json();
      const item = json.result;

>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
      list.push({ ...item, amount: 1 }); // list уже новый, в него можно пушить.
      // Добавляем к сумме.
      sum += item.price;
    }

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
      },
      'Добавление в корзину',
    );
  }

  /**
   * Удаление товара из корзины
   * @param _id Код товара
   */
  removeFromBasket(_id) {
    let sum = 0;
    const list = this.getState().list.filter(item => {
      if (item._id === _id) return false;
      sum += item.price * item.amount;
      return true;
    });

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
      },
      'Удаление из корзины',
    );
  }
}

<<<<<<< HEAD
export default Basket;
=======
export default BasketState;
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
