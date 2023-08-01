"use client";
import { Card } from "react-bootstrap";
import TodoApp from "./components/TodoApp";
import "bootstrap/dist/css/bootstrap.min.css";
export default function Home() {
  return (
    <main className="d-flex justify-content-center align-item-center my-5  ">
      <Card
        className="p-4 vw-80 "
        style={{ background: "#eff1f2", width: "60vw" }}
      >
        <TodoApp />
      </Card>
    </main>
  );
}
