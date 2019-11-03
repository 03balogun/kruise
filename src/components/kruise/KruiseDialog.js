import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';
import {getPost} from '../redux/actions/dataActions';


// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AppIconButton from "./AppIconButton";
import dayjs from "../plugins/dayjs";
import {Link} from 'react-router-dom';
import LikeButton from "./LikeButton";


const styles = (theme) => ({
    ...theme.appStyles,
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
});


class KruiseDialog extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    openDialog = () => {
        this.setState({open: true, body: '', errors: {}});
        this.props.getPost(this.props.kruiseId);
    };

    closeDialog = () => {
        this.setState({open: false, errors: {}});
    };

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
            classes,
            UI: {isLoading}
        } = this.props;
        const {errors, open} = this.state;

        const dialogMarkup = isLoading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={100} thickness={2}/>
            </div>
        ) : (
            <Grid container spacing={10}>
                <Grid item sm={5}>
                    <img src={userImage} alt={`${userHandle} profile image`} className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={Link}
                        color="primary"
                        variant="h5"
                        to={`/users/${userHandle}`}>
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton kruiseId={kruiseId} />
                    <span>{likeCount} likes</span>
                    <AppIconButton title="comments">
                        <ChatIcon color="primary"/>
                    </AppIconButton>
                    <span>{commentCount} comments</span>
                </Grid>
                <hr className={classes.visibleSeparator}/>
                {/*<CommentForm kruiseId={kruiseId} />*/}
                {/*<Comments comments={comments} />*/}
            </Grid>
        );

        return (
            <Fragment>
                <AppIconButton title="Expand Post" onClick={this.openDialog}
                               btnClass={classes.expandButton}>
                    <UnfoldMore color="primary"/>
                </AppIconButton>
                <Dialog open={open} onClose={this.closeDialog} fullWidth maxWidth="sm">
                    <AppIconButton title="close" onClick={this.closeDialog} btnClass={classes.closeButton}>
                        <CloseIcon/>
                    </AppIconButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

KruiseDialog.propTypes = {
    getPost: PropTypes.func.isRequired,
    kruiseId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    kruise: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
};

const mapDispatchToProps = {getPost};

const mapStateToProps = (state) => {
    return {kruise: state.data.kruise, UI: state.UI};
};

export default connect(mapStateToProps, mapDispatchToProps)
(withStyles(styles)(KruiseDialog));
