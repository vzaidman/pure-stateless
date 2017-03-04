import React, {Component} from 'react'
import pureStateless from '../../index'
import './App.css'

const PureStateLessComponent = pureStateless((handlers, {handleClick, index}) => {

  console.log('PureStateLessComponent creating onClick.')
  handlers.onClick = e => handleClick(index)

  return ({onClick}, {value}) => (
    <div onClick={onClick} className='simple-button'>
      {`PureStateLessComponent: ${value}`}
    </div>
  )
})

const StateLessComponent = ({value, index, handleClick}) => {

  console.log('StateLessComponent (not the stateless pure one) creating onClick even if clicked the other component.')
  const onClick = e => handleClick(index)

  return (
    <div onClick={onClick} className='simple-button'>
      {`StateLessComponent: ${value}`}
    </div>
  )
}

class App extends Component {
  state = {
    clickCount: [0, 0]
  }

  handleClick = (index) => {
    const {clickCount} = this.state
    const newClickCount = [...clickCount]
    newClickCount[index] += 1
    this.setState({clickCount: newClickCount})
  }

  render() {
    const {clickCount} = this.state

    return (
      <div>
        <StateLessComponent
          value={clickCount[0]}
          handleClick={this.handleClick}
          index={0}
        />
        <PureStateLessComponent
          value={clickCount[1]}
          handleClick={this.handleClick}
          index={1}
        />
      </div>
    )
  }
}

export default App;
