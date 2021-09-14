import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

interface Todo {
  value: string;
}

function App() {
  const [text, setText] = useState("")
  const [todos, setTodos] = useState<Array<Todo>>([])

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement | HTMLInputElement>) => {
    e.preventDefault();
    if (!text) return;

    const newTodo: Todo = {
      value: text,
    }

    setTodos([newTodo, ...todos])
    setText("")
  }
  return (
    <form onSubmit={(e) => handleOnSubmit(e)}>
      <input type="text" value={text}  onChange={(e) => setText(e.target.value)} />
      <input type="submit" value="追加" onSubmit={(e) => handleOnSubmit(e)} />
    </form>
  );
}

export default App;
