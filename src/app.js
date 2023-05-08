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

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS'/>
      <Controls store={store}/>
      <List store={store}/>
    </PageLayout>
  );
}

export default App;
