<<<<<<< HEAD
import lang from '../../components/lang';
import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      maxPage: 0,
      page: 1,
      pageList: [],
      lang: "ru"
    };
  }

  async loadPageList() {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${(this.getState().page - 1) * 10}`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        pageList: json.result.items,
      },
      'Загружены товары из АПИ',
    );
  }

  async load() {
    const response = await fetch(`/api/v1/articles?limit=*`);
=======
import StoreModule from '../module';

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CatalogState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
      params: {
        page: 1,
        limit: 10,
        sort: 'order',
        query: '',
      },
      count: 0,
      waiting: false,
    };
  }

  /**
   * Инициализация параметров.
   * Восстановление из адреса
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async initParams(newParams = {}) {
    const urlParams = new URLSearchParams(window.location.search);
    let validParams = {};
    if (urlParams.has('page')) validParams.page = Number(urlParams.get('page')) || 1;
    if (urlParams.has('limit'))
      validParams.limit = Math.min(Number(urlParams.get('limit')) || 10, 50);
    if (urlParams.has('sort')) validParams.sort = urlParams.get('sort');
    if (urlParams.has('query')) validParams.query = urlParams.get('query');
    await this.setParams({ ...this.initState().params, ...validParams, ...newParams }, true);
  }

  /**
   * Сброс параметров к начальным
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async resetParams(newParams = {}) {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const params = { ...this.initState().params, ...newParams };
    // Установка параметров и загрузка данных
    await this.setParams(params);
  }

  /**
   * Установка параметров и загрузка списка товаров
   * @param [newParams] {Object} Новые параметры
   * @param [replaceHistory] {Boolean} Заменить адрес (true) или новая запись в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setParams(newParams = {}, replaceHistory = false) {
    const params = { ...this.getState().params, ...newParams };

    // Установка новых параметров и признака загрузки
    this.setState(
      {
        ...this.getState(),
        params,
        waiting: true,
      },
      'Установлены параметры каталога',
    );

    // Сохранить параметры в адрес страницы
    let urlSearch = new URLSearchParams(params).toString();
    const url = window.location.pathname + '?' + urlSearch + window.location.hash;
    if (replaceHistory) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }

    const apiParams = {
      limit: params.limit,
      skip: (params.page - 1) * params.limit,
      fields: 'items(*),count',
      sort: params.sort,
      'search[query]': params.query,
    };

    const response = await fetch(`/api/v1/articles?${new URLSearchParams(apiParams)}`);
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
<<<<<<< HEAD
        maxPage: Math.ceil(json.result.items.length / 10),
      },
    );
  }

  changePage(numberPage) {
    this.setState(
      {
        ...this.getState(),
        page: numberPage,
      },
    );
  }

  changeLang(lang) {
    this.setState(
      {
        ...this.getState(),
        lang: lang,
      },
=======
        count: json.result.count,
        waiting: false,
      },
      'Загружен список товаров из АПИ',
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
    );
  }
}

<<<<<<< HEAD
export default Catalog;
=======
export default CatalogState;
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
