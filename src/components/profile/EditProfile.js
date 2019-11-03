import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';
import {editUserDetails} from '../../redux/actions/userActions';

// MUI
import EditIcon from "@material-ui/icons/Edit";
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from "@material-ui/core/Dialog/index";
import DialogTitle from "@material-ui/core/DialogTitle/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import TextField from "@material-ui/core/TextField/index";
import DialogActions from "@material-ui/core/DialogActions/index";
import Button from "@material-ui/core/Button/index";
import AppIconButton from "../kruise/AppIconButton";


const styles = (theme) => ({
    ...theme.appStyles,
    button: {
        float: 'right'
    }
});

class EditProfile extends Component {

    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    };

    componentDidMount() {
        this.mapUserDetailsToState();
    }

    openDialog = () => {
        this.setState({open: true});
        this.mapUserDetailsToState();
    };

    closeDialog = () => {
        this.setState({open: false});
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = () => {
        const {bio, website, location} = this.state;
        this.props.editUserDetails({bio, website, location});
        this.closeDialog();
    };

    mapUserDetailsToState = () => {
        const {bio, website, location} = this.props.credentials;
        this.setState({
            bio: bio ? bio : '',
            website: website ? website : '',
            location: location ? location : '',
        })
    };

    render() {
        const {classes} = this.props;

        return (
            <Fragment>
                <AppIconButton title="Edit Details" onClick={this.openDialog} btnClass={classes.button}>
                    <EditIcon color="primary"></EditIcon>
                </AppIconButton>

                <Dialog open={this.state.open} onClose={this.closeDialog} fullWidth maxWidth="sm">
                    <DialogTitle>Edit your profile</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField name="bio"
                                       type="text"
                                       label="Bio"
                                       multiline
                                       rows="3"
                                       placeholder="A short bio about yourself"
                                       className={classes.textField}
                                       fullWidth
                                       value={this.state.bio} onChange={this.handleChange}/>

                            <TextField name="website"
                                       type="text"
                                       label="Website"
                                       placeholder="Your personal website."
                                       className={classes.textField}
                                       fullWidth
                                       value={this.state.website} onChange={this.handleChange}/>

                            <TextField name="location"
                                       type="text"
                                       label="Location"
                                       placeholder="Your location i.e Milan, Italy."
                                       className={classes.textField}
                                       fullWidth
                                       value={this.state.location} onChange={this.handleChange}/>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

EditProfile.propTypes = {
    classes: PropTypes.object.isRequired,
    editUserDetails: PropTypes.func.isRequired,
};

const mapStateToProps = ({user: {credentials}}) => {
    return {credentials};
};

const mapDispatchToProps = {editUserDetails};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditProfile));
