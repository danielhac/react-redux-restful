import React, {PropTypes} from 'react';
import MakerListRow from './MakerListRow';

const MakerList = ({makers, deleteMaker }) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>Brand Name</th>
                <th># of Brands: {makers.length}</th>
            </tr>
            </thead>
            <tbody>
            {makers.map(maker =>
                <MakerListRow
                    key={maker.id}
                    maker={maker}
                    deleteMaker={deleteMaker}
                    />
            )}
            </tbody>
        </table>
    );
};

MakerList.propTypes = {
    makers: PropTypes.array.isRequired,
    deleteMaker: React.PropTypes.func.isRequired
};

export default MakerList;
