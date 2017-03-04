# pure-stateless - Simple and Fast React Components

Based on [christophehurpeau/react-pure-stateless-component](https://github.com/christophehurpeau/react-pure-stateless-component). Thanks :)

## Installation
`npm install pure-stateless --save`

## About
This is a <b>*minimalistic*</b> library for creating react pure stateless components, with a creator function that runs only once.

For more advanced features use [recompose](https://github.com/acdlite/recompose).

```javascript
import pureStateless from 'pure-stateless'

const PureStateLessComponent = pureStateless((handlers, {handleClick, index}) => {
  handlers.onClick = e => handleMouseOver(index)
  return ({onClick}, {value}) => {
    return (
      <div onClick={onClick} className='simple-button'>
        {`PureStateLessComponent: ${value}`}
      </div>
    )
  }
})
```

when the full arguments are:
```javascript
import pureStateless from 'pure-stateless'

const PureStateLessComponent = pureStateless((handlers, props, context) => {

  // The lines before the return are called once per instance
  const {handleClick, index} = props
  handlers.onClick = e => handleMouseOver(index)
  
  return (handlers, props, context) => {
  
    const {onClick} = handlers
    const {value} = props
    
    return (
      <div onClick={onClick} className='simple-button'>
        {`PureStateLessComponent: ${value}`}
      </div>
    )
  }
})
```
Then a component is created and can be used as a regular react component:
```javascript
  // ...
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
If you need a minimalistic library that provides you with pure stateless components with handlers.

[Recompose](https://github.com/acdlite/recompose/blob/master/docs/API.md) includes the same features and many more
but can be too heavy if an [optimization](https://github.com/acdlite/recompose#optimizing-bundle-size) can't be used
on it.

## Testing
`cd tests\simple-test`
or
`cd tests\performance-test`
or
`cd tests\performance-test-recompose`

`yarn install`

`yarn start`