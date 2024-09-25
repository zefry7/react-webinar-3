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
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
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
    );
  }
}

export default Catalog;
