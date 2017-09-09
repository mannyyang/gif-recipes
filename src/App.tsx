import * as React from 'react';
import {
    BrowserRouter as Router,
    Route,
    // Link
} from 'react-router-dom';
import { Admin } from './Admin';
import { Wrapper } from './Wrapper';
import { Opts } from './utils/Config';

import "./App.css";

interface AppProps {

}

const home = () => (
    <div>
        <Wrapper size={Opts.query.size}/>
    </div>
);

const admin = () => (
    <div>
        <Admin />
    </div>
);

export default class App extends React.Component<AppProps, {}> {
    constructor(props: AppProps) {
        super(props);
    }

    render() {

        return (
            <Router>
                <div>
                    {/* <ul className="side-bar">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/Admin">Admin</Link></li>
                    </ul> */}
                    <div className="page-wrapper">
                        <Route exact path="/" component={home} />
                        <Route path="/admin" component={admin} />
                    </div>
                </div>
            </Router>
        );
    }
}