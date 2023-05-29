import {memo, useCallback, useEffect, useMemo} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {useParams} from "react-router-dom";
import ArticleCard from "../../components/article-card";
import Menu from "../../components/menu";
import SideLayout from "../../components/side-layout";

function Article() {

  const store = useStore();

  const params = useParams();

  useEffect(() => {
    store.actions.article.load(params.id);
  }, [params.id]);

  const select = useSelector(state => ({
    article: state.article.data,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const options = {
    menu: useMemo(() => ([
      {key: 1, title: 'Главная', link: '/'},
    ]), [])
  };

  return (
    <PageLayout>
      <Head title={select.article.title}/>
      <SideLayout side='between'>
        <Menu items={options.menu}/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </SideLayout>
      <ArticleCard article={select.article} onAdd={callbacks.addToBasket}/>
    </PageLayout>

  );
}

export default memo(Article);
