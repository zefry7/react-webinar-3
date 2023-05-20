import React, {useCallback, useState} from 'react';
import Main from "./main";
import Basket from "./basket";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const state = useState(() =>store.getState());


  return (
    <>
      <Main store={store}/>
      {state.modals.name === 'basket' && <Basket store={store}/>}
    </>
  );
}

export default App;
