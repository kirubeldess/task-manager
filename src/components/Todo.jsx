import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

const Todo = () => {

    const [todoList,setTodoList] = useState(localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")): []);
    const [error, setError] = useState("");

    const inputRef = useRef();

    const add = () => {
        const inputText = inputRef.current.value.trim();

        if(inputText === "") {
            setError("Task cannot be empty!");
            return;
        }
        setError("");
        const newTodo = {
            id : Date.now(),
            text: inputText,
            isComplete: false,
        }
        setTodoList((prev)=>[...prev, newTodo]);
        inputRef.current.value = "";
    }

    const deleteTask = (id)=>{
        setTodoList((prvTodos)=>{
            return prvTodos.filter((todo)=> todo.id !== id)
        })
    }

    const toggle = (id)=>{
        setTodoList((prevTodos)=>{
            return prevTodos.map((todo)=>{
                if(todo.id === id){
                    return {...todo, isComplete: !todo.isComplete}
                }
                return todo;
            })
        })
    }

    useEffect(()=>{
        localStorage.setItem("todos", JSON.stringify(todoList))
    },[todoList])

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
        <div className='flex items-center mt-7 gap-2'>
            <img className='w-8' src={todo_icon} alt="todo_icon"  />
            <h1 className='text-3xl font-semibold'>Task Manager</h1>
        </div>

        <div className='flex items-center my-7 bg-gray-200 rounded-full'>
            <input ref={inputRef} type="text" placeholder='add your task' className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' onChange={() => error && setError("")}/>
            <button onClick={add} className='border-none rounded-full bg-green-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>Add</button>
        </div>

        {error && (
            <div className="text-red-600 text-sm mt-2 ml-2">{error}</div>
        )}

        <div >
            {todoList.map((item,index)=>{
                return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTask={deleteTask} toggle={toggle}/>
            })}
            
        </div>
    </div>
  )
}

export default Todo