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
import Input from "../../components/input";
import useInit from "../../hooks/use-init";

function Main() {

  const store = useStore();

  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);

  const select = useSelector(state => ({
    list: state.catalog.list,
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    count: state.catalog.count,
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
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
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // генератор ссылки для пагинатора
    makePaginatorLink: useCallback((page) => {
      return `?${new URLSearchParams({
        page,
        limit: select.limit,
        sort: select.sort,
        query: select.query
      })}`;
    }, [select.limit, select.sort, select.query])
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
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]), [])
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <SideLayout side='between'>
        <Menu items={options.menu}/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </SideLayout>
      <SideLayout padding='medium'>
        <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
        <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
               delay={1000}/>
        <button onClick={callbacks.onReset}>Сброс</button>
      </SideLayout>
      <Spinner active={select.waiting}>
        <List list={select.list} renderItem={renders.item}/>
        <Pagination count={select.count} page={select.page} limit={select.limit}
                    onChange={callbacks.onPaginate} makeLink={callbacks.makePaginatorLink}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Main);
