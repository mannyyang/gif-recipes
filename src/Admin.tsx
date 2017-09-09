import * as React from 'react';
import * as moment from 'moment';
import * as elasticsearch from 'elasticsearch-browser';
import {
    Button, Form, Segment, Grid
} from 'semantic-ui-react';

const ESClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

interface IAdminProps {

}

interface recipe {
    title: string;
    id?: string;
    author?: string;
    link?: string;
    linkType?: string;
    comments?: Array<any>;
    createdAt?: moment.Moment;
    modifiedAt?: string;
    timeStamp?: string;
    recipe?: string;
    tags?: string;
    isProcessed: boolean;
}


interface IAdminState {
    currentPos: number;
    currentRecipe: recipe;
    modifiedRecipe: recipe;
}

export class Admin extends React.Component<IAdminProps, IAdminState> {
    constructor(props) {
        super(props);

        this.state = {

            currentPos: 1,
            currentRecipe: {
                timeStamp: '',
                title: '',
                isProcessed: false
            },
            modifiedRecipe: {
                timeStamp: '',
                title: '',
                id: '',
                tags: '',
                link: '',
                linkType: '',
                author: '',
                createdAt: moment(),
                modifiedAt: '',
                recipe: '',
                comments: [],
                isProcessed: false
            }
        };

        this._onFormChange = this._onFormChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._reset = this._reset.bind(this);
    }

    componentDidMount() {
        ESClient.search({
            index: 'raw',
            type: 'recipe',
            size: 1,
            from: this.state.currentPos
        })
            .then((json: any) => {
                if (json.hits.hits.length === 0) {
                    return ESClient.search({
                        index: 'raw',
                        type: 'recipe',
                        size: 1,
                        from: this.state.currentPos
                    });
                }
                else {
                    return Promise.resolve(json);
                }
            })
            .then((json) => { 
                this.setState({
                    currentRecipe: json.hits.hits[0]._source,
                    modifiedRecipe: json.hits.hits[0]._source
                });
            })
            .catch(ex => {
                console.log('An error occured querying for position: ' + this.state.currentPos, ex);
            });
    }

    _onFormChange(type, event) {
        const updatedRecipe: any = {
            ...this.state.modifiedRecipe
        };

        switch (type) {
            case 'timestamp':
                updatedRecipe.timeStamp = event.target.value;
                break;
            case 'title':
                updatedRecipe.title = event.target.value;
                break;
            case 'tags':
                updatedRecipe.tags = event.target.value;
                break;
            case 'link':
                updatedRecipe.link = event.target.value;
                break;
            case 'linkType':
                updatedRecipe.linkType = event.target.value;
                break;
            case 'recipe':
                updatedRecipe.recipe = event.target.value;
                break;
            case 'author':
                updatedRecipe.author = event.target.value;
                break;
            default:
                console.log(type + ' type not available');
        }


        this.setState({
            modifiedRecipe: {
                ...updatedRecipe,
                isProcessed: true
            }
        })
    }

    _onSubmit(ev) {
        ev.preventDefault();
        ESClient.index({
            // opType: 'index',
            index: 'processed',
            type: 'recipe',
            id: this.state.modifiedRecipe.id,
            body: this.state.modifiedRecipe
        });
    }

    _reset() {
        this.setState({
            modifiedRecipe: this.state.currentRecipe
        });
    }

    render() {

        return (
            <Segment>
                <div>
                    Is Proccessed: {this.state.modifiedRecipe.isProcessed.toString()}
                </div>
                <div className="admin-page">
                    <Grid>
                        <Grid.Column width={8}>
                            <Form onSubmit={this._onSubmit}>
                                <Form.Field>
                                    <label>Timestamp</label>
                                    <input placeholder='Timestamp' value={this.state.modifiedRecipe.timeStamp} disabled />
                                </Form.Field>
                                <Form.Field>
                                    <label>Title</label>
                                    <input placeholder='Title' value={this.state.modifiedRecipe.title} onChange={this._onFormChange.bind(this, 'title')} />
                                </Form.Field>
                                <Form.Field>
                                    <label>ID</label>
                                    <input placeholder='ID' value={this.state.modifiedRecipe.id} disabled />
                                </Form.Field>
                                <Form.Field>
                                    <label>Tags</label>
                                    <input placeholder='Tags' value={this.state.modifiedRecipe.tags ? this.state.modifiedRecipe.tags : ''} onChange={this._onFormChange.bind(this, 'tags')} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Link</label>
                                    <input placeholder='Link' value={this.state.modifiedRecipe.link} onChange={this._onFormChange.bind(this, 'link')} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Link Type</label>
                                    <input placeholder='Link Type' value={this.state.modifiedRecipe.linkType} onChange={this._onFormChange.bind(this, 'linkType')} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Author</label>
                                    <input placeholder='Author' value={this.state.modifiedRecipe.author} onChange={this._onFormChange.bind(this, 'author')} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Created At</label>
                                    <input placeholder='Created At' disabled value={
                                        this.state.modifiedRecipe.createdAt
                                            ? moment(this.state.modifiedRecipe.createdAt, "YYYY-MM-DD HH:mm").toLocaleString()
                                            : ''
                                    } />
                                </Form.Field>
                                <Form.Field>
                                    <label>Modified At</label>
                                    <input placeholder='Modified At' disabled value={
                                        this.state.modifiedRecipe.modifiedAt
                                            ? this.state.modifiedRecipe.modifiedAt.toString()
                                            : ''
                                    } />
                                </Form.Field>
                                <Form.Field>
                                    <label>Recipe</label>
                                    <textarea placeholder='Recipe' value={this.state.modifiedRecipe.recipe} onChange={this._onFormChange.bind(this, 'recipe')} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Comments</label>
                                    <textarea placeholder='Comments' value={JSON.stringify(this.state.modifiedRecipe.comments)} disabled />
                                </Form.Field>

                                <Button type='submit'>Update</Button>
                                <Button type='button' onClick={this._reset}>Reset</Button>
                            </Form>
                        </Grid.Column>
                        <Grid.Column>

                        </Grid.Column>
                    </Grid>
                </div>
            </Segment>
        );
    }
}