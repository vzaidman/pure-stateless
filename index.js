var createClass = require('react').createClass
var shallowEqual = require('fbjs/lib/shallowEqual')

module.exports = function pureStateless(statelessComponent) {
  if (typeof statelessComponent === 'function') {
    statelessComponent = {
      displayName: statelessComponent.name,
      propTypes: statelessComponent.propTypes,
      contextTypes: statelessComponent.contextTypes,
      render: statelessComponent,
    }
  }

  return createClass({
    displayName: statelessComponent.displayName,
    propTypes: statelessComponent.propTypes,
    contextTypes: statelessComponent.contextTypes,
    shouldComponentUpdate: function(nextProps) {
      return !shallowEqual(this.props, nextProps)
    },
    componentWillMount: !statelessComponent.statelessWillMount ?
      undefined :
      function(){
        const result = statelessComponent.statelessWillMount(this, this.props, this.context)
        result && Object.assign(this, result)
      },
    render: function() {
      return statelessComponent.render(this, this.props, this.context)
    }
  })
};
