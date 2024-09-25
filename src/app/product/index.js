import React, { memo, useCallback, useEffect, useState } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Description from "../../components/description";
import BasketTool from "../../components/basket-tool";
import { useParams } from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Product() {
    const store = useStore();
    const params = useParams()
    const [item, setItem] = useState()
    const [loader, setLoader] = useState(false)

    const select = useSelector(state => ({
        amount: state.basket.amount,
        sum: state.basket.sum,
        lang: state.catalog.lang
    }));

    const callbacks = {
        // Добавление в корзину
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
        changeLang: useCallback((lang) => store.actions.catalog.changeLang(lang), [store])
    };

    useEffect(() => {
        async function getItem() {
            const response = await fetch(`/api/v1/articles/${params.id}?fields=*,madeIn(title,code),category(title)`)
            const json = await response.json()

            setItem(json.result)
            setLoader(true)
        }
        getItem()
    }, [params.id])

    return <PageLayout>
        <Head title={item?.title || ""} lang={select.lang} changeLang={callbacks.changeLang} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} lang={select.lang} />
        {loader == true
            ? <Description addToBasket={callbacks.addToBasket} lang={select.lang} item={item} />
            : <p className="Description-loader">Загрузка...</p>
        }
    </PageLayout>
}

export default memo(Product)