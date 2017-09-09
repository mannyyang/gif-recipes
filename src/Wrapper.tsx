import * as React from 'react';
import {
    Container
} from 'semantic-ui-react';
import { SearchBar } from './components/SearchBar';
import { StickyHeader } from './components/StickyHeader';
import { SearchResults } from './components/SearchResults';
import { RecipeModal } from './components/RecipeModal';
import * as debounce from 'lodash.debounce';
import { Opts } from './utils/Config';
import * as API from './utils/API';

interface WrapperProps {
    size: number;
}

interface WrapperState {
    recipes: any;
    isSearching: boolean;
    searchIndex: number;
    searchVal: string;
    hasResults: boolean;
    currRecipe: any;
    isCurrRecipeOpen: boolean;
    options: any;
}

export class Wrapper extends React.Component<WrapperProps, WrapperState> {
    vidEl: any;

    static defaultProps: WrapperProps = {
        size: Opts.query.size
    };

    constructor(props) {
        super(props);

        this.state = {
            recipes: [],
            isSearching: false,
            searchIndex: 0,
            searchVal: '',
            hasResults: true,
            currRecipe: {},
            isCurrRecipeOpen: false,
            options: {}
        };

        this._search = this._search.bind(this);
        this._handleSearchChange = this._handleSearchChange.bind(this);
        this._handleNextClick = this._handleNextClick.bind(this);
        this._viewRecipe = this._viewRecipe.bind(this);
        this._closeRecipeDialog = this._closeRecipeDialog.bind(this);
        this._getNextSet = this._getNextSet.bind(this);
    }

    _search = debounce(this._handleSearchChange, 200);

    _handleSearchChange(queryObj) {
        if (queryObj.value.length > 1) {
            this.setState({
                isSearching: true,
                searchVal: queryObj.value,
                options: {
                    title: queryObj.isTitle,
                    ingredients: queryObj.isIngreds
                }
            });

            API.searchRecipes({
                query: queryObj.value,
                from: this.state.searchIndex,
                size: this.props.size,
                options: {
                    title: queryObj.isTitle,
                    ingredients: queryObj.isIngreds
                }
            })
                .then(recipes => this.setState({
                    recipes: recipes,
                    isSearching: false
                }))
                .catch(ex => this.setState({ isSearching: false }));
        }
    }

    _handleNextClick() {
        this.setState({
            searchIndex: this.state.searchIndex + this.props.size
        }, this._getNextSet);
    }

    _getNextSet() {
        API.searchRecipes({
            query: this.state.searchVal,
            from: this.state.searchIndex,
            size: this.props.size,
            options: this.state.options
        })
            .then(recipes =>
                recipes.length > 0
                    ? this.setState({ recipes: this.state.recipes.concat(recipes) })
                    : this.setState({ hasResults: false })
            )
            .catch(ex => {
                this.setState({
                    isSearching: false
                });
            });
    }

    _viewRecipe(recipe) {
        this.setState({
            currRecipe: recipe,
            isCurrRecipeOpen: true
        });
    }

    _closeRecipeDialog() {
        this.setState({
            isCurrRecipeOpen: false
        });
    }

    render() {
        return (
            <div className="wrapper">
                <div className="wrapper__center">
                    <StickyHeader />
                    <Container text={true}>
                        <SearchBar loading={this.state.isSearching} size="large" fluid={true} onChange={this._search} />
                        <SearchResults recipes={this.state.recipes} onExpandClick={this._viewRecipe} onNextClick={this._handleNextClick} />
                    </Container>
                    <RecipeModal recipe={this.state.currRecipe} isOpen={this.state.isCurrRecipeOpen} onClose={this._closeRecipeDialog}/>
                </div>
            </div>
        );
    }
}