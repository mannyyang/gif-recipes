import * as React from 'react';
import {
    Loader
} from 'semantic-ui-react';

interface IRecipeCardProps {
    recipe: any;
    onExpandClick: Function;
    onVideoLoaded?: Function;
}

interface IRecipeCardState {
    recipeDuration?: number;
    currentTime?: number;
    isPlaying?: boolean;
    isLoading: boolean;
    isHovered: boolean;
}

export class RecipeCard extends React.Component<IRecipeCardProps, IRecipeCardState> {
    vidEl: any;

    constructor(props) {
        super(props);

        this.state = {
            recipeDuration: 1,
            currentTime: 0,
            isPlaying: false,
            isLoading: true,
            isHovered: false
        };

        // this._onSliderChange = this._onSliderChange.bind(this);
        // this._togglePlay = this._togglePlay.bind(this);
        //this._toggleControls = this._toggleControls.bind(this);
        this._clearLoader = this._clearLoader.bind(this);
        this._onExpandClick = this._onExpandClick.bind(this);
    }

    componentDidMount() {
        // this.vidEl.addEventListener('durationchange', (ev) => {
        // this.setState({
        //     recipeDuration: this.vidEl.duration,
        //     isPlaying: true
        // });

        //this.vidEl.play();
        // });
        this.vidEl.addEventListener('canplay', this._clearLoader);
        this.vidEl.addEventListener('loadeddata', this.props.onVideoLoaded);
        // this.vidEl.addEventListener('timeupdate', (ev) => {
        //     this.setState({
        //         currentTime: this.vidEl.currentTime
        //     });
        // });
    }

    componentWillUnmount() {
        this.vidEl.removeEventListener('canplay', this._clearLoader);
        this.vidEl.removeEventListener('loadeddata', this.props.onVideoLoaded);
    }

    _clearLoader() {
        this.setState({
            isLoading: false
        });
    }

    // _toggleControls() {
    //     this.setState({
    //         isHovered: !this.state.isHovered
    //     });
    // }

    _onExpandClick() {
        this.props.onExpandClick(this.props.recipe);
    }

    render() {
        return (
            <div className="recipe-card">
                <div onClick={this._onExpandClick} title={this.props.recipe.title}>
                    {/* <div className="card-media-actions">
                        <Icon name="expand" onClick={this._onExpandClick} />
                    </div> */}
                    <div className="card-media">
                        {
                            this.state.isLoading &&
                            <div className="card-loader">
                                <Loader active>Loading</Loader>
                            </div>
                        }
                        <video src={this.props.recipe.link || 'n/a'}
                            ref={(el) => { this.vidEl = el; }}
                        />
                        <div className="card-header" title={this.props.recipe.title}>
                            <span className="card-title">
                                {this.props.recipe.title}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}