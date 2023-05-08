import React from "react";
import './style.css';

function List({store}){

  const list = store.getState().list;

  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <div className={'Item' + (item.selected ? ' Item_selected' : '')}
               onClick={() => store.selectItem(item.code)}>
            <div className='Item-code'>{item.code}</div>
            <div className='Item-title'>{item.title}</div>
            <div className='Item-actions'>
              <button onClick={() => store.deleteItem(item.code)}>
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default List;
