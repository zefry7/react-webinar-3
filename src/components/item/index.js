import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {plural} from "../../utils";

function Item({item, onDelete, onSelect}){

  console.log('Item', item.code);

  return (
    <div className={'Item' + (item.selected ? ' Item_selected' : '')}
         onClick={() => onSelect(item.code)}>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>
        {item.title} {item.count && ` | Выделяли ${item.count} ${plural(item.count, {one: 'раз', few: 'раза', many: 'раз'})}`}
      </div>
      <div className='Item-actions'>
        <button onClick={() => onDelete(item.code)}>
          Удалить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func
};

Item.defaultProps = {
  onDelete: () => {},
  onSelect: () => {},
}

export default React.memo(Item);
