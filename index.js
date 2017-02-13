var createClass = require('react').createClass
var shallowEqual = require('fbjs/lib/shallowEqual')
var noop = function(){}

module.exports = function pureStateless(statelessComponent) {
  if (typeof statelessComponent === 'function') {
    statelessComponent = {
      displayName: statelessComponent.name,
      propTypes: statelessComponent.propTypes,
      contextTypes: statelessComponent.contextTypes,
      render: statelessComponent,
    }
  }

  const statelessWillMount = statelessComponent.statelessWillMount || noop

  return createClass({
    displayName: statelessComponent.displayName,
    propTypes: statelessComponent.propTypes,
    contextTypes: statelessComponent.contextTypes,
    shouldComponentUpdate: function(nextProps) {
      return !shallowEqual(this.props, nextProps)
    },
    componentWillMount: function(){
      const result = statelessWillMount(this, this.props, this.context)
      result && Object.assign(this, result)
    },
    render: function() {
      return statelessComponent.render(this, this.props, this.context)
    }
  })
};
