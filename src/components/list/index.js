import { memo } from 'react';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import './style.css';

function List({ list, renderItem = item => {} }) {

=======
import Item from '../item';
import './style.css';

function List({ list, renderItem }) {
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
  return (
    <div className="List">
      {list.map(item => (
        <div key={item._id} className="List-item">
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  renderItem: PropTypes.func,
};

<<<<<<< HEAD
=======
List.defaultProps = {
  renderItem: item => {},
};

>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
export default memo(List);
