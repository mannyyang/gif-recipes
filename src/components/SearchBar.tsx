import * as React from 'react';
import {
    Input,
    Form
} from 'semantic-ui-react'

interface SearchBarProps {
    loading?: boolean;
    size?: any;
    fluid?: boolean;
    onChange?: any;
    onOptChange?: any;
}

interface SearchBarState {
    value: string;
    isIngreds: boolean;
    isTitle: boolean;
}

export class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
    static defaultProps = {
        loading: false,
        size: 'large',
        fluid: true,
        onChange: () => { }
    }

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            isIngreds: true,
            isTitle: false
        }

        this._handleChange = this._handleChange.bind(this);
    }

    _handleChange(event, data) {
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
                
            }
        }
        else if (data.type === 'text') { 
            value = data.value;
        }

        this.setState({
            isTitle: isTitle,
            isIngreds: isIngreds,
            value: value
        }, () => { 
            this.props.onChange({ ...this.state });
        });
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
                    <Form.Group inline>
                        <label>Search by</label>
                        <Form.Checkbox label="Ingredients" value="ingredients" checked={isIngreds} onChange={this._handleChange} />
                        <Form.Checkbox label="Title" value="title" checked={isTitle} onChange={this._handleChange} />
                    </Form.Group>
                </Form>
            </div>
        );
    }
}