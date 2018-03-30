import * as React from 'react';
import {
    Grid,
    Header,
    Button,
    Segment,
    Modal,
    Icon
} from 'semantic-ui-react';

interface IRecipeModalProps {
    recipe: any;
    isOpen: boolean;
    onClose?: any;
}

export class RecipeModal extends React.Component<IRecipeModalProps, {}> {
    static defaultProps = {
        isOpen: false,
        onClose: () => { return ''; }
    };

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="recipe-modal">
                <Modal className="recipe-dialog" open={this.props.isOpen} onClose={this.props.onClose} basic={true} size="large">
                    <Modal.Content>
                        <Segment inverted={true}>
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
                        <Button basic={true} inverted={true} onClick={this.props.onClose}>
                            <Icon name="close" /> Close
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}