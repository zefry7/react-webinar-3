import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { convertingNumbeInPrice } from "../../utils"

function ItemCart({ item = null, onDeleteInCart = () => { } }) {

    return (
        <div className='ItemCart'>
            <div className="ItemCart-code">{item.code}</div>
            <div className="ItemCart-title">
                {item.title}
            </div>
            <div className='ItemCart-price'>
                {convertingNumbeInPrice(item.price) + ' ₽'}
            </div>
            <div className='ItemCart-count'>{item.countItem} шт</div>
            <div className="ItemCart-actions">
                <button onClick={() => onDeleteInCart(item.code)}>Удалить</button>
            </div>
        </div>
    );
}

ItemCart.propTypes = {
    item: PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
        count: PropTypes.number,
    }).isRequired,
    onDeleteInCart: PropTypes.func,
};


export default React.memo(ItemCart);
