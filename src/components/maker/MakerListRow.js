import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const MakerListRow = ({maker, deleteMaker}) => {

    function onDeleteMaker() {
        deleteMaker(maker);
    }

    return (
        <tr>
            <td><Link to={'/maker/' + maker.id}>{maker.wineName}</Link></td>

            <td>
                <button className="btn-xs btn-danger" onClick={onDeleteMaker} >Delete</button>
            </td>
        </tr>
    );
};

MakerListRow.propTypes = {
    maker: PropTypes.object.isRequired,
    deleteMaker: PropTypes.func.isRequired
};

export default MakerListRow;
