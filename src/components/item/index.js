import React from "react";
import './style.css';

function Item({item, onDelete, onSelect}){
  return (
    <div className={'Item' + (item.selected ? ' Item_selected' : '')}
         onClick={() => onSelect(item.code)}>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>{item.title}</div>
      <div className='Item-actions'>
        <button onClick={() => onDelete(item.code)}>
          Удалить
        </button>
      </div>
    </div>
  );
}

export default Item;
