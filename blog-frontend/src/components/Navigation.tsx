import React, {useContext, useEffect} from 'react';
import {Link, useHistory, withRouter} from 'react-router-dom';
import {AuthContext} from "../context/auth-context";
import {authorizedAction, unauthorizedAction} from "../context/auth-actions";

function Navigation() {
    const {state, dispatch} = useContext(AuthContext);
    let history = useHistory();
    useEffect(() => {
        dispatch(authorizedAction());
    }, []);

    return (
        <nav className="navbar navbar-expand-xl navbar-dark bg-dark fixed-top">
            <li><Link className="navbar-brand nav-link"
                      to="/" onClick={() => {
                dispatch(authorizedAction());
            }}> Home </Link></li>
            {!state.isAuthenticated && (
                <li><Link className="navbar-brand nav-link" to="/auth"> Account </Link></li>
            )}
            {state.isAuthenticated && (
                <li><Link className="navbar-brand nav-link" to="/create"> Create </Link></li>
            )}
            {state.isAuthenticated && (
                <li><Link className="navbar-brand nav-link"
                          to="/"
                          onClick={() => {
                              window.localStorage.clear();
                              dispatch(unauthorizedAction());
                          }}
                > Logout </Link></li>
            )}
            {/*{state.isAuthenticated && (*/}
            {/*    <li><Link className="navbar-brand nav-link" to="/profile"> Profile </Link></li>*/}
            {/*)}*/}

            <div className="collapse navbar-collapse bg-dark" id="navbarSupportedContent">
                <ul className="navbar-nav navbar-brand mr-auto">
                    <li className="nav-item"></li>
                </ul>

                {/*<ul className="navbar-nav navbar-brand">*/}
                {/*    <li className="nav-item dropdown">*/}
                {/*        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"*/}
                {/*           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
                {/*            <strong>TBD</strong>*/}
                {/*        </a>*/}
                {/*        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">*/}
                {/*            <div className="px-2">Hello</div>*/}
                {/*        </div>*/}
                {/*    </li>*/}
                {/*</ul>*/}
            </div>
        </nav>
    );
}

export default withRouter(Navigation);