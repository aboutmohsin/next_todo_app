import React from "react";
import { Stack } from "react-bootstrap";
const TodoList = (props) => {
  return (
    <ul className="my-4" style={{borderTop:"0.5px solid #000"}}>
      {props.children}
    </ul>
  );
};

export default TodoList;
