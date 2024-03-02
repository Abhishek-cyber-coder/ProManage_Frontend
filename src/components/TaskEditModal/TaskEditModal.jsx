import React, { useContext, useEffect, useState } from "react";
import styles from "./TaskEditModal.module.css";
import deleteIcon from "../../assets/icons/delete.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import { editTaskById, getTaskDescription } from "../../apis/task";
import MyContext from "../ContextApi/MyContext";
function TaskEditModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [checklist, setChecklist] = useState([]);
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { fetchTasks, delatableTaskId } = useContext(MyContext);

  useEffect(() => {
    fetchTaskDetailsById();
  }, [delatableTaskId]);

  const fetchTaskDetailsById = async () => {
    const taskId = delatableTaskId;

    if (!taskId) return;

    const response = await getTaskDescription(taskId);
    setTitle(response?.title);
    setPriority(response?.priority);
    setChecklist(response?.checklist);
    setDueDate(response?.dueDate);
    setStatus(response?.status);
    setLoading(false);

    if (!isOpen || loading) return null;
  };

  const handleAddChecklistItem = () => {
    const newItem = { name: "", selected: false };
    setChecklist((prev) => [...prev, newItem]);
  };

  const handleName = (index, newName) => {
    const updatedItem = [...checklist];
    updatedItem[index].name = newName;
    setChecklist(updatedItem);
  };

  const handleCheckbox = (index, newSelected) => {
    const updatedItem = [...checklist];
    updatedItem[index].selected = newSelected;
    setChecklist(updatedItem);
  };

  const handleDateChange = (date) => {
    setDueDate(date);
  };

  const deleteItem = (index) => {
    const updatedItem = [...checklist];
    updatedItem.splice(index, 1);
    setChecklist(updatedItem);
  };

  const countSelectedItems = () => {
    return checklist.filter((item) => item.selected).length;
  };

  let valid = true;
  const handleSubmit = async () => {
    if (!(title.trim().length > 0)) {
      valid = false;
      toast.error("Title Required");
    } else {
      valid = true;
    }

    if (!(priority.trim().length > 0)) {
      valid = false;
      toast.error("Select Priority");
    } else {
      valid = true;
    }

    if (!(checklist.length > 0)) {
      valid = false;
      toast.error("Add Checklist");
    } else {
      valid = true;
    }

    if (valid) {
      const response = await editTaskById(
        delatableTaskId,
        title,
        priority,
        checklist,
        status,
        dueDate
      );
      if (response?.success === true) {
        toast.success(response?.message);
      } else if (response?.success === false) {
        toast.error(response?.message);
      } else {
        toast.error("Internal Server Error");
      }
      onClose();
      fetchTasks();
    }
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalBackground}></div>
          <div className={styles.modalContent}>
            <div className={styles.modalBox}>
              <div className={styles.titleHeader}>
                <p>
                  Title<sup>*</sup>
                </p>
                <input
                  type="text"
                  value={title}
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Task Title"
                />
              </div>
              <div className={styles.selectPriority}>
                <p>
                  Select Priority<sup>*</sup>
                </p>
                <div
                  className={`${styles.highPriority} ${
                    priority === "high" ? styles.selected : ""
                  }`}
                  onClick={() => setPriority("high")}
                >
                  <div
                    style={{ backgroundColor: "#FF2473" }}
                    className={styles.dot}
                  ></div>
                  <p>HIGH PRIORITY</p>
                </div>
                <div
                  className={`${styles.medPriority} ${
                    priority === "medium" ? styles.selected : ""
                  }`}
                  onClick={() => setPriority("medium")}
                >
                  <div
                    style={{ backgroundColor: "#18B0FF" }}
                    className={styles.dot}
                  ></div>
                  <p>MODERATE PRIORITY</p>
                </div>
                <div
                  className={`${styles.lowPriority} ${
                    priority === "low" ? styles.selected : ""
                  }`}
                  onClick={() => setPriority("low")}
                >
                  <div
                    style={{ backgroundColor: "#63C05B" }}
                    className={styles.dot}
                  ></div>
                  <p>LOW PRIORITY</p>
                </div>
              </div>
              <div className={styles.checklistSection}>
                <p>
                  Checklist &#40;{countSelectedItems()}/{checklist?.length}&#41;
                  <sup>*</sup>
                </p>
                <div className={styles.checklistItems}>
                  {checklist.map((item, index) => (
                    <div className={styles.itemBox} key={index}>
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => handleCheckbox(index, !item.selected)}
                      />
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleName(index, e.target.value)}
                        placeholder="Type..."
                      />
                      <img
                        src={deleteIcon}
                        alt="icon"
                        onClick={() => deleteItem(index)}
                      />
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleAddChecklistItem}
                  className={styles.addNewBtn}
                >
                  + Add New
                </button>
              </div>
              <div className={styles.buttonContainer}>
                <div className={styles.datePicker}>
                  <DatePicker
                    id="dueDate"
                    selected={dueDate}
                    onChange={handleDateChange}
                    dateFormat="MMMM d, yyyy"
                    placeholderText="Select due date"
                    withPortal
                  />
                </div>
                <div className={styles.buttons}>
                  <button className={styles.cancelBtn} onClick={onClose}>
                    Cancel
                  </button>
                  <button onClick={handleSubmit} className={styles.saveBtn}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              success: {
                style: {
                  fontSize: "1.5rem",
                  height: "2rem",
                },
              },
              error: {
                style: {
                  fontSize: "1.5rem",
                  height: "2rem",
                },
              },
            }}
          />
        </div>
      )}
    </>
  );
}

export default TaskEditModal;
