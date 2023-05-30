import StoreModule from "../module";

class LocaleState extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      lang: 'ru'
    };
  }

  setLang(lang) {
    this.setState({lang}, 'Установлена локаль');
  }
}

export default LocaleState;
