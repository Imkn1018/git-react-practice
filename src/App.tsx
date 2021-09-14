import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

interface Todo {
  value: string;
}

function App() {
  const [text, setText] = useState("")
  const [todos, setTodos] = useState<Array<Todo>>([])
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input type="text" value={text}  onChange={(e) => setText(e.target.value)} />
      <input type="submit" value="追加" onSubmit={(e) => e.preventDefault()} />
    </form>
  );
}

export default App;
