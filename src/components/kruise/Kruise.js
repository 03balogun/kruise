import React, {Component} from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';

// MUI Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'
import ChatIcon from "@material-ui/icons/Chat";

//
import DeleteKruise from "./DeleteKruise";
import KruiseDialog from "./KruiseDialog";

//
import dayjs from "../plugins/dayjs";

// Redux
import {connect} from "react-redux";
import AppIconButton from "./AppIconButton";
import {Link} from "react-router-dom";
import LikeButton from "./LikeButton";

const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        minWidth: 200,
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
};

class Kruise extends Component {

    render() {
        const {
            kruise: {
                body,
                commentCount,
                createdAt,
                likeCount,
                kruiseId,
                userHandle,
                userImage
            },
            user: {
                authenticated, credentials: {handle}
            },
            classes
        } = this.props;

        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteKruise kruiseId={kruiseId}/>
        ) : null;

        return (
            <Card className={classes.card}>
                <CardMedia
                    image={userImage}
                    title="Profile image"
                    className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`}>{userHandle}</Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton kruiseId={kruiseId} />
                    <span>{likeCount} Likes</span>
                    <AppIconButton title="Comments">
                        <ChatIcon color="primary"/>
                    </AppIconButton>
                    <span>{commentCount} Comments</span>
                    <KruiseDialog kruiseId={kruiseId} userHandle={userHandle}/>
                </CardContent>
            </Card>
        );
    }
}

Kruise.propTypes = {
    user: PropTypes.object.isRequired,
    kruise: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = ({user}) => ({user});


export default connect(mapStateToProps)(withStyles(styles)(Kruise));
