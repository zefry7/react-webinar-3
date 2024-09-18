import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';


function List({ list = [], typeButton = "", onAddItemInCard = () => {}, onDeleteInCard  = () => {} }) {
  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          <Item item={item} typeButton={typeButton} onAddItemInCard={onAddItemInCard} onDeleteInCard={onDeleteInCard} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  typeButton: PropTypes.string,
  onAddItemInCard: PropTypes.func,
  onDeleteInCard: PropTypes.func
};

export default React.memo(List);
