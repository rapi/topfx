import React from 'react'
import 'scss/components/card.sass'
import PropTypes from 'prop-types';

class Card extends React.Component{
  render(){
    return <div className={'mt-5'+(this.props.className?this.props.className:'')}>
      <div className='card-header'>
        <div className='card-icon'>
          {this.props.image}
        </div>
        <div>
          <h3 className='text-right'>
            {this.props.title}
          </h3>
        </div>
      </div>
      <div className={'p-'+this.props['body-padding']}>
        {this.props.body}
      </div>
    </div>
  }
}
Card.propTypes = {
  image: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  body: PropTypes.node.isRequired
}
export default Card
