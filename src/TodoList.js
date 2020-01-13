import React from 'react'
import TodoForm from './components/TodoForm'
import Todo from './Todo'

const API =`http://localhost:3001`

export default class TodoList extends React.Component {
  state = {
    todos: [],
    todoToShow: 'all'
  }
  //  componentDidMount = async () => {
  //    const response = await fetch('...')
  //    const data = await response.json()
     
  //    this.setState({
  //      ...
  //    })
  //  }

  componentDidMount = async() => {
    const URL = API + '/todos'
    const response = await fetch(URL)
    const todos = await response.json()
    
    this.setState({todos})
  }

  addTodo = async (todo) => {
    if(todo.text === "") {
      alert('Please input data')  
      return
    }

    const todon = {text: todo.text, completed: false, ticked: false }
    await fetch(`${API}/todos`, {
      method : 'POST',
      headers : { 'content-type' : 'application/json'},
      body: JSON.stringify(todon)
    })

    const response = await fetch(`${API}/todos`)
    const todos = await response.json()

    this.setState({
      todos: [todo, ...this.state.todos]
    })
  }
  toggleComplete = async (id) => {

    const tickedTodo = this.state.todos.find(x => x.id === id)
    tickedTodo.completed = !tickedTodo.completed
    tickedTodo.ticked = !tickedTodo.ticked
    
    await fetch(`${API}/todos/${id}`, {
      method : 'PUT',
      headers : { 'content-type' : 'application/json'},
      body: JSON.stringify(tickedTodo)
    })

    const response = await fetch(`${API}/todos`)
    const todos = await response.json()

    this.setState({todos})
    // this.setState({
    //   todos: this.state.todos.map(todo => {
    //     if (todo.id === id) {
    //       return {
    //         ...todo,
    //         completed: !todo.completed
    //       }
    //     } else {
    //       return todo
    //     }
    //   })
    // })
  }

  updateTodoToShow = (s) => {
    this.setState({
      todoToShow : s
    })
  }
  handleDeleteTodo = async (id) => {
  
    await fetch(`${API}/todos/${id}`, {
      method: 'DELETE',
      headers : { 'content-type' : 'application/json'}
    })

    const response = await fetch(`${API}/todos`)
    const todos = await response.json()

    this.setState({todos})
  }
  render() {
    let todos =[];

    if (this.state.todoToShow === 'all') {
      todos = this.state.todos;
    } 
    else if (this.state.todoToShow === 'active') {
      todos = this.state.todos.filter(todo => !todo.completed);
    }
    else if (this.state.todoToShow === 'completed') {
      todos = this.state.todos.filter(todo => todo.completed);
    }

    return (
      <div>
        <TodoForm onSubmit={this.addTodo} />
        {todos.map(todo => (
          <Todo key={todo.id} toggleComplete={() => this.toggleComplete(todo.id)} 
          onDelete={() => this.handleDeleteTodo(todo.id)}
          todo={todo} 
        />))}
        <div style= {{ display: "flex", justifyContent: "center" }}>todos left:{this.state.todos.filter(todo => !todo.completed).length}
        </div>
        <div style= {{ display: "flex", justifyContent: "center" }}>
          <button onClick={() => (this.updateTodoToShow('all'))}>all</button>
          <button onClick={() => (this.updateTodoToShow('active'))}>active</button>
          <button onClick={() => (this.updateTodoToShow('completed'))}>completed</button>
        </div>
      </div>
    )
  }
}


