import * as React from 'react';
import {
    Button,
    Segment
} from 'semantic-ui-react';
import Bricks from 'bricks.js';

import { RecipeCard } from './RecipeCard';
import { Opts } from '../utils/Config';

interface ISearchResultsProps {
    recipes: Array<any>;
    onExpandClick: Function;
    onNextClick: (event: any, data: any) => void;
}

export class SearchResults extends React.Component<ISearchResultsProps, {}> {
    static defaultProps = {
        recipes: [],
        onExpandClick: () => { return ''; }
    };

    BricksLayout: any;

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        // create an instance
        this.BricksLayout = Bricks({
            container: '.search-results',
            packed: 'recipe-brick',
            sizes: [
                { columns: 2, gutter: 12 },
                { mq: '768px', columns: 3, gutter: 12 },
                { mq: '1024px', columns: 3, gutter: 12 }
            ],
            // position: false
        });

        this.BricksLayout.resize(true);
        // this.BricksLayout.pack();
    }

    componentWillReceiveProps() {
        this.BricksLayout.pack();
    }

    render() {
        return (
            <div className="search-results-wrapper">
                <div className="search-results">
                    {
                        this.props.recipes && this.props.recipes.map(recipe => {
                            return (
                                <RecipeCard
                                    key={recipe.id}
                                    recipe={recipe}
                                    onExpandClick={this.props.onExpandClick}
                                    onVideoLoaded={this.BricksLayout.pack}
                                />
                            );
                        })
                    }
                </div>
                <div className="search-results-more">
                    {
                        this.props.recipes.length > 0 && this.props.recipes.length % Opts.query.size === 0 && // this.state.recipes.hasResults &&
                        <Segment tertiary={true} className="next-btn-container">
                            <Button onClick={this.props.onNextClick} secondary={true} content="Load More" icon="plus" labelPosition="right" />
                        </Segment>
                    }
                </div>
            </div>
        );
    }
}