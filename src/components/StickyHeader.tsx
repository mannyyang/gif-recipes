import * as React from 'react';
import { Header } from 'semantic-ui-react';

interface IStickyHeaderProps {
    loading?: boolean;
    size?: any;
    fluid?: boolean;
    onChange?: any;
}

export class StickyHeader extends React.Component<IStickyHeaderProps, {}> {
    static defaultProps = {
        loading: false,
        size: 'large',
        fluid: true,
        onChange: () => { return ''; }
    };

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="sticky-header">
                <div className="app-title">
                    <Header as="h1" textAlign="center">
                        QuixCipes
                    </Header>
                </div>
            </div>
        );
    }
}