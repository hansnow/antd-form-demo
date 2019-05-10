import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import 'antd/dist/antd.css'
import './App.css'

import Home from './Home'
import Performance from './cases/performance'
import Linkage from './cases/linkage'

function SidebarLink(props) {
  return <NavLink activeClassName="active" {...props} />
}

function App() {
  return (
    <Router>
      <div className="container">
        <div className="sidebar">
          <SidebarLink exact to="/">
            Home
          </SidebarLink>
          <SidebarLink to="/performance">表单性能问题</SidebarLink>
          <SidebarLink to="/linkage">表单联动问题</SidebarLink>
        </div>
        <div className="main">
          <Route exact path="/" component={Home} />
          <Route path="/performance" component={Performance} />
          <Route path="/linkage" component={Linkage} />
        </div>
      </div>
    </Router>
  )
}

export default App
