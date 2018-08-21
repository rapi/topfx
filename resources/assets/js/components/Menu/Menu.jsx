import React from 'react'
import View from '../Style/View'
import injectSheet from 'react-jss'
import 'components/menu.sass'

const Menu= ({...props})=>(
  <View className='dashboard__menu d-flex flex-md-column flex-row'>
    {props.children}
  </View>
)

export default Menu
