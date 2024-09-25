import { createRoot } from 'react-dom/client';
import App from './app';
import Store from './store';
import { StoreContext } from './store/context';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Product from './app/product';
import Main from './app/main';

const store = new Store();

const root = createRoot(document.getElementById('root'));

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
  </StoreContext.Provider>,
);
