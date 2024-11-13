
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, deleteUser, updateUser } from "../redux/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import "./TodoList.css";

const User = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [completedTasks, setCompletedTasks] = useState({});

  const { data } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleAddClick = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    setName("");
    setDescription("");
  };

  const handleEditClick = (user) => {
    setIsModalOpen(true);
    setIsEditing(true);
    setCurrentUserId(user.id);
    setName(user.name);
    setDescription(user.description);
  };

  const handleSave = () => {
    if (isEditing) {
      dispatch(updateUser({ id: currentUserId, name, description }));
    } else {
      dispatch(addUser({ name, description }));
    }
    setIsModalOpen(false);
  };

 
  const handleDelete = (id) => {
    
    const updatedCompletedTasks = { ...completedTasks };
    delete updatedCompletedTasks[id];
      dispatch(deleteUser(id));
    setCompletedTasks(updatedCompletedTasks);
  };
  
 const toggleStatus = (id) => {
    setCompletedTasks({
      ...completedTasks, 
      [id]: !completedTasks[id]
    });
  };
  
  const completedCount = Object.values(completedTasks).filter((status) => status).length;
  console.log(completedCount);
  
  const totalCount = data.length;
  console.log(totalCount);
  
  return (
    <div>
      <div className="task-completion">
        Task Completed <span className="task-count"> {`${completedCount}/${totalCount}`}</span>
      </div>
      <div className="container">
        <div className="task-list">
          <button onClick={handleAddClick} className="addNewTask btn btn-primary">+ Add new task</button>
          {data.map((user) => (
            <div key={user.id} className="user-row">
              <FontAwesomeIcon
                icon={faCircle}
                id="circleicon"
                className={`status-icon ${completedTasks[user.id] ? "green-circle" : "red-circle"}`}
              />
              <span className="user-title">{user.name}</span>
              <FontAwesomeIcon
                icon={faCircleCheck}
                className={`check-icon ${completedTasks[user.id] ? "hidden" : ""}`}
                onClick={() => toggleStatus(user.id)}
              />
              <button onClick={() => handleEditClick(user)} type="button" class=" editbtn" >
                Edit
              </button>
              <button onClick={() => handleDelete(user.id)} type="button" class="deletebtn">
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="second-div">
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <div className="form-field">
                  <label htmlFor="name">Name:</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="modal-input"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="description">Details:</label>
                  <br/>
                  <textarea
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="details-input"
                  />
                </div>
                <div className="modal-buttons">
                  <button onClick={handleSave}>{isEditing ? "Update" : "Save"}</button>
                  <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
