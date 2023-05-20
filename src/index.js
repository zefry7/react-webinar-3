import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app';
import Store from "./store";

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(<App store={store}/>);
