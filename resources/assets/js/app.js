import 'general.scss'
import React from 'react'
import Icon from 'Icons/Fa'
import {BrowserRouter as Router, Route,Redirect,Switch} from "react-router-dom";

  import Dashboard from 'Layout/Dashboard'

//Menu
  import Menu from 'Menu/Menu'
  import MenuItem from 'Menu/MenuItem'

//Components
  // import Charts from 'Layout/Charts'
  // import Symbols from 'Layout/Symbols'

export default(props) => (<Router>
  <Dashboard left={
      <Menu>
        <MenuItem icon={<Icon icon = "user" />} title='Charts' link='/'/>
        <MenuItem icon={<Icon icon = "cog" />} title='Symbols' link='/symbols'/>
      </Menu>
    } right={
            <Switch>
              <Route path="/" component={()=><div>test</div>} />
              <Route path="/symbols" component={()=><div>11</div>} />
            </Switch>
    }/>
</Router>
)
