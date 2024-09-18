import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { convertingNumbeInPrice, plural } from "../../utils"

function Controls({ onClosedCard = () => {}, sumCard = 0, card = [], countCard = 0 }) {
  return (
    <div className="Controls">
      <div className='Controls-label'>В корзине: </div>
      {card.length == 0
        ? <div className='Controls-count'>пусто</div>
        : <div className='Controls-count'>{countCard + " " + plural(countCard, { one: "товар", few: "товара", many: 'товаров' }) + " / " + convertingNumbeInPrice(sumCard) + " ₽"}</div>
      }
      <button onClick={onClosedCard}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onClosedCard: PropTypes.func,
  sumCard: PropTypes.number,
  card: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      countItem: PropTypes.number
    }),
  ).isRequired,
  countCard: PropTypes.number
};

export default React.memo(Controls);
