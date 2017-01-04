import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as makerActions from '../../actions/makerActions';
import MakerList from './MakerList';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

class MakersPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.redirectToAddMakerPage = this.redirectToAddMakerPage.bind(this);
        this.deleteMaker = this.deleteMaker.bind(this);
    }

    redirectToAddMakerPage() {
        browserHistory.push('/maker');
    }

    deleteMaker(maker){
        this.props.actions.deleteMaker(maker.id)
            .then(() => {
                toastr.success('Brand deleted');
            })
            .catch(error => {
                toastr.error('Cannot delete a Brand with its existing wines! Must delete Brand`s wines first');
            });
    }

    render() {
        const {makers} = this.props;

        return (
            <div className="well well-lg">
                <h1>Wine Brands</h1>
                <p>Explore the brands of wines to you hearts content</p>
                <div id="space"></div>
                <input type="submit"
                       value="Add Brand"
                       className="btn btn-primary"
                       onClick={this.redirectToAddMakerPage} />
                <MakerList
                    makers={makers}
                    deleteMaker={this.deleteMaker}/>
            </div>
        );
    }
}

MakersPage.propTypes = {
    makers: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
    // deleteMaker: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        makers: state.makers
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(makerActions, dispatch)
    };
}

// Export component decorated by React-Redux Connect function to interact with Redux
export default connect(mapStateToProps, mapDispatchToProps)(MakersPage);