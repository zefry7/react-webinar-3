import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
<<<<<<< HEAD
import Lang from '../lang';

function Head({ title, lang, changeLang }) {

  return (
    <div className="Head">
      <h1>{title}</h1>
      <Lang changeLang={changeLang} lang={lang}/>
=======

function Head({ title, children }) {
  return (
    <div className="Head">
      <div className="Head-place">
        <h1>{title}</h1>
      </div>
      <div className="Head-place">{children}</div>
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
<<<<<<< HEAD
=======
  children: PropTypes.node,
>>>>>>> 7cac612c138cd905f31764e550381383abca68f1
};

export default memo(Head);
