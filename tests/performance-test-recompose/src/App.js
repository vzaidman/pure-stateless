import React, {PureComponent} from 'react'
import _ from 'lodash'
import {withHandlers} from 'recompose'
import './App.css'

const enhance = withHandlers({
  onMouseOver: ({handleMouseOver, index}) => e => {
    handleMouseOver(index)
  }
})

const ColorfulChild = enhance(({index, currentIndex, onMouseOver}) => {
  const opacity = (index + 1) / (currentIndex + 1)
  return <div className='colorful-child' onMouseOver={onMouseOver} style={{opacity}} />
})

class App extends PureComponent {
  state = {
    currentIndex: 0
  }

  handleMouseOver = index => {
    this.setState({currentIndex: index})
  }

  render() {
    const {currentIndex} = this.state
    return (
      <div className='parent'>
        {_.times(5000, n =>
          <ColorfulChild
            key={n}
            index={n}
            currentIndex={currentIndex}
            handleMouseOver={this.handleMouseOver}
          />
        )}
      </div>
    )
  }
}

export default App;
