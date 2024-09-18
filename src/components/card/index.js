import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import List from '../list';
import Head from '../head';
import { convertingNumbeInPrice } from "../../utils"

function Card({ card = [], typeButton = "", onClosedCard = () => {}, onDeleteInCard = () => {}, sumCard = 0 }) {

    return <div className='Card'>
        <div className='Card-content'>
            <Head title="Корзина" typeHead={"Card"} onClosedCard={onClosedCard} />
            {card.length == 0
                ? <div className='Card-empty'>{"Корзина пуста :("}</div>
                : <>
                    <List
                        list={card}
                        typeButton={typeButton}
                        onDeleteInCard={onDeleteInCard}
                    />
                    <div className='Card-result-row'>
                        <div className='Card-label'>Итого</div>
                        <div className='Card-sum'>{convertingNumbeInPrice(sumCard) + ' ₽'}</div>
                    </div>
                </>
            }
        </div>
    </div>
}

Card.propTypes = {
    card: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.number,
            countItem: PropTypes.number
        }),
    ).isRequired,
    typeButton: PropTypes.string,
    onClosedCard: PropTypes.func,
    onDeleteInCard: PropTypes.func,
    sumCard: PropTypes.number
}

export default React.memo(Card)