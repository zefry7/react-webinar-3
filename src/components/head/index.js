import React from "react";
import './style.css';
import PropTypes from "prop-types";
import Item from "../item";

function Head({title}){
  return (
    <div className='Head'>
      <h1>{title}</h1>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default Head;
