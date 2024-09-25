import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Lang from '../lang';

function Head({ title, lang, changeLang }) {

  return (
    <div className="Head">
      <h1>{title}</h1>
      <Lang changeLang={changeLang} lang={lang}/>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
