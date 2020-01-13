import React from 'react'
import styles from './NewTodo.module.css'

function NewTodo(props) {
    const { onValue, onAdd, value } = props
    return (
        <div className={styles.Root}>
            <input className={styles.Input} placeholder="Enter Todo" 
            value={value} onChange={onValue}/>
            <div className={styles.Button} onClick={onAdd}> ADD </div>
        </div>
    )
}
export default NewTodo