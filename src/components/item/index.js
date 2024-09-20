import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { convertingNumbeInPrice } from "../../utils"

function Item({ item = null, onAddItemInCard = () => { } }) {

  return (
    <div className='Item'>
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">
        {item.title}
      </div>
      <div className='Item-price'>
        {convertingNumbeInPrice(item.price) + ' ₽'}
      </div>
      <div className="Item-actions">
        <button onClick={() => onAddItemInCard(item)}>Добавить</button>
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
  onAddItemInCard: PropTypes.func,
};


export default React.memo(Item);
