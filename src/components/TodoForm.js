import React from 'react';
import shortid from 'shortid'

export default class TodoForm extends React.Component {

    state = {
        text: ''
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit({
            id: shortid.generate(),
            text : this.state.text,
            completed: false,
            ticked : false
        });
        this.setState({
            text:""
        })
    }
    render() {
        return (
        <div style={{display: "flex", justifyContent:"center"}}>
            <form onSubmit={this.handleSubmit}>
            <input
                name="text"
                value={this.state.text}
                onChange={this.handleChange}
                placeholder="todos..."
            />
            <button onClick={this.handleSubmit}>add todo</button>
        </form>
        </div>
        )
    }
}
