import React from 'react';
import {withRouter, Link} from 'react-router-dom';

function Auth(): JSX.Element {

    return (
        <div className="auth-area fixed-top-margin">
            <div className="bg-light mt-5 col-md-4 m-auto pb-2">
                <h4 className="mt-5 mb-2 center-header">Login to an existing account or register</h4>
                <Link to={`/auth/signin`} className="btn btn-primary btn-block">Login</Link>
                <Link to={`/auth/signup`} className="btn btn-secondary btn-block">Register</Link>
            </div>
        </div>
    );
}

export default withRouter(Auth)