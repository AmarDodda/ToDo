import React, { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [filter, setFilter] = useState("all");

  const addTodo = () => {
    if (!todoName.trim() || !todoDescription.trim()) return;
    const newTodo = {
      id: Date.now(),
      name: todoName,
      description: todoDescription,
      status: "not completed",
    };
    setTodos([...todos, newTodo]);
    setTodoName("");
    setTodoDescription("");
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateStatus = (id, newStatus) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: newStatus };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const filterTodos = (status) => {
    setFilter(status);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    return todo.status === filter;
  });

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="add-todo row">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Todo Name"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Todo Description"
            value={todoDescription}
            onChange={(e) => setTodoDescription(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary mt-2" onClick={addTodo}>
            Add Todo
          </button>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>
          <b>My ToDos</b>
        </h3>
        <div className="filter" style={{ width: "150px", marginLeft: "auto" }}>
          <label htmlFor="status-filter" style={{ marginRight: "0.5rem" }}>
            <b>Filter:</b>
          </label>
          <select
            id="status-filter"
            className="form-control form-control-sm"
            onChange={(e) => filterTodos(e.target.value)}
            value={filter}
          >
            <option value="all">All</option>
            <option value="not completed">Not Completed</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="todos">
        {filteredTodos.map((todo) => (
          <div key={todo.id} className="todo-card">
            <h3>Name: {todo.name}</h3>
            <p>Description: {todo.description}</p>
            <label htmlFor={`status-${todo.id}`}>Status:</label>
            <select
              id={`status-${todo.id}`}
              value={todo.status}
              onChange={(e) => updateStatus(todo.id, e.target.value)}
            >
              <option value="not completed">Not Completed</option>
              <option value="completed">Completed</option>
            </select>
            <div className="actions">
              <button
                className="btn btn-primary"
                onClick={() => handleEdit(todo)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
