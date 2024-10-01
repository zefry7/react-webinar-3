import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';
import { Link } from 'react-router-dom';

<<<<<<< HEAD
function Item({ onAdd = () => {}, item, textButton}) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: e => onAdd(item._id),
=======
function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: e => props.onAdd(props.item._id),
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
  };

  return (
    <div className={cn()}>
<<<<<<< HEAD
      <Link to={`/${item._id}`} className={cn('title')}>{item.title}</Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{textButton}</button>
=======
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <Link to={props.link}>{props.item.title}</Link>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>
          {numberFormat(props.item.price)} {props.labelCurr}
        </div>
        <button onClick={callbacks.onAdd}>{props.labelAdd}</button>
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
<<<<<<< HEAD
  onAdd: PropTypes.func,
  textButtonL: PropTypes.string
};

=======
  link: PropTypes.string,
  onAdd: PropTypes.func,
  labelCurr: PropTypes.string,
  labelAdd: PropTypes.string,
};

Item.defaultProps = {
  onAdd: () => {},
  labelCurr: '₽',
  labelAdd: 'Добавить',
};
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1

export default memo(Item);
