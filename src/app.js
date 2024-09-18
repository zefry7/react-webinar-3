import React, { useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Card from './components/card';

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
      store.addItemInCard(item)
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
      <Controls onClosedCard={callbacks.onClosedCard} sumCard={sumCard} card={card} countCard={countCard}/>
      <List
        list={list}
        typeButton={"Добавить"}
        onAddItemInCard={callbacks.onAddItemInCard}
      />
      {cardOpen == true &&
        <Card
          card={card}
          sumCard={sumCard}
          onClosedCard={callbacks.onClosedCard}
          onDeleteInCard={callbacks.onDeleteInCard}
          typeButton={"Удалить"}
        />
      }

    </PageLayout>
  );
}

export default App;
