import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import './App.css'

import Home from './Home'
import Performance from './cases/performance'

function SidebarLink(props) {
  return <NavLink activeClassName="active" {...props} />
}

function App() {
  return (
    <Router>
      <div class="container">
        <div class="sidebar">
          <SidebarLink exact to="/">
            Home
          </SidebarLink>
          <SidebarLink to="/performance">表单性能问题</SidebarLink>
        </div>
        <div class="main">
          <Route exact path="/" component={Home} />
          <Route path="/performance" component={Performance} />
        </div>
      </div>
    </Router>
  )
}

export default App
