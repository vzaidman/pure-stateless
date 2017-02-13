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
  else{
    statelessComponent = Object.assign({}, statelessComponent)
  }

  const statelessWillMount = statelessComponent.statelessWillMount
  delete statelessComponent.statelessWillMount

  const classSpecifications = Object.assign(
    statelessComponent,
    {
      shouldComponentUpdate: function(nextProps) {
        return !shallowEqual(this.props, nextProps)
      },
      componentWillMount: function(){
        statelessWillMount(this)
      },
      render: function() {
        return statelessComponent.render(this, this.props, this.context)
      }
    }
  )

  return createClass(classSpecifications)
};
