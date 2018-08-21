import React from 'react'
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'

class View extends React.Component {
  render() {
    return (<div className={this.props.className} style={this.props.style}>
      {this.props.children}
    </div>)
  }
};
export default View
