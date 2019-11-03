import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Link} from "react-router-dom";

import AppIconButton from "./AppIconButton";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";

import {connect} from "react-redux";
import {likeKruise, unlikeKruise} from "../redux/actions/dataActions";

class LikeButton extends Component {

    likedKruise = () => {
        const {user, kruiseId} = this.props;
        return !!(user.likes && user.likes
            .find(like => like.kruiseId === kruiseId));
    };

    likeKruise = () => {
        this.props.likeKruise(this.props.kruiseId)
    };

    unlikeKruise = () => {
        this.props.unlikeKruise(this.props.kruiseId)
    };

    render() {
        const {user: {authenticated}} = this.props;

        return !authenticated ? (
            <Link to="/login">
                <AppIconButton title="Like">
                    <FavoriteBorder color="primary"/>
                </AppIconButton>
            </Link>
        ) : (
            this.likedKruise() ?
                (<AppIconButton onClick={this.unlikeKruise} title="Undo like">
                        <Favorite color="primary"/>
                    </AppIconButton>
                ) :
                (
                    <AppIconButton onClick={this.likeKruise} title="Like">
                        <FavoriteBorder color="primary"/>
                    </AppIconButton>
                )
        );
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    kruiseId: PropTypes.string.isRequired,
    likeKruise: PropTypes.func.isRequired,
    unlikeKruise: PropTypes.func.isRequired
};

const mapStateToProps = ({user}) => ({user});

const mapDispatchToProps = {likeKruise, unlikeKruise};

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
