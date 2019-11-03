/**
 * Created by PhpStorm.
 * User: Balogun Wahab
 * Date: 10/2/19
 * Time: 11:40 AM
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const authRoute = ({component: Component, authenticated, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => authenticated ? <Redirect to='/' /> : <Component {...props} />}
        />
    );
};

authRoute.propTypes = {
    authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(authRoute);
