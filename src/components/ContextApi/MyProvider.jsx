import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import MyContext from "./MyContext";
import MessageComponent from "../MessageComponent/MessageComponent";
import { getTasks, deleteTask, getTaskDescription } from "../../apis/task";
import { copyToClipboard } from "../../utils/helper";
import TaskEditModal from "../TaskEditModal/TaskEditModal";

function Provider({ children }) {
  const [selectedOption, setSelectedOption] = useState("thisWeek");
  const [tasks, setTasks] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [delatableTaskId, setDeletableTaskId] = useState("");
  const [message, setMessage] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const fetchTasks = () => {
    getTasks(selectedOption)
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTaskToast = () => {
    toast.success("Task deleted successfully", {
      duration: 2000,
      position: "top-center",
    });
  };

  const errorDeleteTaskToast = () => {
    toast.error("Internal Server Error", {
      duration: 2000,
      position: "top-center",
    });
  };

  const handleDeleteTask = async () => {
    const response = await deleteTask(delatableTaskId);
    if (response?.success === true) {
      deleteTaskToast();
    } else {
      errorDeleteTaskToast();
    }
    handleCloseDeleteModal();
    fetchTasks();
  };

  const handleClickOnShare = async () => {
    const url = window.location.href;
    await copyToClipboard(url, delatableTaskId).then(() => {
      setMessage("Link Copied");
    });
  };

  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => {
        setMessage("");
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <MyContext.Provider
      value={{
        tasks,
        fetchTasks,
        selectedOption,
        setSelectedOption,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleDeleteTask,
        delatableTaskId,
        setDeletableTaskId,
        handleClickOnShare,
        handleOpenEditModal,
      }}
    >
      {children}
      {message && <MessageComponent message={message} />}
      {
        <TaskEditModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
        />
      }
    </MyContext.Provider>
  );
}

export default Provider;
