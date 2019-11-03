import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import axios from "../plugins/axios";
import Kruise from '../components/kruise/Kruise';
import StaticProfile from '../components/profile/StaticProfile';
import KruiseLoadingPlaceHolder from "../components/KruiseLoadingPlaceHolder";

import Grid from '@material-ui/core/Grid';

import {getUserData} from '../redux/actions/dataActions';
import ProfileLoadingPlaceHolder from "../components/ProfileLoadingPlaceHolder";

class User extends Component {

    state = {
        profile: null,
        kruiseIdParam: null,
    };

    componentDidMount() {
        const {handle, kruiseId} = this.props.match.params;

        if (kruiseId) this.setState({kruiseIdParam: kruiseId});

        this.props.getUserData(handle);
        axios
            .get(`/user/${handle}`)
            .then((res) => {
                this.setState({profile: res.data.user});
            })
            .catch((err) => console.log(err));
    }

    render() {
        const {kruises, loading} = this.props.data;
        const {kruiseIdParam} = this.state;

        const kruiseMarkup = loading ? (
            <KruiseLoadingPlaceHolder />
        ) : kruises === null ? (
            <p>No kruise from this user</p>
        ) : !kruiseIdParam ? (
            kruises.map((kruise) => <Kruise key={kruise.kruiseId} kruise={kruise}/>)
        ) : (
            kruises.map((kruise) => {
                if (kruise.kruiseId !== kruiseIdParam)
                    return <Kruise key={kruise.kruiseId} kruise={kruise}/>;
                else return <Kruise key={kruise.kruiseId} kruise={kruise} openDialog/>;
            })
        );

        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {kruiseMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (
                        <ProfileLoadingPlaceHolder/>
                    ) : (
                        <StaticProfile profile={this.state.profile}/>
                    )}
                </Grid>
            </Grid>
        );
    }
}

User.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps, {getUserData})(User);
