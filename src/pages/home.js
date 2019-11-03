import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Grid from "@material-ui/core/Grid";
import Kruise from "../components/kruise/Kruise";
import Profile from "../components/profile/Profile";
import KruiseLoadingPlaceHolder from "../components/KruiseLoadingPlaceHolder";

// Redux
import {connect} from 'react-redux';
import {getKruises} from '../redux/actions/dataActions';

class Home extends Component {

    componentDidMount() {
        this.props.getKruises();
    }

    render() {
        const {kruises, loading} = this.props.data;
        const kruiseMarkUp = !loading ?
            (kruises.map((kruise, index) => <Kruise key={index} kruise={kruise}/>))
            : (<KruiseLoadingPlaceHolder />);
        return (
            <Grid spacing={10} container>
                <Grid sm={8} xs={12} item>
                    {kruiseMarkUp}
                </Grid>
                <Grid sm={4} xs={12} item>
                    <Profile/>
                </Grid>
            </Grid>
        );
    }
}

Home.propTypes = {
    data: PropTypes.object.isRequired,
    getKruises: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({data: state.data});

const mapDispatchToProps = {
    getKruises
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
