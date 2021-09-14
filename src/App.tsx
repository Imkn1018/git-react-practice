import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

interface Todo {
  value: string;
  id: number;
  checked: boolean;
}

function App() {
  const [text, setText] = useState("")
  const [todos, setTodos] = useState<Array<Todo>>([])

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement | HTMLInputElement>) => {
    e.preventDefault();
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
    }

    setTodos([newTodo, ...todos])
    setText("")
  }

  // どのtodoが編集されたのかを特定するため、そのtodoのidを引数として受け取る
  const handleOnEdit = (id:number, value:string) => {
    const newTodos = todos.map((todo) => {
      if( todo.id === id) {
          todo.value = value;
      }
      return todo;
    })
    setTodos(newTodos)
  }

  const handleOnCheck = (id: number, checkd: boolean) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id){
        todo.checked = !checkd
      }
      return todo
    })
    setTodos(newTodos)
  }
  return (
    <>
    <form onSubmit={(e) => handleOnSubmit(e)}>
      <input type="text" value={text}  onChange={(e) => setText(e.target.value)} />
      <input type="submit" value="追加" onSubmit={(e) => handleOnSubmit(e)} />
    </form>
    <ul>
        {todos.map((todo) => {
          return (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.checked} onChange={(e) => handleOnCheck(todo.id, todo.checked)} />
            <input type="text" value={todo.value} onChange={(e) => handleOnEdit(todo.id, e.target.value)} />
          </li>
          )
        })}
    </ul>
    </>
  );
}

export default App;
