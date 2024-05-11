import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  addTodo,
  deleteTodo,
  updateTodo,
  getAllTodo,
  getTodo,
} from "../features/todo/todoSlice";

const Todo = () => {
  const navigate = useNavigate();
  const [addtasks, setAddtasks] = useState({
    task: "",
  });

  const [updatetasks, setUpdatetasks] = useState("");
  const [todoToUpdateId, setTodoToUpdateId] = useState(null);

  const [todoToDeleteId, setTodoToDeleteId] = useState(null);

  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos);
  
  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addTodo(addtasks.task));
    setAddtasks({ task: "" });
  };


  const handleUpdate = () => {
    dispatch(updateTodo({ id: todoToUpdateId, text: updatetasks }));
    setTodoToUpdateId(null);
    setUpdatetasks("");
  };


  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
    setTodoToDeleteId(null);
  };


  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    setAddtasks((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };


  const handleChangeUpdate = (e) => {
    setUpdatetasks(e.target.value);
  };


  const handleEdit = (id, text) => {
    // Function to handle edit icon click
    setTodoToUpdateId(id);
    setUpdatetasks(text);
  };


  const handleLogout = async(e) =>{
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(response.status, data);
        toast.success("Logout Successfully");
        setTimeout(() => {
          navigate("/login");
        }, 500);
      } else if (response.status === 400) {
        console.log(response.status);
        toast.error("No token found");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }


  useEffect(() => {
    dispatch(getAllTodo())
  }, [])
  


  return (
    <>
      <div className="container w-100 vh-100 border">
        <div className="row">
          <div className="col d-flex justify-content-between my-3">
            <div className="mt-2">
              <button
                type="button"
                className="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalAdd"
              >
                Add Task
              </button>
            </div>
            <h1 className="text-center common-heading pt-0">Todo List</h1>
            <div className="mt-2">
              <button
                type="button"
                className="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalLogout"
              >
                <i class="fa-solid fa-user"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="container mb-2 todo-container">
          {todos.map((todo) => (
            <div
              className="border todo-row d-flex justify-content-center align-items-center px-2 py-2"
              key={todo._id}
            >
              <input class="form-check-input" type="checkbox" value="" />
              <input
                type="text"
                class="form-control mx-2"
                value={todo.title}
                readOnly
              />
              <i
                class="fa-solid fa-trash mx-2"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalDelete"
                onClick={() => setTodoToDeleteId(todo._id)}
              ></i>
              <i
                class="fa-solid fa-pen mx-2"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalUpdate"
                onClick={() => handleEdit(todo._id, todo.title)}
              ></i>
            </div>
          ))}
        </div>
      </div>

      {/* Update Model */}
      <div
        class="modal fade"
        id="exampleModalUpdate"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Update Task
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                id="text"
                aria-describedby="text"
                placeholder="Write Here......"
                name="task"
                value={updatetasks}
                onChange={handleChangeUpdate}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Model */}
      <div
        class="modal fade"
        id="exampleModalDelete"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">Are you want to delete?</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => handleDelete(todoToDeleteId)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Model */}
      <div
        className="modal fade"
        id="exampleModalAdd"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Task
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                id="text"
                aria-describedby="text"
                placeholder="Write Here......"
                name="task"
                value={addtasks.task}
                onChange={handleChangeAdd}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAdd}
                data-bs-dismiss="modal" // Add this attribute
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Model */}
      <div
        className="modal fade"
        id="exampleModalLogout"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Logout
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Are you want to Logout</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleLogout}
                data-bs-dismiss="modal" // Add this attribute
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Todo;
