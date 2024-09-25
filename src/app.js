import React, { useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import Item from './components/item';
import { convertingNumbeInPrice } from "./utils"
import "./style.css"
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [cartOpen, setCartOpen] = useState(false)
  const list = store.getState().list;
  const cart = store.getState().cart;
  const sumCart = store.getState().sumCart
  const countCart = store.getState().countCart

  const callbacks = {
    onAddItemInCart: (item) => {
      store.addItemInCart(item.code)
      store.addInSumCart(item.price)
      store.changeCountCart()
    },
    onDeleteInCart: (code) => {
      store.deleteItemInCart(code)
      let item = cart.filter((v) => v.code == code)[0]
      store.subInSumCart(item.price * item.countItem)
      store.changeCountCart()
    },
    onClosedCart: () => {
      setCartOpen(value => !value)
    }
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls onClosedCart={callbacks.onClosedCart} sumCartString={convertingNumbeInPrice(sumCart)} cart={cart} countCart={countCart} />
      <List
        list={list}
        onAddItemInCart={callbacks.onAddItemInCart}
      >
        <Item onAddItemInCart={callbacks.onAddItemInCart} />
      </List>
      <Modal activeModal={cartOpen}>
        <Cart cart={cart} onClosedCart={callbacks.onClosedCart} onDeleteInCart={callbacks.onDeleteInCart} sumCart={sumCart}/>
      </Modal>
    </PageLayout>
  );
}

export default App;
