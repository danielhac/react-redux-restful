import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

// Destructure loading for LoadingDots
// LoadingDots will only display if 'loading' (ajax)
const Header = ({loading}) => {
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <ul className="nav navbar-nav">
                    <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>

                    <li><Link to="/wines" activeClassName="active">Wines</Link></li>

                    <li><Link to="/makers" activeClassName="active">Brands</Link></li>

                    <li><Link to="/about" activeClassName="active">About</Link></li>
                    <li id="dots">{loading && <LoadingDots interval={100} dots={10}/>}</li>
                </ul>
            </div>
        </nav>
    );
};

Header.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default Header;
