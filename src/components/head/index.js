import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title = "", typeHead = "", onClosedCard = () => {} }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      {typeHead == "Card" &&
        <button className='Head-closed' onClick={onClosedCard}>Закрыть</button>
      }
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  typeHead: PropTypes.string,
  onClosedCard: PropTypes.func
};

export default React.memo(Head);
