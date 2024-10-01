import { createRoot } from 'react-dom/client';
<<<<<<< HEAD
import App from './app';
import Store from './store';
import { StoreContext } from './store/context';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Product from './app/product';
import Main from './app/main';
=======
import { BrowserRouter } from 'react-router-dom';
import { StoreContext } from './store/context';
import { I18nProvider } from './i18n/context';
import App from './app';
import Store from './store';
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1

const store = new Store();

const root = createRoot(document.getElementById('root'));

<<<<<<< HEAD
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{
      path: "/",
      element: <Main />
    },
    {
      path: ":id",
      element: <Product />
    }]
  },
]);

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
=======
// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <I18nProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nProvider>
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
  </StoreContext.Provider>,
);
