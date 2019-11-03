import React from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//Redux
import {Provider} from 'react-redux';
import store from './redux/store';
import {checkAuthentication} from "./redux/actions/userActions";

//Style
import './App.css';
import styleObject from './assets/styles'

//Pages
import home from "./pages/home";
import login from "./pages/login";
import signUp from "./pages/signUp";
import user from "./pages/user";
import NavBar from "./components/layout/NavBar";


//Customize Material Theme
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import AuthRoute from "./components/kruise/AuthRoute";

const theme = createMuiTheme(styleObject);

// Check Auth
store.dispatch(checkAuthentication(window.location));


function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <Router>
                    <NavBar/>
                    <div className="container">
                        <Switch>
                            <Route exact path='/' component={home}/>
                            <AuthRoute exact path='/login' component={login}/>
                            <AuthRoute exact path='/signup' component={signUp}/>
                            <Route exact path='/users/:handle' component={user}/>
                            <Route
                                exact
                                path="/users/:handle/kruise/:kruiseId"
                                component={user}
                            />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        </MuiThemeProvider>
    );
}

export default App;
