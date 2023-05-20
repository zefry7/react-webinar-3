import React, {useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const {name} = useSelector(state => ({name: state.modals.name}), 'App');

  return (
    <>
      <Main/>
      {name === 'basket' && <Basket/>}
    </>
  );
}

export default App;
