import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, deleteUser, updateUser } from "../redux/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import "./TodoList.css";

function TaskCompletedInformation() {
  return <div></div>;
}

function TaskList() {}

const User = () => {
  // There is order we used to follow for importing
  /**
   * useDispatch
   * useNavigate
   * useParams
   * useState
   * useSelector
   *
   * functions
   * useEffect
   */

  const dispatch = useDispatch();

  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  // const [currentUserId, setCurrentUserId] = useState(null);
  // const [isEditing, setIsEditing] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [completedTasks, setCompletedTasks] = useState({});

  const [taskData, setTaskData] = useState({});
  const { id = "", name = "", description = "" } = taskData;

  // Dont destructure, instead give state.users.data and keep the variable name as data
  const data = useSelector((state) => state.users.data);

  const completedCount = Object.values(completedTasks).filter((status) => status).length;
  console.log(completedCount);

  const totalCount = data.length;
  console.log(totalCount);

  function openTaskModal(user = {}) {
    setIsModalOpen(true);

    // setIsEditing(id);
    // setCurrentUserId(id);

    setTaskData(user);

    // setName(name);
    // setDescription(description);
  }

  // const handleAddClick = () => {
  //   setIsModalOpen(true);
  //   setIsEditing(false);
  //   setName("");
  //   setDescription("");
  // };

  // Above and below functions can be merged to one function

  // const handleEditClick = (user) => {
  //   setIsModalOpen(true);
  //   setIsEditing(true);

  //   // Destructure the user information and pass accordingly
  //   setCurrentUserId(user.id);
  //   setName(user.name);
  //   setDescription(user.description);
  // };

  // Break it into two different funtions for more readability (Edit and Save)
  const handleSave = () => {
    const taskData = { id, name, description };

    if (id) {
      dispatch(updateUser({ taskData }));
    } else {
      dispatch(addUser({ taskData }));
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    const updatedCompletedTasks = { ...completedTasks };
    delete updatedCompletedTasks[id];
    dispatch(deleteUser({ taskId: id }));
    setCompletedTasks(updatedCompletedTasks);
  };

  const toggleStatus = (id) => {
    // use callback function which gives latest value in the state
    setCompletedTasks({
      ...completedTasks,
      [id]: !completedTasks[id],
    });
  };

  function handleChange(e, key) {
    const { value = "" } = e.target;
    setTaskData((prev) => ({ ...prev, [key]: value }));
  }

  // Break into smaller components
  /**
   * task-completion can be moved to a smaller page level component called PageHeader
   *
   * data.map function can be moved to another page level component called TaskList
   *
   * second-div can be moved to a another page level component called UpsertTaskModal
   *
   * This Improves readability and easy to manage
   */
  return (
    <div>
      <div className="task-completion">
        Task Completed <span className="task-count"> {`${completedCount}/${totalCount}`}</span>
      </div>
      <div className="container">
        <div className="task-list">
          <button onClick={openTaskModal} className="addNewTask btn btn-primary">
            + Add new task
          </button>
          {/* [{},{},""] */}
          {data.map((user) => {
            // const { id = "", name = "", description = "" } = user || {};

            const circleColorClassName = completedTasks[user.id] ? "green-circle" : "red-circle";

            return (
              <div key={user.id} className="user-row">
                <FontAwesomeIcon icon={faCircle} id="circleicon" className={`status-icon ${circleColorClassName}`} />

                <span className="user-title">{user.name}</span>

                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className={`check-icon ${completedTasks[user.id] ? "hidden" : ""}`}
                  onClick={() => toggleStatus(user.id)}
                />
                <button onClick={() => openTaskModal(user)} type="button" class=" editbtn">
                  Edit
                </button>
                <button onClick={() => handleDelete(user.id)} type="button" class="deletebtn">
                  Delete
                </button>
              </div>
            );
          })}
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
                    onChange={(e) => handleChange(e, "name")}
                    className="modal-input"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="description">Details:</label>
                  <br />
                  <textarea
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => handleChange(e, "description")}
                    className="details-input"
                  />
                </div>
                <div className="modal-buttons">
                  <button onClick={handleSave}>{id ? "Update" : "Save"}</button>
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
