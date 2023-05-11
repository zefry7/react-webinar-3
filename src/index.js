import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement, generateCode} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {code: generateCode(), title: 'Название элемента'},
    {code: generateCode(), title: 'Некий объект'},
    {code: generateCode(), title: 'Заголовок'},
    {code: generateCode(), title: 'Очень длинное название элемента из семи слов'},
    {code: generateCode(), title: 'Запись'},
    {code: generateCode(), title: 'Шестая запись'},
    {code: generateCode(), title: 'Седьмая запись'},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  console.log('- Перерендер -');
  root.render(<App store={store}/>); // React.createElement(App, {store})
});

// Первый рендер приложения
console.log('- Первый рендер -');
root.render(<App store={store}/>);
