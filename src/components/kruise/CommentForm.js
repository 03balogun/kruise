/**
 * Created by PhpStorm.
 * User: Balogun Wahab
 * Date: 10/27/19
 * Time: 5:58 PM
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// Redux stuff
import {connect} from 'react-redux';
import {submitComment} from '../../redux/actions/dataActions';
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
    ...theme.appStyles
});

class CommentForm extends Component {
    state = {
        body: '',
        errors: {}
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({errors: nextProps.UI.errors});
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({body: ''});
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitComment(this.props.kruiseId, {body: this.state.body});
    };

    render() {
        const {classes, authenticated, UI: {isSubmittingComment}} = this.props;
        const errors = this.state.errors;

        return authenticated ? (
            <Grid item sm={12} style={{textAlign: 'center'}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name="body"
                        type="text"
                        label="Comment on kruise"
                        error={!!errors.comment}
                        helperText={errors.comment}
                        value={this.state.body}
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.textField}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmittingComment}
                        className={classes.button}>
                        Submit {isSubmittingComment && (<CircularProgress className={classes.progressIcon}/>)}
                    </Button>
                </form>
                <hr className={classes.visibleSeparator}/>
            </Grid>
        ) : null;
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    kruiseId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI,
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps, {submitComment})(withStyles(styles)(CommentForm));
