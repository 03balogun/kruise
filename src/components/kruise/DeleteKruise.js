import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import AppIconButton from "./AppIconButton";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/DeleteOutline";

import {connect} from 'react-redux';
import {deleteKruise} from '../redux/actions/dataActions';

const styles = {
    deleteButton: {
        position: 'absolute',
        top: '10%',
        left: '90%'
    }
};

class DeleteKruise extends Component {
    state = {
        open: false
    };

    openDialog = () => {
        this.setState({open: true});
    };

    closeDialog = () => {
        this.setState({open: false});
    };

    deleteButton = () => {
        this.props.deleteKruise(this.props.kruiseId);
        this.closeDialog();
    };

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <AppIconButton title="Delete Kruise"
                               btnClass={classes.deleteButton}
                               onClick={this.openDialog}>
                    <DeleteIcon color="secondary"/>
                </AppIconButton>
                <Dialog open={this.state.open} onClose={this.closeDialog} fullWidth maxWidth="sm">
                    <DialogTitle>Are you sure you want to delete?</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.closeDialog} color="primary">Cancel</Button>
                        <Button onClick={this.deleteButton} color="secondary">Delete</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
};

DeleteKruise.propTypes = {
    deleteKruise: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    kruiseId: PropTypes.string.isRequired,
};


const mapDispatchToProps = {deleteKruise};

export default connect(null, mapDispatchToProps)(withStyles(styles)(DeleteKruise));
