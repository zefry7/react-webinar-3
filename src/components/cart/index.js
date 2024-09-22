import React from "react"
import PropTypes from 'prop-types';
import List from '../list';
import Head from '../head';
import ItemCart from '../itemCart';
import { convertingNumbeInPrice } from "../../utils"

function Cart({ cart = [], onClosedCart = () => { }, onDeleteInCart = () => { }, sumCart = 0 }) {
    return <>
        <Head title="Корзина" typeHead={"Cart"} onClosedCart={onClosedCart} />
        {
            cart.length == 0
                ? <div className='Cart-empty'>{"Корзина пуста :("}</div>
                : <>
                    <List
                        list={cart}
                        typeItem={"Cart"}
                        onDeleteInCart={onDeleteInCart}
                    >
                        <ItemCart onDeleteInCart={onDeleteInCart} />
                    </List>
                    <div className='Cart-result-row'>
                        <div className='Cart-label'>Итого</div>
                        <div className='Cart-sum'>{convertingNumbeInPrice(sumCart) + ' ₽'}</div>
                    </div>
                </>
        }
    </>
}

Cart.propTypes = {
    onClosedCart: PropTypes.func,
    onDeleteInCart: PropTypes.func,
    cart: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.number,
            countItem: PropTypes.number
        }),
    ).isRequired,
    sumCart: PropTypes.number
};

export default React.memo(Cart)