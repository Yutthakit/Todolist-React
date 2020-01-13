import React from 'react'
import TodoForm from './components/TodoForm'

export default props => (
    <div style= {{ display: "flex", justifyContent: "center" }}>
        <button 
            style={{
                borderRadius: "50%", 
                width: "24px" , 
                height: "24px", 
                justifyContent: "center",
                backgroundColor : props.todo.completed ? "green" : ""
            }}
            onClick={props.toggleComplete}
        >
            {props.todo.ticked}
        </button>
        <div
            style={{ textDecoration: props.todo.completed ? "line-through" : "" }}
            onClick={props.toggleComplete}
        >
            {props.todo.text}
        </div>
        <button onClick={props.onDelete}>x</button>
    </div>
)