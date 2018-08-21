import React from 'react';

export default(props) => {
  return <img
  src={'/img/'+props.src}
  width={props.width}
  height={props.height}
  style={props.style}
  />
}
