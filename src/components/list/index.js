import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import ItemCard from "../itemCard";
import './style.css';


function List({ list = [], typeItem = "", onAddItemInCard = () => { }, onDeleteInCard = () => { } }) {

  let selectItem = (item) => {
    switch (typeItem) {
      case "Card":
        return <ItemCard item={item} onDeleteInCard={onDeleteInCard} />
      default:
        return <Item item={item} onAddItemInCard={onAddItemInCard} />
    }
  }

  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          {selectItem(item)}
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
  typeItem: PropTypes.string,
  onAddItemInCard: PropTypes.func,
  onDeleteInCard: PropTypes.func
};

export default React.memo(List);
