import * as React from 'react';
import * as ReactDataGrid from 'react-data-grid';
import * as Api from './utils/API';

// import {
//     Button, Form, Segment, Grid
// } from 'semantic-ui-react';

interface AdminProps {
    columns?: any[];
}

interface AdminState {
    recipes: any[];
}

export class Admin extends React.Component<AdminProps, AdminState> {
    static defaultProps: AdminProps = {
        columns: [
            { key: 'id', name: 'ID' },
            { key: 'title', name: 'Title' },
            { key: 'recipe', name: 'Recipe' },
            { key: 'srcLink', name: 'Source Link' },
            { key: 'link', name: 'Link' },
            { key: 'permalink', name: 'Permalink' }
        ]
    };

    constructor(props: any) {
        super(props);

        this.state = {
            recipes: []
        };
    }

    componentDidMount() {
        Api.getAllRawRecipes()
            .then(data => {
                this.setState({
                    recipes: data
                });
            });
    }

    _rowGetter = (i) => {
        return this.state.recipes[i];
    }

    _onRowClick = (rowI, row) => {
        Api.addToProcessed(row)
            .then(() => {
                console.log('success');
            });
    }

    render() {
        return (
            <div>
                <ReactDataGrid
                    columns={this.props.columns}
                    rowGetter={this._rowGetter}
                    rowsCount={this.state.recipes.length}
                    onRowClick={this._onRowClick}
                />
            </div>
        );
    }
}