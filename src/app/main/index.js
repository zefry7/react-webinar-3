import React, {useCallback} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";

function Main({store}) {

  const state = store.getState();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(code => store.actions.basket.addToBasket(code), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={state.basket.amount}
                  sum={state.basket.sum}/>
      <List list={state.catalog.list} renderItem={renders.item}/>
    </PageLayout>

  );
}

export default React.memo(Main);
