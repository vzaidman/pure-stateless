import React, {Component} from 'react'
import {pure} from 'recompose'
import pureStateless from '../../index'
import './App.css'

const StateLessComponent = ({value, index, handleClick}) => {

  console.log('StateLessComponent creating onClick.')
  const onClick = e => handleClick(index)

  return (
    <div onClick={onClick} className='simple-button'>
      {`StateLessComponent: ${value}`}
    </div>
  );
}

const RecomposePureStateLessComponent = pure(({value, index, handleClick}) => {

  console.log('RecomposePureStateLessComponent creating onClick')
  const onClick = e => handleClick(index)

  return (
    <div onClick={onClick} className='simple-button'>
      {`RecomposePureStateLessComponent: ${value}`}
    </div>
  );
})

const PureStateLessComponent = pureStateless({
  statelessWillMount: self => {
    console.log('PureStateLessComponent creating onClick.')
    // the onClick handler will be created only once
    self.onClick = e => {
      const {handleClick, index} = self.props
      handleClick(index)
    }
  },
  render: (self, {value}) => {
    return (
      <div onClick={self.onClick} className='simple-button'>
        {`PureStateLessComponent: ${value}`}
      </div>
    )
  }
})

class App extends Component {
  state = {
    clickCount: [0, 0, 0]
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
        <RecomposePureStateLessComponent
          value={clickCount[1]}
          handleClick={this.handleClick}
          index={1}
        />
        <PureStateLessComponent
          value={clickCount[2]}
          handleClick={this.handleClick}
          index={2}
        />
      </div>
    )
  }
}

export default App;
