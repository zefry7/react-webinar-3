import { createRoot } from 'react-dom/client';
import App from './app';
import Store from './store';
import { StoreContext } from './store/context';
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom';
import Product from './app/product';
import Main from './app/main';

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index  element={<Main />}/>
          <Route path='/articles/:id' element={<Product />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StoreContext.Provider>,
);
