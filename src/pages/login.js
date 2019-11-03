import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Material Ui
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Link} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

// Asset
import AppIcon from '../assets/logo192.png';

// Redux
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userActions';

const loginStyles = (theme) => ({...theme.appStyles});

class Login extends Component {

    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            errors: {},
        };
    }

    static getDerivedStateFromProps(nextProps, nextContext) {
        if (nextProps.UI.errors){
            return {errors: nextProps.UI.errors}
        } else return nextProps
    }

    handleLoginFormSubmit = async (event) => {
        event.preventDefault();
        const {email, password} = this.state;
        this.props.loginUser({email, password}, this.props.history)
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
                    <form onSubmit={this.handleLoginFormSubmit}>
                        <div className={classes.imageWrapper}>
                            <img src={AppIcon} alt="App Icon" className={classes.appIcon}/>
                        </div>
                        <Typography variant="h2" className={classes.pageTile}>Login</Typography>
                        <TextField type="email"
                                   id="email"
                                   name="email"
                                   label="Email"
                                   className={classes.textField}
                                   helperText={errors.email}
                                   error={!!(errors.email)}
                                   value={this.state.email}
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
                            Login {isLoading && (<CircularProgress className={classes.progressIcon}/>)}
                        </Button>
                        <br/>
                        <br/>
                        <small className={classes.signUpText}>Don't have an account? <Link href={'/signup'}>Sign
                            up</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
};

/**
 * What we are doing here is to map the only state data we need.
 * Which is user and ui we omitted data
 * @param state
 * @return {{ui: *, user: (*|Function)}}
 */
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapDispatchToProps = {
    loginUser
};

/**
 * Connect function
 * It provides its connected component with the pieces of the data it needs from the store,
 * and the functions it can use to dispatch actions to the store.
 * more here https://react-redux.js.org/api/connect
 */
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(loginStyles)(Login));
