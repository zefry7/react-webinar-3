import React, {useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";

function Basket({store}) {

  const state = store.getState();

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(code => store.actions.basket.removeFromBasket(code), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} onRemove={callbacks.removeFromBasket}/>
    }, [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout title='Корзина' onClose={callbacks.closeModal}>
      <List list={state.basket.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={state.basket.sum}/>
    </ModalLayout>
  );
}

export default React.memo(Basket);
