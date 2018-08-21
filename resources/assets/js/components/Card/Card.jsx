import React from 'react'
import 'components/card.sass'
import PropTypes from 'prop-types';

const Card = (props) => (<div className={'card '+(props.className?props.className:'')}>
  <div className='card-header'>
    <div>
      <h3>
        {props.title}
      </h3>
    </div>
  </div>
  <div>
    {props.body}
  </div>
</div>)
Card.propTypes = {
  title: PropTypes.node.isRequired,
  body: PropTypes.node.isRequired
}
export default Card
