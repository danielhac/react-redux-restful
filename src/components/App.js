// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';

// React Router will pass child comp as prop onto app comp, then composed here
class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Header
                    loading={this.props.loading}
                />
                {this.props.children}
            </div>
        );
    }
}

// Making requirement of propType - children, which it does meet in render above
App.propTypes = {
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

// Getting the number of AJAX calls in progress from state stating that its loading if progress greater than 0
function mapStateToProps(state, ownProps) {
    return {
        loading: state.ajaxCallsInProgress > 0
    };
}

// Updated to use connect/mapStateToProps since this is now a connected component to use ajaxCallsInProgress
export default connect(mapStateToProps)(App);
