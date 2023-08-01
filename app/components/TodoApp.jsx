"use client";
import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Table from "react-bootstrap/Table";
import { Button, Stack } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const TodoApp = () => {
  const initialState = () => JSON.parse(localStorage.getItem("Tasks")) || [];
  const [tasks, setTasks] = useState(initialState);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState("");

  const inputRef = useRef(null);

  const handleChange = (e) => {
    const { value } = e.target;
    setNewTask((prevState) => (prevState = value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask === "") return;
    if (!isEditing) {
      const newTaskArr = [
        ...tasks,
        { id: uuidv4(), title: newTask, completed: false },
      ];
      setTasks((prevState) => (prevState = newTaskArr));
      setNewTask("");
      inputRef.current.focus();
    } else {
      const newArr = tasks.slice();
      const indexArr = newArr.map((arr) => arr.id);
      const index = indexArr.indexOf(editId);
      newArr.splice(index, 1, { id: editId, title: newTask, completed: false });
      setTasks((prevState) => (prevState = newArr));
      setNewTask("");
      setEditId("");
      setIsEditing(false);
      inputRef.current.focus();
    }
  };

  const handleClear = () => {
    setTasks([]);
    inputRef.current.focus();
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewTask("");
    setEditId("");
    inputRef.current.focus();
  };

  const handleDelete = (id) => {
    setTasks((prevState) => prevState.filter((task) => task.id !== id));
  };

  const handleEdit = (id) => {
    const item = tasks.find((task) => task.id === id);
    setNewTask(item.title);
    setIsEditing(true);
    setEditId(item.id);
    inputRef.current.focus();
  };

  const handleCheck = (title, id) => {
    if (tasks.find((task) => task.id === id).completed) {
      const newArr = tasks.slice();
      const indexArr = newArr.map((arr) => arr.id);
      const index = indexArr.indexOf(id);
      newArr.splice(index, 1, { id, title, completed: false });
      setTasks((prevState) => (prevState = newArr));
    } else {
      const newArr = tasks.slice();
      const indexArr = newArr.map((arr) => arr.id);
      const index = indexArr.indexOf(id);
      newArr.splice(index, 1, { id, title, completed: true });
      setTasks((prevState) => (prevState = newArr));
    }
  };

  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const liStyle = {
    textDecoration: "line-through",
    fontWeight: "100",
    fontStyle: "italic",
  };
  const TaskLists = tasks.map((task) => {
    return (
      <>
        <Stack
          direction="horizontal"
         
          gap={3}
          className="d-flex justify-content-between mt-4 "
        >
          <div className="p-2">{task.title}</div>
          <div className="p-2">
            <Button
              variant="outline-primary"
              className="mx-2"
              onClick={() => handleEdit(task.id)}
            >
              <FaEdit />
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => handleDelete(task.id)}
            >
              <AiFillDelete />
            </Button>
          </div>
        </Stack>
      </>
    );
  });
  return (
    <>
      <TodoForm
        onSubmit={handleSubmit}
        value={newTask}
        onChange={handleChange}
        onClick={!isEditing ? handleClear : handleCancel}
        isEditing={isEditing}
        reference={inputRef}
      />
      <TodoList>
        {tasks.length > 0 ? TaskLists : <span>Add tasks above</span>}
      </TodoList>
    </>
  );
};

export default TodoApp;
