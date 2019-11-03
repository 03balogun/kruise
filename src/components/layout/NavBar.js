import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import AppIconButton from "./AppIconButton";

//
import HomeIcon from '@material-ui/icons/Home';
import NotificationIcon from '@material-ui/icons/Notifications';

//
import AddKruise from './AddKruise'

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
                                <Link to="/notifications">
                                    <AppIconButton title="Notification">
                                        <NotificationIcon color="secondary" />
                                    </AppIconButton>
                                </Link>
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
