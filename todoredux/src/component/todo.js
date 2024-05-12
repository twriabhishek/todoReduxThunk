import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { convertUTCtoIST } from "./utils.js";
import {
  addTodo,
  deleteTodo,
  updateTodo,
  getAllTodo,
  getSingleTodo,
} from "../features/todo/todoSlice";
import {endpoints} from '../ApiEndpoint.js';

const Todo = () => {
  const navigate = useNavigate();
  const [addtasks, setAddtasks] = useState({
    task: "",
    description: "",
  });

  const [updatetasks, setUpdatetasks] = useState({
    task: "",
    description: "",
  });
  const [todoToUpdateId, setTodoToUpdateId] = useState(null);

  const [todoToDeleteId, setTodoToDeleteId] = useState(null);

  const [todoToView, setTodoToView] = useState({});

  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos);
  const isLoading = useSelector((state) => state.isLoading);
  console.log(isLoading);

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addTodo(addtasks));
    setAddtasks({ task: "", description: "" });
  };

  const handleUpdate = () => {
    dispatch(
      updateTodo({
        id: todoToUpdateId,
        task: updatetasks.task,
        description: updatetasks.description,
      })
    );
    setTodoToUpdateId(null);
    setUpdatetasks("");
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
    setTodoToDeleteId(null);
  };

  const handleView = (id) => {
    console.log(id);
    dispatch(getSingleTodo(id))
      .then((action) => {
        setTodoToView(action.payload);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    setAddtasks((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setUpdatetasks((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleEdit = (id, text, description) => {
    // Function to handle edit icon click
    setTodoToUpdateId(id);
    setUpdatetasks({
      task: text,
      description: description,
    });
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(endpoints.logoutAuth, {
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
  };

  useEffect(() => {
    dispatch(getAllTodo());
  }, [dispatch]);

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

        {/* Show spinner while loading */}
        {isLoading && (
          <div className="d-flex justify-content-center my-3">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {!isLoading && (
          <div className="container mb-2 todo-container">
            {todos.length === 0 ? (
              <div className="text-center fs-3">Add a task</div>
            ) : (
              todos.map((todo) => (
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
                    class="fa-solid fa-eye"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalView"
                    onClick={() => handleView(todo._id)}
                  ></i>
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
                    onClick={() =>
                      handleEdit(todo._id, todo.title, todo.description)
                    }
                  ></i>
                </div>
              ))
            )}
          </div>
        )}
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
                value={updatetasks.task}
                onChange={handleChangeUpdate}
              />
              <textarea
                class="form-control mt-2"
                id="description"
                rows="6"
                aria-describedby="text"
                placeholder="Write Description here......"
                name="description"
                value={updatetasks.description}
                onChange={handleChangeUpdate}
              ></textarea>
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
                placeholder="Write Title Here......"
                name="task"
                value={addtasks.task}
                onChange={handleChangeAdd}
              />
              <textarea
                class="form-control mt-2"
                id="description"
                rows="6"
                aria-describedby="text"
                placeholder="Write Description here......"
                name="description"
                value={addtasks.description}
                onChange={handleChangeAdd}
              ></textarea>
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

      {/* View Model */}
      <div
        class="modal fade"
        id="exampleModalView"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                {todoToView.title}
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              class="modal-body"
              style={{ overflowY: "auto", maxHeight: "80vh" }}
            >
              {todoToView.description}
            </div>
            <div class="modal-footer d-flex justify-content-between">
              <p>Created Date: {convertUTCtoIST(todoToView.updatedAt)}</p>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
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
