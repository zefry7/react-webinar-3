import { useCallback, useContext, useEffect, useState } from 'react';
<<<<<<< HEAD
import Main from './main';
import Basket from './basket';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import { Outlet } from 'react-router-dom';

/**
 * Приложение
 * @returns {React.ReactElement}
=======
import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
<<<<<<< HEAD
      <Outlet />
=======
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
      </Routes>

>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
