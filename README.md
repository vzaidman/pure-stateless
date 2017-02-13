# pure-stateless - Simple and fast React components

Based on [christophehurpeau/react-pure-stateless-component](https://github.com/christophehurpeau/react-pure-stateless-component). Thanks :)

## Installation
`npm install pure-stateless --save`

## About
This library allows you to create simple React pure stateless components with a creator function that runs only once.

```javascript
const PureStateLessComponent = pureStateless({
  // the onClick handler will be created only once
  statelessWillMount: (self, {handleClick, index}) => ({
    onClick: e => handleClick(index)
  }),
  render: (self, {value}) => {
    return (
      <div onClick={self.onClick} className='simple-button'>
        {`PureStateLessComponent: ${value}`}
      </div>
    )
  }
})
```

As opposed to the standard stateless component (with or without [recompose's pure](https://github.com/acdlite/recompose/blob/master/docs/API.md#pure))
```javascript
//@pure
const StateLessComponent = ({value, index, handleClick}) => {
  const onClick = e => handleClick(index) //this will be created every render.
  return (
    <div onClick={onClick} className='simple-button'>
      {`StateLessComponent: ${value}`}
    </div>
  );
}
```

## Usage
```javascript
const PureStateLessComponent = pureStateless({
  //optional
  displayName: 'MyComponent',
  
  //optional
  propTypes: {
    handleClick: React.Proptypes.func.isRequired,
    index: React.Proptypes.number.isRequired,
    value: React.Proptypes.string.isRequired
  },
  
  //optional
  statelessWillMount: (self, props, context) => {
    // the onClick handler will be created only once.
    self.onClick = e => {
      const {handleClick, index} = self.props
      handleClick(index)
    }
  },
  
  // optional: if 'statelessWillMount' returns,
  //           the return is assigned on 'self'.
  statelessWillMount: (self, {handleClick, index}, context) => ({
    onClick: e => handleClick(index)
  }),
  
  //mandatory
  render: (self, {value}) => {
    return (
      <div onClick={self.onClick} className='simple-button'>
        {`PureStateLessComponent: ${value}`}
      </div>
    )
  }
})
```

or pass a simple stateless component:
```javascript
const PureStateLessComponent = pureStateless(StateLessComponent)
```

Then a component is created and can be used as a regular react component:
```javascript
  ///...
  render(){
    return (
      <div>
        {array.map((value, index) =>
          <PureStateLessComponent
            key={index}
            value={value}
            onClick={this.props.onClick}
          />
        )}
      </div>
    )
  }
```

## Motivation
Eliminating stateless pure components creation code may be useful where it might change many times and we want this code to only run once.

`//TODO: create an example of when this is needed.`

## Testing
`cd test-project`

`yarn install`

`yarn start`