import StoreModule from "../module";

class Basket extends StoreModule {

  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0
    }
  }

  /**
   * Добавление товара в корзину
   * @param code Код товара
   */
  addToBasket(code) {
    let sum = 0;
    // Ищем товар в корзине, чтобы увеличить его количество
    let exist = false;
    const list = this.getState().list.map(item => {
      let result = item;
      if (item.code === code) {
        exist = true; // Запомним, что был найден в корзине
        result = {...item, amount: item.amount + 1};
      }
      sum += result.price * result.amount;
      return result;
    });

    if (!exist) {
      // Поиск товара в каталоге, чтобы его добавить в корзину.
      // @todo В реальном приложении будет запрос к АПИ вместо поиска по состоянию.
      const item = this.store.getState().catalog.list.find(item => item.code === code);
      list.push({...item, amount: 1}); // list уже новый, в него можно пушить.
      // Добавляем к сумме.
      sum += item.price;
    }

    this.setState({
      ...this.getState(),
      list,
      sum,
      amount: list.length
    }, 'Добавление в корзину');
  }

  /**
   * Удаление товара из корзины
   * @param code Код товара
   */
  removeFromBasket(code) {
    let sum = 0;
    const list = this.getState().list.filter(item => {
      if (item.code === code) return false;
      sum += item.price * item.amount;
      return true;
    });

    this.setState({
      ...this.getState(),
      list,
      sum,
      amount: list.length
    }, 'Удаление из корзины');
  }
}

export default Basket;
