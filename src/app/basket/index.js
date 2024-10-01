import { memo, useCallback } from 'react';
<<<<<<< HEAD
=======
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useInit from '../../hooks/use-init';
import useTranslate from '../../hooks/use-translate';
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
<<<<<<< HEAD
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { changeLangText } from '../../utils';

=======

/**
 * Корзина в модальном окне
 */
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
function Basket() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
<<<<<<< HEAD
    lang: state.catalog.lang
=======
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

<<<<<<< HEAD
  const renders = {
    itemBasket: useCallback(
      item => {
        return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} closeModal={callbacks.closeModal} textButton={changeLangText(select.lang, "buttonBasket")}/>;
      },
      [callbacks.removeFromBasket],
=======
  const { t } = useTranslate();

  const renders = {
    itemBasket: useCallback(
      item => (
        <ItemBasket
          item={item}
          link={`/articles/${item._id}`}
          onRemove={callbacks.removeFromBasket}
          onLink={callbacks.closeModal}
          labelUnit={t('basket.unit')}
          labelDelete={t('basket.delete')}
        />
      ),
      [callbacks.removeFromBasket, t],
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
    ),
  };

  return (
<<<<<<< HEAD
    <ModalLayout title={changeLangText(select.lang, "basketTitle")} onClose={callbacks.closeModal} textButton={changeLangText(select.lang, "closeButton")}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} textTotal={changeLangText(select.lang, "textTotal")}/>
=======
    <ModalLayout
      title={t('basket.title')}
      labelClose={t('basket.close')}
      onClose={callbacks.closeModal}
    >
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} t={t} />
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
    </ModalLayout>
  );
}

export default memo(Basket);
