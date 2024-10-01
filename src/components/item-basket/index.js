import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import './style.css';
import { Link } from 'react-router-dom';
=======
import { Link } from 'react-router-dom';
import './style.css';
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: e => props.onRemove(props.item._id),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
<<<<<<< HEAD
      <Link to={`/${props.item._id}`} className={cn('title')} onClick={() => props.closeModal()}>{props.item.title}</Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{props.textButton}</button>
=======
      <div className={cn('title')}>
        {props.link ? (
          <Link to={props.link} onClick={props.onLink}>
            {props.item.title}
          </Link>
        ) : (
          props.item.title
        )}
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>
          {numberFormat(props.item.price)} {props.labelCurr}
        </div>
        <div className={cn('cell')}>
          {numberFormat(props.item.amount || 0)} {props.labelUnit}
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{props.labelDelete}</button>
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
<<<<<<< HEAD
  onRemove: propTypes.func,
=======
  link: PropTypes.string,
  onLink: PropTypes.func,
  onRemove: PropTypes.func,
  labelCurr: PropTypes.string,
  labelDelete: PropTypes.string,
  labelUnit: PropTypes.string,
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
};

ItemBasket.defaultProps = {
  onRemove: () => {},
<<<<<<< HEAD
=======
  labelCurr: '₽',
  labelUnit: 'шт',
  labelDelete: 'Удалить',
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
};

export default memo(ItemBasket);
