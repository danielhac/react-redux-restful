import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'; // to use componentDidMount()
import {bindActionCreators} from 'redux';
import * as wineActions from '../../actions/wineActions';
import WineForm from './WineForm';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

class ManageWinePage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            wine: Object.assign({}, props.wine),
            errors: {},
            saving: false,
            unsaved: true
        };

        this.updateWineState = this.updateWineState.bind(this);
        this.saveWine = this.saveWine.bind(this);
        this.deleteWine = this.deleteWine.bind(this);
    }
    // Forces a prompt if detects actions besides Save
    componentDidMount() {
        this.props.router.setRouteLeaveHook(this.props.route, () => {
            if (this.state.unsaved)
                return 'You have unsaved information, are you sure you want to leave this page?';
        });
    }

    // React lifecycle function is called any time props have changed or when React thinks props has changed
    componentWillReceiveProps(nextProps) {
        if (this.props.wine.id != nextProps.wine.id) {
            // Necessary to populate form when existing wine is loaded directly (or refresh)
            this.setState({wine: Object.assign({}, nextProps.wine)});
        }
    }

    // Single change handler for all form fields (allows fields to be typed)
    updateWineState(event) {
        const field = event.target.name;
        let wine = this.state.wine;
        wine[field] = event.target.value;
        return this.setState({wine: wine});
    }

    saveWine(event) {
        event.preventDefault();
        this.setState({saving: true});
        this.setState({unsaved: false});
        this.props.actions.saveWine(this.state.wine)
            .then(() => this.redirect())
            .catch(error => {
                toastr.error(error);
                this.setState({saving: false});
            });
    }

    deleteWine(event) {
        event.preventDefault();
        this.props.actions.deleteWine(this.state.wineId)
            .then(() => this.deleteRedirect())
            .catch(error => {
                toastr.error(error);
            });
    }

    deleteRedirect() {
        toastr.success('Wine deleted');
        browserHistory.push('/wines');
    }

    redirect() {
        this.setState({saving: false});
        toastr.success('Wine saved');
        browserHistory.push('/wines');
    }

    backRedirect() {
        browserHistory.push('/wines');
    }

    render() {
        return (
            <div className="well well-lg">
                <WineForm
                    allMakers={this.props.makers}
                    onBack={this.backRedirect}
                    onChange={this.updateWineState}
                    onSave={this.saveWine}
                    onDelete={this.deleteWine}
                    wine={this.state.wine}
                    errors={this.state.errors}
                    saving={this.state.saving}
                    deleting={this.state.deleting}
                />
            </div>
        );
    }
}

ManageWinePage.propTypes = {
    wine: PropTypes.object.isRequired,
    makers: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageWinePage.contextTypes = {
    router: PropTypes.object
};

function getWineById(wines, id) {
    const wine = wines.filter(wine => wine.id == id);
    if (wine.length) return wine[0]; //since filter returns an array, have to grab the first.
    return null;
}

function mapStateToProps(state, ownProps) {
    // From the path '/wine/:id'
    const wineId = ownProps.params.id;

    // Empty wine for core wine structure
    let wine = {id: '', region: '', wineName: '', makerId: '', price: '', category: ''};

    if (wineId && state.wines.length > 0) {
        wine = getWineById(state.wines, wineId);
    }

    // Translate the shape that came from API into something useful for populating drop-down
    const makersFormattedForDropdown = state.makers.map(maker => {
        return {
            value: maker.id,
            text: maker.wineName
        };
    });

    // Pass to component - list of objects below determine properties bound to component
    return {
        wine: wine,
        makers: makersFormattedForDropdown
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(wineActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageWinePage));