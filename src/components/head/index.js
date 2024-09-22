import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title = "", typeHead = "", onClosedCart = () => {} }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      {typeHead == "Cart" &&
        <button className='Head-closed' onClick={onClosedCart}>Закрыть</button>
      }
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  typeHead: PropTypes.string,
  onClosedCart: PropTypes.func
};

export default React.memo(Head);
