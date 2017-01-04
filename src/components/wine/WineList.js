import React, {PropTypes} from 'react';
import WineListRow from './WineListRow';

const WineList = ({wines, deleteWine}) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>Wine Name</th>
                <th>Region</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price</th>
                <th># of Wines: {wines.length}</th>
            </tr>
            </thead>
            <tbody>
            {wines.map(wine =>
                <WineListRow
                    key={wine.id}
                    wine={wine}
                    deleteWine={deleteWine}/>
            )}
            </tbody>
        </table>
    );
};

WineList.propTypes = {
    wines: PropTypes.array.isRequired,
    deleteWine: React.PropTypes.func.isRequired
};

export default WineList;
