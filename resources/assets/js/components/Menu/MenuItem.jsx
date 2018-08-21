import React from 'react'
import View from '../Style/View'
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import {NavLink} from "react-router-dom";

class MenuItem extends React.Component{
    isActive=(_,e)=>this.props.link===e.pathname
    render() {
        return (<View className='dashboard__menu_item'>
            <NavLink className={'dashboard__menu_item--Link border-primary d-flex flex-row'} to={this.props.link} isActive={this.isActive.bind(this)} activeClassName='active shadow text-white'>
                <div className='dashboard__menu_item--Icon menu-icon '>
                    {this.props.icon}
                </div>
                <div className='dashboard__menu_item--Text ml-2 flex-grow-1 font-weight-light'>
                    {this.props.title}
                </div>
            </NavLink>
        </View>)
    }
}
MenuItem.propTypes = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
};
export default MenuItem
