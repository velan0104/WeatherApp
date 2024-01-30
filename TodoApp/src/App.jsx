import './App.css'
import { useState , useEffect } from 'react'
import { TodoProvider } from './context';
import { TodoForm,TodoItem } from './Components';

function App() {
  const [theme,setTheme] = useState("dark");
  const [todos,setTodos] = useState([]);
  const addTodo = (todo) =>{
    setTodos((prev) =>[{id: Date.now(),...todo},...prev]);
  }
  const updateTodo = (id,todo) =>{
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))) 
  } 

  const deleteTodo = (id) =>{
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleCompleted = (id) =>{
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo,completed : !prevTodo.completed} : prevTodo))
  } 

  const changeTheme = () =>{
    setTheme( theme == "light" ? "dark" : "light");
    // document.querySelector('html').classList.remove('dark','light');
    // document.querySelector('html').classList.add({theme});
    console.log(theme)
  }

  useEffect(()=>{
      const todos = JSON.parse(localStorage.getItem("todos"));

      if(todos && todos.length > 0){
        setTodos(todos);
      }
  },[])

  useEffect(() =>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])

  return (
    <>
      <TodoProvider value = {{todos,addTodo,updateTodo,deleteTodo,toggleCompleted}}>
         <div className='bg-[#232423] min-h-screen py-8 '>
         <button onClick = {changeTheme}><span className ="material-symbols-outlined bg-white text-green-500 p-3 rounded-full relative translate-x-full translate-y-2 cursor-pointer"> light_mode </span></button>
            <div className='w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white'>
              <h1 className = "text-2xl font-bold text-center mb-8 mt-2">
                Manage Your Todos
                
              </h1>
              <div className='mb-4'>
                  <TodoForm/>
              </div>
              <div className='flex flex-wrap gap-y-3'>
                {todos.map((todo) => (
                  <div key = {todo.id} className='w-full'>
                    <TodoItem todo ={todo}/>
                  </div>
                ))}
              </div>
            </div>
         </div>
      </TodoProvider>
    </>
  )
}

export default App
