import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { changeLangText } from '../../utils';

function Basket() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.catalog.lang
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      item => {
        return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} closeModal={callbacks.closeModal} textButton={changeLangText(select.lang, "buttonBasket")}/>;
      },
      [callbacks.removeFromBasket],
    ),
  };

  return (
    <ModalLayout title={changeLangText(select.lang, "basketTitle")} onClose={callbacks.closeModal} textButton={changeLangText(select.lang, "closeButton")}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} textTotal={changeLangText(select.lang, "textTotal")}/>
    </ModalLayout>
  );
}

export default memo(Basket);
