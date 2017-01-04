import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'; // to use componentDidMount()
import {bindActionCreators} from 'redux';
import * as makerActions from '../../actions/makerActions';
import MakerForm from './MakerForm';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

class ManageMakerPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            maker: Object.assign({}, props.maker),
            errors: {},
            saving: false,
            unsaved: true
        };

        this.updateMakerState = this.updateMakerState.bind(this);
        this.saveMaker = this.saveMaker.bind(this);
        this.deleteMaker = this.deleteMaker.bind(this);
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
        if (this.props.maker.id != nextProps.maker.id) {
            // Necessary to populate form when existing maker is loaded directly (or refresh)
            this.setState({maker: Object.assign({}, nextProps.maker)});
        }
    }

    // Single change handler for all form fields (allows fields to be typed)
    updateMakerState(event) {
        const field = event.target.name;
        let maker = this.state.maker;
        maker[field] = event.target.value;
        return this.setState({maker: maker});
    }

    saveMaker(event) {
        event.preventDefault();
        this.setState({saving: true});
        this.setState({unsaved: false});
        this.props.actions.saveMaker(this.state.maker)
            .then(() => this.redirect())
            .catch(error => {
                toastr.error(error);
                this.setState({saving: false});
            });
    }

    deleteMaker(event) {
        event.preventDefault();
        this.props.actions.deleteMaker(this.state.makerId)
            .then(() => this.deleteRedirect())
            .catch(error => {
                toastr.error();
            });
    }

    deleteRedirect() {
        toastr.success('Brand deleted');
        browserHistory.push('/makers');
    }

    redirect() {
        this.setState({saving: false});
        toastr.success('Brand saved');
        browserHistory.push('/makers');
    }

    backRedirect() {
        browserHistory.push('/makers');
    }

    render() {
        return (
            <div className="well well-lg">
                <MakerForm
                    onChange={this.updateMakerState}
                    onBack={this.backRedirect}
                    onSave={this.saveMaker}
                    onDelete={this.deleteMaker}
                    maker={this.state.maker}
                    errors={this.state.errors}
                    saving={this.state.saving}
                    deleting={this.state.deleting}
                />
            </div>
        );
    }
}

ManageMakerPage.propTypes = {
    maker: PropTypes.object.isRequired,
    makers: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageMakerPage.contextTypes = {
    router: PropTypes.object
};

function getMakerById(makers, id) {
    const maker = makers.filter(maker => maker.id == id);
    if (maker.length) return maker[0]; //since filter returns an array, have to grab the first.
    return null;
}

function mapStateToProps(state, ownProps) {
    // From the path '/maker/:id'
    const makerId = ownProps.params.id;

    // Empty maker for core maker structure
    let maker = {id: '', region: '', wineName: '', makerId: '', price: '', category: ''};

    if (makerId && state.makers.length > 0) {
        maker = getMakerById(state.makers, makerId);
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
        maker: maker,
        makers: makersFormattedForDropdown
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(makerActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageMakerPage));