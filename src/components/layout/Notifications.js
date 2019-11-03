import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import dayjs from '../../plugins/dayjs';
import PropTypes from 'prop-types';
// MUI stuff
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import IconButton from "@material-ui/core/IconButton";

// Redux
import {connect} from 'react-redux';
import {markNotificationsRead} from '../../redux/actions/userActions';

class Notifications extends Component {
    state = {
        anchorEl: null
    };
    handleOpen = (event) => {
        this.setState({anchorEl: event.target});
    };
    handleClose = () => {
        this.setState({anchorEl: null});
    };
    onMenuOpened = () => {
        let unreadNotificationsIds = this.props.notifications
            .filter((notification) => !notification.read)
            .map((notification) => notification.notificationId);
        this.props.markNotificationsRead(unreadNotificationsIds);
    };

    render() {
        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl;

        let notificationsIcon;
        // Get the number of unread notifications
        const unReadNotifications = notifications
            .filter(notification => notification.read === false).length;

        // If its greater than 0 user a badge have the number of unseen notification, else use plain icon
        notificationsIcon = (unReadNotifications > 0) ?
            (<Badge badgeContent={unReadNotifications} color="secondary"><NotificationsIcon/></Badge>)
            : (<NotificationsIcon/>);

        let notificationsMarkup = notifications && notifications.length > 0 ? (
            notifications.map((notification) => {
                const verb = notification.type === 'like' ? 'liked' : 'commented on';
                const time = dayjs(notification.createdAt).fromNow();
                const iconColor = notification.read ? 'primary' : 'secondary';
                const icon =
                    notification.type === 'like' ? (
                        <FavoriteIcon color={iconColor} style={{marginRight: 10}}/>
                    ) : (
                        <ChatIcon color={iconColor} style={{marginRight: 10}}/>
                    );

                return (
                    <MenuItem key={notification.createdAt} onClick={this.handleClose}>
                        {icon}
                        <Typography
                            component={Link}
                            color="default"
                            variant="body1"
                            to={`/users/${notification.recipient}/kruise/${notification.kruiseId}`}>
                            {notification.sender} {verb} your kruise {time}
                        </Typography>
                    </MenuItem>
                );
            })
        ) : (
            <MenuItem onClick={this.handleClose}>
                You have no notifications yet
            </MenuItem>
        );
        return (
            <Fragment>
                <Tooltip placement="top" title="Notifications">
                    <IconButton
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleOpen}>
                        {notificationsIcon}
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened}>
                    {notificationsMarkup}
                </Menu>
            </Fragment>
        );
    }
}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    notifications: state.user.notifications
});

export default connect(mapStateToProps, {markNotificationsRead})(Notifications);
