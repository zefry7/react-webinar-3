import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { convertingNumbeInPrice } from "../../utils"

function ItemCard({ item = null, onDeleteInCard = () => { } }) {

    return (
        <div className='ItemCard'>
            <div className="ItemCard-code">{item.code}</div>
            <div className="ItemCard-title">
                {item.title}
            </div>
            <div className='ItemCard-price'>
                {convertingNumbeInPrice(item.price) + ' ₽'}
            </div>
            <div className='ItemCard-count'>{item.countItem} шт</div>
            <div className="ItemCard-actions">
                <button onClick={() => onDeleteInCard(item.code)}>Удалить</button>
            </div>
        </div>
    );
}

ItemCard.propTypes = {
    item: PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
        count: PropTypes.number,
    }).isRequired,
    onDeleteInCard: PropTypes.func,
};


export default React.memo(ItemCard);
