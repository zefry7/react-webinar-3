import React, { useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import { convertingNumbeInPrice } from "./utils"
import "./style.css"

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [cardOpen, setCardOpen] = useState(false)
  const list = store.getState().list;
  const card = store.getState().card;
  const sumCard = store.getState().sumCard
  const countCard = store.getState().countCard

  const callbacks = {
    onAddItemInCard: (item) => {
      store.addItemInCard(item.code)
      store.addInSumCard(item.price)
      store.changeCountCard()
    },
    onDeleteInCard: (code) => {
      store.deleteItemInCard(code)
      let item = card.filter((v) => v.code == code)[0]
      store.subInSumCard(item.price * item.countItem)
      store.changeCountCard()
    },
    onClosedCard: () => {
      setCardOpen(value => !value)
    }
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls onClosedCard={callbacks.onClosedCard} sumCardString={convertingNumbeInPrice(sumCard)} card={card} countCard={countCard} />
      <List
        list={list}
        onAddItemInCard={callbacks.onAddItemInCard}
      />
      <Modal activeModal={cardOpen}>
        <Head title="Корзина" typeHead={"Card"} onClosedCard={callbacks.onClosedCard} />
        {card.length == 0
          ? <div className='Card-empty'>{"Корзина пуста :("}</div>
          : <>
            <List
              list={card}
              typeItem={"Card"}
              onDeleteInCard={callbacks.onDeleteInCard}
            />
            <div className='Card-result-row'>
              <div className='Card-label'>Итого</div>
              <div className='Card-sum'>{convertingNumbeInPrice(sumCard) + ' ₽'}</div>
            </div>
          </>
        }
      </Modal>
    </PageLayout>
  );
}

export default App;
