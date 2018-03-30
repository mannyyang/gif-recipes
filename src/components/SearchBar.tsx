import * as React from 'react';
import {
    Input,
    Form
} from 'semantic-ui-react';

interface ISearchBarProps {
    loading?: boolean;
    size?: any;
    fluid?: boolean;
    onChange?: any;
    onOptChange?: any;
}

interface ISearchBarState {
    value: string;
    isIngreds: boolean;
    isTitle: boolean;
}

export class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {
    static defaultProps = {
        loading: false,
        size: 'large',
        fluid: true,
        onChange: () => { return ''; }
    };

    constructor(props: any) {
        super(props);

        this.state = {
            value: '',
            isIngreds: true,
            isTitle: false
        };

        this._handleChange = this._handleChange.bind(this);
    }

    _handleChange(event: any, data: any) {
        event.preventDefault();

        let isIngreds = this.state.isIngreds;
        let isTitle = this.state.isTitle;
        let value = this.state.value;

        if (data.type === 'checkbox') {
            switch (data.value) {
                case 'ingredients':
                    isIngreds = data.checked;
                    break;
                case 'title':
                    isTitle = data.checked;
                    break;
                default:
                    break;
            }
        } else if (data.type === 'text') {
            value = data.value;
        }

        this.setState(
            {
                isTitle: isTitle,
                isIngreds: isIngreds,
                value: value
            },
            () => {
                this.props.onChange({ ...this.state });
            }
        );
    }

    render() {
        const {
            isIngreds,
            isTitle
        } = this.state;

        return (
            <div className="search-bar">
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Field>
                        <Input
                            loading={this.props.loading}
                            size={this.props.size}
                            fluid={this.props.fluid}
                            icon="search"
                            placeholder="Search..."
                            onChange={this._handleChange}
                        />
                    </Form.Field>
                    <Form.Group inline={true}>
                        <label>Search by</label>
                        <Form.Checkbox label="Ingredients" value="ingredients" checked={isIngreds} onChange={this._handleChange} />
                        <Form.Checkbox label="Title" value="title" checked={isTitle} onChange={this._handleChange} />
                    </Form.Group>
                </Form>
            </div>
        );
    }
}