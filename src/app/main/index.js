import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import { Outlet } from 'react-router-dom';
import { changeLangText } from '../../utils';
import WrapperList from '../../components/wrapper-list';

function Main() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    pageList: state.catalog.pageList,
    page: state.catalog.page,
    maxPage: state.catalog.maxPage,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.catalog.lang
  }));

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  useEffect(() => {
    store.actions.catalog.loadPageList();
  }, [select.page]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    changePage: useCallback((numberPage) => store.actions.catalog.changePage(numberPage), [store]),
    changeLang: useCallback((lang) => store.actions.catalog.changeLang(lang), [store])
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} textButton={changeLangText(select.lang, "buttonList")}/>;
      },
      [callbacks.addToBasket, select.lang],
    ),
  };

  return (
    <PageLayout>
      <Head title={changeLangText(select.lang, "mainTitle")} lang={select.lang} changeLang={callbacks.changeLang}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} lang={select.lang} />
      <WrapperList pageList={select.pageList} renderItem={renders.item} page={select.page} maxPage={select.maxPage} changePage={callbacks.changePage} />
    </PageLayout>
  );
}

export default memo(Main);
