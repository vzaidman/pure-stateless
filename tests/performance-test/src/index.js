import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import Stats from 'stats.js'

var stats = new Stats()
stats.showPanel(0)
document.body.appendChild( stats.dom )
function animate() {
  stats.update()
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

ReactDOM.render(
  <App />,
  document.getElementById('root')
)