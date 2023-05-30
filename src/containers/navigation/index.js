import {memo, useCallback, useMemo} from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Menu from "../../components/menu";
import BasketTool from "../../components/basket-tool";
import SideLayout from "../../components/side-layout";

function Navigation() {
  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const options = {
    menu: useMemo(() => ([
      {key: 1, title: 'Главная', link: '/'},
    ]), [])
  };

  return (
    <SideLayout side='between'>
      <Menu items={options.menu}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
    </SideLayout>
  );
}

export default memo(Navigation);
