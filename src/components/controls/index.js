import React from "react";
import './style.css';

function Controls({store}){

  return (
    <div className='Controls'>
      <button onClick={() => store.addItem()}>Добавить</button>
    </div>
  )
}

export default Controls;
