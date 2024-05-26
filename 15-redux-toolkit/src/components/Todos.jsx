import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {removeTodo} from '../features/todo/todoSlice'
import TodoItem from './TodoItem.jsx'
import { useEffect } from 'react'

function Todos() {
    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()

    useEffect(() => {
      try {
        localStorage.setItem('todos', JSON.stringify(todos));
      } catch (error) {
        console.error('Failed to save todos to localStorage:', error);
      }
    }, [todos]);

  return (
    <>
      {
      todos.map((todo)=>{
        // console.log(todo);
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </>
  )
}

export default Todos