/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}


export function changeLangText(lang = "ru", label = "", takeReady = true) {
  const listText = {
    "ru": {
      mainTitle: "Магазин",
      nav: "Главная",
      basketLabel: "В корзине",
      basketButton: "Перейти",
      basketEmpty: "пусто",
      basketTitle: "Корзина",
      buttonList: "Добавить",
      buttonBasket: "Удалить",
      closeButton: "Закрыть",
      textTotal: "Итого",
      textPrice: "Цена",
      yearRelease: "Год выпуска",
      textMadeIn: "Страна производитель",
      textCategory: "Категория"
    },
    "en": {
      mainTitle: "Store",
      nav: "Main",
      basketLabel: "In basket",
      basketButton: "Open",
      basketEmpty: "empty",
      basketTitle: "Basket",
      buttonList: "Add",
      buttonBasket: "Delete",
      closeButton: "Close",
      textTotal: "Total",
      textPrice: "Price",
      yearRelease: "Year of release",
      textMadeIn: "Country of origin",
      textCategory: "Category"
    }
  }

  return takeReady == true ? listText[lang][label] : label
}