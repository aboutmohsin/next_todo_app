import React from "react";
import { Button, Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FcTodoList } from "react-icons/fc";
const TodoForm = (props) => {
  return (
    <Stack direction="vertical" gap={3} className="d-flex  ">
      <h1 className="text-center  align-item-center">
        <FcTodoList size={40} />
        <span className="text-primary fw-bold px-2 ">List Your Task</span>
      </h1>

      <form
        className="d-flex gap-3 bg-color p-4 shadow-lg"
        style={{ borderRadius: "10px" }}
        onSubmit={props.onSubmit}
      >
        <Form.Control
          className="no-border-outline bg-transparent"
          style={{ border: "none ", outline: "none" }}
          type="text"
          id="inputPassword5"
          placeholder="Add a task..."
          value={props.value}
          onChange={props.onChange}
          maxLength="40"
          ref={props.reference}
          required
          aria-describedby="passwordHelpBlock"
        />
        <Button variant="danger" type="submit" className="w-fit">
          {!props.isEditing ? "Add" : "Update"}
        </Button>
      </form>
    </Stack>
  );
};

export default TodoForm;
