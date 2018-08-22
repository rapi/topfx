import React from 'react'
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import View from '../Style/View'
import 'components/dashboard.sass'

const Dashboard = (props) => (<View className='dashboard__container d-flex flex-md-row flex-column h-100'>
    <div className='dashboard__partLeft'>
      {props.left}
    </div>
    <div className='dashboard__partRight'>
      {props.right}
    </div>
</View>)
Dashboard.propTypes = {
  left: PropTypes.node,
  right: PropTypes.node
};

export default Dashboard
