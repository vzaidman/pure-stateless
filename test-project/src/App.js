import React, { Component, PropTypes } from 'react'
import {pure} from 'recompose'
import createPureStatelessComponent from '../../index'
import createPureStateLessComponentMemoized from '../../index-memoized'
import './App.css'

const StateLessComponent = ({ value, index, handleClick }) => {
    console.log('StateLessComponent render')
    const onClick = e => {
        handleClick(index)
    }

    return (
      <div onClick={onClick} className='simple-button'>
        {`StateLessComponent: ${value}`}
      </div>
    );
}

const PureStateLessComponent = createPureStatelessComponent({
  displayName: 'MyStatelessComponent',
  propTypes: {
    value: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired
  },
  render({ value, index, handleClick }) {
    console.log('PureStateLessComponent render.')
    const onClick = e => {
      handleClick(index)
    }

    return (
      <div onClick={onClick} className='simple-button'>
        {`PureStateLessComponent: ${value}`}
      </div>
    );
  }
})

const PureStateLessComponentMemoized = createPureStateLessComponentMemoized({
    displayName: 'MyStatelessComponentMemoized',
    propTypes: {
      value: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
      handleClick: PropTypes.func.isRequired
    },
    render({ value, index, handleClick }) {
        console.log('PureStateLessComponentMemoized render')
        const onClick = e => {
            handleClick(index)
        }

        return (
            <div onClick={onClick} className='simple-button'>
                {`PureStateLessComponentMemoized: ${value}`}
            </div>
        );
    }
})

const RecomposePureStateLessComponent = pure(({ value, index, handleClick }) => {
    console.log('RecomposePureStateLessComponent render')
    const onClick = e => {
        handleClick(index)
    }

    return (
      <div onClick={onClick} className='simple-button'>
        {`RecomposePureStateLessComponent: ${value}`}
      </div>
    );
})

class App extends Component {
  state = {
    clickCount: [0, 0, 0, 0]
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
          <PureStateLessComponentMemoized
            value={clickCount[2]}
            handleClick={this.handleClick}
            index={2}
          />
          <RecomposePureStateLessComponent
            value={clickCount[3]}
            handleClick={this.handleClick}
            index={3}
          />
      </div>
    )
  }
}

export default App;
