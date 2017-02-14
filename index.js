var createClass = require('react').createClass
var shallowEqual = require('fbjs/lib/shallowEqual')

module.exports = function pureStateless(generator) {
  return createClass({
    shouldComponentUpdate(nextProps) {
      return !shallowEqual(this.props, nextProps)
    },
    componentWillMount(){
      this.handlers = {}
      this.statelessRender = generator(this.handlers, this.props, this.context)
    },
    render(){
      return this.statelessRender(this.handlers, this.props, this.context)
    }
  })
}