import * as React from 'react';
import {
    BrowserRouter as Router,
    Route,
    // Link
} from 'react-router-dom';
import { Wrapper } from './Wrapper';
import { Opts } from './utils/Config';

import './App.css';

interface IAppProps {

}

const home = () => <Wrapper size={Opts.query.size} />;

export default class App extends React.Component<IAppProps, {}> {
    constructor(props: IAppProps) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div className="page-wrapper">
                    <Route exact={true} path="/" component={home} />
                </div>
            </Router>
        );
    }
}