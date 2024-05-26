import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, editTodo } from '../features/todo/todoSlice';

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.text);
  const todos = useSelector((state) => state.todos);

  const handleEditTodo = () => {
    dispatch(editTodo({
      id: todo.id,
      newText: todoMsg,
    }));
    setIsTodoEditable(false);
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="mt-4 flex items-center bg-zinc-800 px-4 py-2 rounded">
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg text-white ${
          isTodoEditable ? 'border-black/10 px-2' : 'border-transparent'
        }`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />

      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50 mr-2"
        onClick={() => {
          if (isTodoEditable) {
            handleEditTodo();
          } else {
            setIsTodoEditable((prev) => !prev);
          }
        }}
      >
        {isTodoEditable ? '📁' : '✏️'}
      </button>

      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => dispatch(removeTodo(todo.id))}
      >
        ❌
      </button>
    </div>
  );
}