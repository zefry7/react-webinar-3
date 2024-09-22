import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural } from "../../utils"

function Controls({ onClosedCart = () => {}, sumCartString = 0, cart = [], countCart = 0 }) {
  return (
    <div className="Controls">
      <div className='Controls-label'>В корзине: </div>
      {cart.length == 0
        ? <div className='Controls-count'>пусто</div>
        : <div className='Controls-count'>{countCart + " " + plural(countCart, { one: "товар", few: "товара", many: 'товаров' }) + " / " + sumCartString + " ₽"}</div>
      }
      <button onClick={onClosedCart}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onClosedCart: PropTypes.func,
  sumCartString: PropTypes.string,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      countItem: PropTypes.number
    }),
  ).isRequired,
  countCart: PropTypes.number
};

export default React.memo(Controls);
