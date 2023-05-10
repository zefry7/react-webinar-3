import React from "react";
import './style.css';

function Controls({onAdd}){
  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>Добавить</button>
    </div>
  )
}

export default Controls;
