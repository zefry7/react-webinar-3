import {memo, useCallback, useEffect, useMemo} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Menu from "../../components/menu";
import SideLayout from "../../components/side-layout";
import Pagination from "../../components/pagination";
import Spinner from "../../components/spinner";
import Select from "../../components/select";

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.setParams({page: 1});
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    params: state.catalog.params,
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    count: state.catalog.count,
    waiting: state.catalog.waiting,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Пагинация
    onPaginate: useCallback(page => store.actions.catalog.setParams({page}), [store]),
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
  }

  const renders = {
    item: useCallback(item => (
      <Item item={item} onAdd={callbacks.addToBasket} link={`/articles/${item._id}`}/>
    ), [callbacks.addToBasket]),
  };

  const options = {
    menu: useMemo(() => ([
      {key: 1, title: 'Главная', link: '/'},
    ]), []),
    sort: useMemo(() => ([
      {value:'order', title: 'По порядку'},
      {value:'title.ru', title: 'По именованию'},
      {value:'-price', title: 'Сначала дорогие'},
      {value:'edition', title: 'Древние'},
    ]), [])
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <SideLayout side='between'>
        <Menu items={options.menu}/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum}/>
      </SideLayout>
      <SideLayout padding='medium'>
        <Select options={options.sort} onChange={callbacks.onSort}/>
      </SideLayout>
      <Spinner active={select.waiting}>
        <List list={select.list} renderItem={renders.item}/>
        <Pagination count={select.count} page={select.page} limit={select.limit} onChange={callbacks.onPaginate}/>
      </Spinner>
    </PageLayout>

  );
}

export default memo(Main);
