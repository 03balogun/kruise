import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';
import {getPost, clearErrors} from '../../redux/actions/dataActions';


// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from "@material-ui/core/Dialog/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import CircularProgress from "@material-ui/core/CircularProgress/index";
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid/index';
import Typography from '@material-ui/core/Typography/index';

import AppIconButton from "./AppIconButton";
import dayjs from "../../plugins/dayjs";
import {Link} from 'react-router-dom';
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";


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
        errors: {},
        oldPath: '',
        newPath: ''
    };

    componentDidMount() {
        if (this.props.openDialog){
            this.openDialog();
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    openDialog = () => {
        let oldPath = window.location.pathname;

        const { userHandle, kruiseId } = this.props;
        const newPath = `/users/${userHandle}/kruise/${kruiseId}`;

        if (oldPath === newPath) oldPath = `/users/${userHandle}`;

        window.history.pushState(null, null, newPath);

        this.setState({open: true, body: '', oldPath, newPath });
        this.props.getPost(this.props.kruiseId);
    };

    closeDialog = () => {
        this.setState({open: false});
        this.props.clearErrors();
        window.history.pushState(null, null, this.state.oldPath);

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
                userImage,
                comments
            },
            classes,
            UI: {isLoading}
        } = this.props;
        const {open} = this.state;

        const dialogMarkup = isLoading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={100} thickness={2}/>
            </div>
        ) : (
            <Grid container>
                <Grid item sm={5}>
                    <img src={userImage} alt={`${userHandle} profile`} className={classes.profileImage}/>
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
                <CommentForm kruiseId={kruiseId} />
                <Comments comments={comments} />
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
    clearErrors: PropTypes.func.isRequired,
    kruiseId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    kruise: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
};

const mapDispatchToProps = {getPost, clearErrors};

const mapStateToProps = (state) => {
    return {kruise: state.data.kruise, UI: state.UI};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(KruiseDialog));
