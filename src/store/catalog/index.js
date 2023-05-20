import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule{

  constructor() {
    super();
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [
        {code: this.generateCode(), title: 'Название товара', price: 100.0},
        {code: this.generateCode(), title: 'Книга про React', price: 770},
        {code: this.generateCode(), title: 'Конфета', price: 33},
        {code: this.generateCode(), title: 'Трактор', price: 7955320},
        {code: this.generateCode(), title: 'Телефон iPhone XIXV', price: 120000},
        {code: this.generateCode(), title: 'Карандаши цветные', price: 111},
        {code: this.generateCode(), title: 'Товар сюрприз', price: 0},
      ]
    }
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.getState(),
      list: [...this.getState().list, {code: this.generateCode(), title: 'Новая запись'}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      // Новый список, в котором не будет удаляемой записи
      list: this.getState().list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      list: this.getState().list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1
          };
        }
        // Сброс выделения если выделена
        return item.selected ? {...item, selected: false} : item;
      })
    })
  }
}

export default Catalog;
