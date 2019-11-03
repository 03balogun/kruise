import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

//Redux
import {uploadProfileImage, logout} from '../redux/actions/userActions';

// Material Ui
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";

// Router
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";

// Icons
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import LocationOn from "@material-ui/icons/LocationOn";
import EditIcon from "@material-ui/icons/Edit";
import LogoutIcon from "@material-ui/icons/KeyboardReturn";

// Component
import EditProfile from './EditProfile';

//Plugin
import dayjs from "../plugins/dayjs";
import AppIconButton from "./AppIconButton";


const styles = (theme) => ({...theme.appStyles});

class Profile extends Component {

    onProfileImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadProfileImage(formData);
    };

    handleEditPicture = () => {
        document.getElementById('changeProfileImage')
            .click();
    };

    handleLogout = () => {
        this.props.logout();
    };

    render() {
        const {
            classes,
            user: {
                credentials: {handle, createdAt, imageUrl, bio, website, location},
                loadingUser,
                authenticated
            }
        } = this.props;

        return !loadingUser ? (
            authenticated ? (
                <Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <div className="image-wrapper">
                            <img src={imageUrl} alt="profile" className="profile-image"/>
                            <input type="file" hidden="hidden" id="changeProfileImage"
                                   onChange={this.onProfileImageChange}/>
                            <AppIconButton title="Change profile image"
                                           onClick={this.handleEditPicture} btnClass="button">
                                <EditIcon color="primary"/>
                            </AppIconButton>
                        </div>
                        <hr/>
                        <div className="profile-details">
                            <MuiLink
                                component={Link}
                                to={`/users/${handle}`}
                                color="primary"
                                variant="h5">
                                @{handle}
                            </MuiLink>
                            <hr/>
                            {bio && <Typography variant="body2">{bio}</Typography>}
                            <hr/>
                            {location && (
                                <Fragment>
                                    <LocationOn color="primary"/> <span>{location}</span>
                                    <hr/>
                                </Fragment>
                            )}
                            {website && (
                                <Fragment>
                                    <LinkIcon color="primary"/>
                                    <a href={website} target="_blank" rel="noopener noreferrer">
                                        {' '}
                                        {website}
                                    </a>
                                    <hr/>
                                </Fragment>
                            )}
                            <CalendarToday color="primary"/>{' '}
                            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                        </div>
                        <AppIconButton title="Logout" onClick={this.handleLogout} btnClass="button">
                            <LogoutIcon color="primary"/>
                        </AppIconButton>
                        <EditProfile/>
                    </div>
                </Paper>
            ) : (
                <Paper className={classes.paper}>
                    <Typography variant="body2" align="center">
                        Login or signup to share your kruise
                    </Typography>
                    <div className={classes.buttons}>
                        <Button
                            variant="contained"
                            color="primary"
                            component={Link}
                            to="/login"
                        >
                            Login
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            component={Link}
                            to="/signup"
                        >
                            Signup
                        </Button>
                    </div>
                </Paper>
            )
        ) : (
            <p>Loading...</p>
        );
    }
}

const mapDispatchToProps = {logout, uploadProfileImage};

function mapStateToProps({user}) {
    return {user};
}

Profile.propTypes = {
    logout: PropTypes.func.isRequired,
    uploadProfileImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));
