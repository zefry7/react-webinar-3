import React, {useCallback} from 'react';
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

  console.log('App');

  const list = store.getState().list;

  const onDeleteItem = useCallback((code) => {
    store.deleteItem(code);
  }, [store]);

  const onSelectItem = useCallback((code) => {
    store.selectItem(code);
  }, [store]);

  const onAddItem = useCallback(() => {
    store.addItem();
  }, [store]);

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS'/>
      <Controls onAdd={onAddItem}/>
      <List list={list} onDeleteItem={onDeleteItem} onSelectItem={onSelectItem}/>
    </PageLayout>
  );
}

export default App;
