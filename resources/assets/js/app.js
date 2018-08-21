import 'general.scss'
import React from 'react'
import Icon from 'Icons/Fa'
import {BrowserRouter as Router, Route,Redirect,Switch,Link} from "react-router-dom";

  import Dashboard from 'Layout/Dashboard'

//Menu
  import Menu from 'Menu/Menu'
  import MenuItem from 'Menu/MenuItem'

//Components
  import Symbols from 'Layout/Symbols'
  import Charts from 'Layout/Charts'

export default(props) => (<Router>
    <Dashboard left={
        <Menu>
          <MenuItem icon={<Icon icon = "user" />} title='Charts' link='/'/>
          <MenuItem icon={<Icon icon = "cog" />} title='Symbols' link='/symbols'/>
        </Menu>
      } right={
          <div>
            <Route path="/"  exact component={Charts} />
            <Route path="/symbols" component={Symbols} />
        </div>
      }/>
  </Router>
)
