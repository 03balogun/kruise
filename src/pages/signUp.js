import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography'
import AppIcon from '../assets/logo192.png';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Link} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux
import {connect} from 'react-redux';
import {signupUser} from '../redux/actions/userActions';


const signUpstyles = (theme) => ({ ...theme.appStyles});

class SignUp extends Component {

    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {},
        };
    }

    static getDerivedStateFromProps(nextProps, nextContext) {
        if (nextProps.UI.errors){
            return {errors: nextProps.UI.errors}
        } else return nextProps
    }

    handleSignUpFormSubmit = async (event) => {
        event.preventDefault();
        const {email, password, handle, confirmPassword} = this.state;
        this.props.signupUser({email, password, handle, confirmPassword}, this.props.history);
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const {classes, UI: {isLoading}} = this.props;
        const {errors} = this.state;

        return (
            <Grid container>
                <Grid item sm/>
                <Grid item sm>
                    <form onSubmit={this.handleSignUpFormSubmit}>
                        <div className={classes.imageWrapper}>
                            <img src={AppIcon} alt="App Icon" className={classes.appIcon}/>
                        </div>
                        <Typography variant="h2" className={classes.pageTile}>SignUp</Typography>
                        <TextField type="email"
                                   id="email"
                                   name="email"
                                   label="Email"
                                   className={classes.textField}
                                   helperText={errors.email}
                                   error={!!(errors.email)}
                                   value={this.state.email}
                                   onChange={this.handleChange} fullWidth/>

                        <TextField type="text"
                                   id="handle"
                                   name="handle"
                                   label="Handle"
                                   className={classes.textField}
                                   helperText={errors.handle}
                                   error={!!(errors.handle)}
                                   value={this.state.handle}
                                   onChange={this.handleChange} fullWidth/>

                        <TextField type="password"
                                   id="password"
                                   name="password"
                                   label="Password"
                                   className={classes.textField}
                                   helperText={errors.password}
                                   error={!!(errors.password)}
                                   value={this.state.password}
                                   onChange={this.handleChange} fullWidth/>

                        <TextField type="password"
                                   id="confirmPassword"
                                   name="confirmPassword"
                                   label="Confirm Password"
                                   className={classes.textField}
                                   helperText={errors.password}
                                   error={!!(errors.password)}
                                   value={this.state.confirmPassword}
                                   onChange={this.handleChange} fullWidth/>

                        {(!this.state.isLoading && this.state.errors.general) && (
                            <Typography variant="body2" className={classes.customError}>
                                {this.state.errors.general}
                            </Typography>
                        )}

                        <Button type="submit"
                                variant="contained"
                                className={classes.button}
                                color="primary"
                                disabled={isLoading}
                                href={null}>
                            SignUp {isLoading && (<CircularProgress className={classes.progressIcon}/>)}
                        </Button>
                        <br/>
                        <br/>
                        <small className={classes.signUpText}>Already have an account? <Link href={'/login'}>Login</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapDispatchToProps = {
    signupUser
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(signUpstyles)(SignUp));
