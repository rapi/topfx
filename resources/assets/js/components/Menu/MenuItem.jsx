import React from 'react'
import View from '../Style/View'
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import {NavLink} from "react-router-dom";

const MenuItem = ({
  ...props
}) => (<View className='dashboard__menu_item'>
  <NavLink className={ 'dashboard__menu_item--Link border-primary d-flex flex-row'} to={props.link} activeClassName='active shadow text-white'>
      <div className='dashboard__menu_item--Icon menu-icon '>
        {props.icon}
      </div>
      <div className='dashboard__menu_item--Text ml-2 flex-grow-1 font-weight-light'>
        {props.title}
      </div>
  </NavLink>
</View>)
MenuItem.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};
export default MenuItem
