import React from 'react';
import PropTypes from 'prop-types';
import './style.css';


function List({ children, list = [] }) {
  
  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          {React.cloneElement(children, item={item})}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  children: PropTypes.node,
};

export default React.memo(List);
