import React from 'react';

export default(props) => {
  return <img
  src={props.src?'/img/big/'+props.src:''}
  width={props.width}
  height={props.height}
  style={props.style}
  />
}
