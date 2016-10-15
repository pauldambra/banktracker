'use strict';

var React = require('react');

var Helloer = React.createClass({
    render: function() {
        return (
            <div>
                Hello {this.props.text}
            </div>
        );
    }
});

module.exports = Helloer;