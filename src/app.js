import React from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;

  const onDeleteItem = (code) => {
    store.deleteItem(code);
  }

  const onSelectItem = (code) => {
    store.selectItem(code);
  }

  const onAddItem = () => {
    store.addItem();
  }

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS'/>
      <Controls onAdd={onAddItem}/>
      <List list={list} onDeleteItem={onDeleteItem} onSelectItem={onSelectItem}/>
    </PageLayout>
  );
}

export default App;
