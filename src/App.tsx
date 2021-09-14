import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

interface Todo {
  value: string;
  id: number;
  checked: boolean;
  removed: boolean
}

type Filter = "all" | "checked" | "unchecked" | "removed"



function App() {
  const [text, setText] = useState("")
  const [todos, setTodos] = useState<Array<Todo>>([])

  const [filter, setFilter] = useState<Filter>("all")

  const fileterTodos = todos.filter((todo) => {
    switch(filter) {
      case "all":
        return !todo.removed
      case "checked":
        return todo.checked && !todo.removed
      case "unchecked":
        return !todo.checked && !todo.removed
      case "removed":
          return todo.removed;
      default:
        return todo
    }
  })

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement | HTMLInputElement>) => {
    e.preventDefault();
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false
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

  const handleOnRemove  = (id: number, removed: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed;
      }
      return todo;
    })
    setTodos(newTodos)
  }

  const handleOnEmpty = () => {
    const newTodos = todos.filter((todo) => !todo.removed)
    setTodos(newTodos)
  }


  return (
    <>
    <select
        defaultValue="all"
        onChange={(e) => setFilter(e.target.value as Filter)}>
        <option value="all">すべてのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">未完了のタスク</option>
        <option value="removed">削除済みのタスク</option>
    </select>
    {filter === "removed" ? (
      <button onClick={() => handleOnEmpty()} disabled={todos.filter((todo) => todo.removed).length === 0}>
        ゴミ箱を空にする
      </button>
    ) : (
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <input type="text" value={text}  onChange={(e) => setText(e.target.value)} disabled={filter === "checked"}/>
        <input type="submit" value="追加" onSubmit={(e) => handleOnSubmit(e)} disabled={filter === "checked"} />
      </form>
    )}  
  
    <ul>
        {fileterTodos.map((todo) => {
          return (
          <li key={todo.id}>
            <input type="checkbox" disabled={todo.removed} checked={todo.checked} onChange={(e) => handleOnCheck(todo.id, todo.checked)} />
            <input type="text" value={todo.value} onChange={(e) => handleOnEdit(todo.id, e.target.value)} disabled={todo.checked || todo.removed} />
            <button onClick={() => handleOnRemove(todo.id, todo.removed)}>
              {todo.removed ? "復元" : "削除"}
              </button>
          </li>
          )
        })}
    </ul>
    </>
  );
}

export default App;
