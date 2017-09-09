import * as React from 'react';
import {
    Grid,
    Header,
    Button,
    Segment,
    Modal,
    Icon
} from 'semantic-ui-react';

interface RecipeModalProps {
    recipe: any;
    isOpen: boolean;
    onClose?: any;
}

export class RecipeModal extends React.Component<RecipeModalProps, {}> {
    static defaultProps = {
        isOpen: false,
        onClose: () => { }
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="recipe-modal">
                <Modal className="recipe-dialog" open={this.props.isOpen} onClose={this.props.onClose} basic size="large">
                    <Modal.Content>
                        <Segment inverted>
                            <Grid columns={2} stackable={true}>
                                <Grid.Column>
                                    <video src={this.props.recipe.link} autoPlay={true} controls={true} />
                                </Grid.Column>
                                <Grid.Column>
                                    <Header content={this.props.recipe.title} />
                                    <p>{this.props.recipe.recipe}</p>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button basic inverted onClick={this.props.onClose}>
                            <Icon name="close" /> Close
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}