import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router";
import {useHistory} from "react-router-dom";

function NotFound(): JSX.Element {
    let history = useHistory();
    let time = 1500;
    const [timeLeft, setTimeLeft] = useState(time);

    const calculateTimeLeft = () => {
        if ((time - timeLeft) > 0) {

        }
    }

    useEffect(() => {
        const counter = setTimeout(() => {
        })
    })

    setTimeout(() => {
        history.push('/');
    }, time);

    return(
        <div className="fixed-top-margin">
            <h2>404</h2>
            {/*<h5>Redirecting in {time/1000}...</h5>*/}
        </div>
    )
}

export default withRouter(NotFound)