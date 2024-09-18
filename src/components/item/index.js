import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { convertingNumbeInPrice } from "../../utils"

function Item({ item = null, typeButton = "", onAddItemInCard = () => { }, onDeleteInCard = () => { } }) {

  return (
    <div className='Item'>
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">
        {item.title}
      </div>
      <div className='Item-price'>
        {convertingNumbeInPrice(item.price) + ' ₽'}
      </div>
      {typeButton == "Удалить" &&
        <div className='Item-count'>{item.countItem} шт</div>
      }
      <div className="Item-actions">
        {typeButton == "Удалить"
          ? <button onClick={() => onDeleteInCard(item.code)}>{typeButton}</button>
          : <button onClick={() => onAddItemInCard(item)}>{typeButton}</button>}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  typeButton: PropTypes.string,
  onAddItemInCard: PropTypes.func,
  onDeleteInCard: PropTypes.func,
};


export default React.memo(Item);
