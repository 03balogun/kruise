import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import AppBar from '@material-ui/core/AppBar/index';
import Toolbar from '@material-ui/core/Toolbar/index';
import Button from '@material-ui/core/Button/index';
import {Link} from "react-router-dom";
import AppIconButton from "../kruise/AppIconButton";

//
import HomeIcon from '@material-ui/icons/Home';
import Notifications from './Notifications';

//
import AddKruise from '../kruise/AddKruise'

class NavBar extends Component {
    render() {
        const {authenticated} = this.props;

        return (
            <div>
                <AppBar>
                    <Toolbar className="nav-container">
                        {authenticated ? (
                            <Fragment>
                                <AddKruise/>
                                <Link to="/">
                                    <AppIconButton title="Home">
                                        <HomeIcon color="secondary" />
                                    </AppIconButton>
                                </Link>
                                <Notifications />
                            </Fragment>
                        ) : (
                            <Fragment>
                                <Button href={null} component={Link} to="/" color="inherit">
                                    Home
                                </Button>
                                <Button href={null} component={Link} to="/login" color="inherit">
                                    Login
                                </Button>
                                <Button href={null} component={Link} to="/signup" color="inherit">
                                    Sign Up
                                </Button>
                            </Fragment>
                        )}
                    </Toolbar>
                </AppBar>

            </div>
        );
    }
}

NavBar.propTypes = {
    authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = ({user: {authenticated}}) => ({authenticated});

export default connect(mapStateToProps)(NavBar);
