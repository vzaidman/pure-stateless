import React, { Component, PropTypes } from 'react'
import {pure} from 'recompose'
import createPureStatelessComponent from '../../index'
import createPureStateLessComponentMemoized from '../../index-memoized'
import './App.css'

const StateLessComponent = ({ value, handleClick }) => {
    console.log('StateLessComponent render')
    const onClick = e => {
        handleClick(value)
    }

    return (
        <div onClick={onClick} className='simple-button'>
            {`Test ${value}`}
        </div>
    );
}

const PureStateLessComponent = createPureStatelessComponent({
  displayName: 'MyStatelessComponent',
  propTypes: {
    value: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
  },
  render({ value, handleClick }) {
    console.log('PureStateLessComponent render.')
    const onClick = e => {
      handleClick(value)
    }

    return (
      <div onClick={onClick} className='simple-button'>
        {`Test ${value}`}
      </div>
    );
  }
})

const PureStateLessComponentMemoized = createPureStateLessComponentMemoized({
    displayName: 'MyStatelessComponentMemoized',
    propTypes: {
        value: PropTypes.string.isRequired,
        handleClick: PropTypes.func.isRequired
    },
    render({ value, handleClick }) {
        console.log('PureStateLessComponentMemoized render')
        const onClick = e => {
            handleClick(value)
        }

        return (
            <div onClick={onClick} className='simple-button'>
                {`Test ${value}`}
            </div>
        );
    }
})

const RecomposePureStateLessComponent = pure(({ value, handleClick }) => {
    console.log('RecomposePureStateLessComponent render')
    const onClick = e => {
        handleClick(value)
    }

    return (
        <div onClick={onClick} className='simple-button'>
            {`Test ${value}`}
        </div>
    );
})

class App extends Component {
  state = {
    clickedDivs: ''
  }

  handleClick = (value) => {
    const {clickedDivs} = this.state
    const separator = !clickedDivs ? '' : ', '
    this.setState({clickedDivs: clickedDivs + separator + value})
  }

  render() {
    const {clickedDivs} = this.state

    return (
      <div>
          <StateLessComponent
            value={'StateLessComponent'}
            handleClick={this.handleClick}
          />
          <PureStateLessComponent
            value={'PureStateLessComponent'}
            handleClick={this.handleClick}
          />
          <PureStateLessComponentMemoized
            value={'PureStateLessComponentMemoized'}
            handleClick={this.handleClick}
          />
          <RecomposePureStateLessComponent
            value={'PureStateLessComponent'}
            handleClick={this.handleClick}
          />
        <div key="clicked-divs">{clickedDivs}</div>
      </div>
    )
  }
}

export default App;
