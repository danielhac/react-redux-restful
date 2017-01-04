import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const WineListRow = ({wine, deleteWine}) => {

    function onDeleteWine() {
        deleteWine(wine);
    }

    return (
        <tr>
            <td><Link to={'/wine/' + wine.id}>{wine.wineName}</Link></td>
            <td>{wine.region}</td>
            <td>{wine.makerId}</td>
            <td>{wine.category}</td>
            <td>{wine.price}</td>
            <td>
                <button className="btn-xs btn-danger" onClick={onDeleteWine} >Delete</button>
            </td>
        </tr>
    );
};

WineListRow.propTypes = {
    wine: PropTypes.object.isRequired,
    deleteWine: PropTypes.func.isRequired
};

export default WineListRow;
