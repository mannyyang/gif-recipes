import * as React from 'react';
import { Header } from 'semantic-ui-react'

interface StickyHeaderProps {
    loading?: boolean;
    size?: any;
    fluid?: boolean;
    onChange?: any;
}

export class StickyHeader extends React.Component<StickyHeaderProps, {}> {
    static defaultProps = {
        loading: false,
        size: 'large',
        fluid: true,
        onChange: () => { }
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sticky-header">
                <div className="app-title">
                    <Header as='h1' textAlign='center'>
                        QuixCipes
                    </Header>
                </div>
            </div>
        );
    }
}