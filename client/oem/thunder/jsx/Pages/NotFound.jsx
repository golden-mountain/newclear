import React from 'react';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';

class NotFound extends React.Component {

    render() {
        return (
            <div className="abs-center wd-xl">
                <div className="text-center mb-xl">
                    <div className="text-lg mb-lg">404</div>
                    <p className="lead m0">We couldn't find this page.</p>
                    <p>The page you are looking for does not exists.</p>
                </div>
                <div className="input-group mb-xl">
                    <input type="text" placeholder="Try with a search" className="form-control" />
                    <span className="input-group-btn">
                     <button type="button" className="btn btn-default">
                        <em className="fa fa-search"></em>
                     </button>
                  </span>
                </div>
                <ul className="list-inline text-center text-sm mb-xl">
                    <li><a href="/dashboard" className="text-muted">Go to App</a>
                    </li>
                    <li className="text-muted">|</li>
                    <li><a href="/login" className="text-muted">Login</a>
                    </li>
                    <li className="text-muted">|</li>
                    <li><a href="/register" className="text-muted">Register</a>
                    </li>
                </ul>
            </div>
            );
    }

}

export default NotFound;

