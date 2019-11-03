import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';
import {addKruise, clearErrors} from '../../redux/actions/dataActions';


// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from "@material-ui/core/Dialog/index";
import DialogTitle from "@material-ui/core/DialogTitle/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import TextField from "@material-ui/core/TextField/index";
import DialogActions from "@material-ui/core/DialogActions/index";
import CircularProgress from "@material-ui/core/CircularProgress/index";
import Button from "@material-ui/core/Button/index";

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import AppIconButton from "./AppIconButton";

const styles = (theme) => ({
    ...theme.appStyles,
    closeButton: {
        position: 'absolute',
        top: '10%',
        left: '90%',
    },
    button: {
        float: 'right'
    }
});

class AddKruise extends Component {
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
    };

    closeDialog = () => {
        this.props.clearErrors();
        this.setState({open: false, errors: {}});
    };

    handleAddKruise = (event) => {
        event.preventDefault();
        this.props.addKruise({body: this.state.body});
        if (!this.props.isLoading && !this.state.errors) {
            this.closeDialog();
        }
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.UI.errors) {
            this.setState({errors: nextProps.UI.errors});
        }
        if (!nextProps.UI.errors && !nextProps.UI.isLoading) {
            this.setState({body: '', open: false, errors: {}});
        }
    }

    render() {
        const {classes, UI: {isLoading}} = this.props;
        const {errors, open} = this.state;

        return (
            <Fragment>
                <AppIconButton title="Add Post" onClick={this.openDialog}>
                    <AddIcon/>
                </AppIconButton>
                <Dialog open={open} onClose={this.closeDialog} fullWidth maxWidth="sm">
                    <AppIconButton title="close" onClick={this.closeDialog} btnClass={classes.closeButton}>
                        <CloseIcon/>
                    </AppIconButton>
                    <DialogTitle>Whats on your mind?</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleAddKruise}>
                            <TextField name="body"
                                       type="text"
                                       label="Post whats on your mind, catch cruise my guy!!!"
                                       multiline
                                       rows="3"
                                       placeholder="Add post"
                                       className={classes.textField}
                                       fullWidth
                                       error={!!errors.body}
                                       helperText={errors.body}
                                       value={this.state.body} onChange={this.handleChange}/>
                            <Button type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button} disabled={isLoading}>
                                Submit {isLoading && (<CircularProgress className={classes.progressIcon}/>)}
                            </Button>
                        </form>
                    </DialogContent>

                    <DialogActions>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }

}

AddKruise.propTypes = {
    addKruise: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    UI: state.UI
});

const mapDispatchToProps = {addKruise, clearErrors};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddKruise));
