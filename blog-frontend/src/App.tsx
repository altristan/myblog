import React, {useReducer} from 'react';
import './App.css';
import Login from "./components/user/Login";
import Home from "./components/Home";
import Post from "./components/post/Post";
import Edit from "./components/post/Edit";
import Create from "./components/post/Create";
import Navigation from "./components/Navigation";
import {Route, Switch, useLocation} from "react-router";
import Auth from "./components/user/Auth";
import Register from "./components/user/Register";
import {AuthContext, authReducer, INITIAL_STATE} from "./context/auth-context";
import NotFound from "./components/user/NotFound";
//https://erikmartinjordan.com/useContext
function App(): JSX.Element {
    const [authState, authDispatch] = useReducer(
        authReducer,
        INITIAL_STATE
    );
    const location = useLocation();
    // console.log(location.pathname);

    return (
        <AuthContext.Provider value={{state: authState, dispatch: authDispatch}}>
            <div className="App">
                {(location.pathname !== "/404") && (<Navigation/>)}
                <div className={'container'}>
                    <Switch>
                        <Route path={"/"} exact={true} component={Home}/>
                        <Route exact path={"/auth/signin"} component={Login}/>
                        <Route exact path={"/auth/signup"} component={Register}/>
                        <Route exact path={"/auth"} component={Auth}/>
                        <Route exact path={"/post/:postId"} component={Post}/>)
                        <Route exact path={"/404"} component={NotFound}/>
                        {authState.isAuthenticated && (
                            <Route exact path={"/edit/:postId"} component={Edit}/>)
                        }
                        {authState.isAuthenticated && (
                            <Route exact path={"/create"} component={Create}/>)
                        }
                        <Route component={NotFound}/>
                        {/*<Route path={"*"} render={() => <Redirect to={{pathname: "/404"}} />} />*/}
                    </Switch>
                </div>
            </div>
        </AuthContext.Provider>
    );
}

export default App;