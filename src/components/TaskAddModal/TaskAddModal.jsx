import React, { useEffect, useState } from "react";
import styles from "./TaskAddModal.module.css";
import deleteIcon from "../../assets/icons/delete.svg";
function TaskAddModal({ isOpen, onClose }) {
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    priority: "",
    checklist: [],
    dueDate: "",
  });

  const handleChange = (e) => {
    setTaskDetails({ ...taskDetails, [e.target.name]: e.target.value });
  };

  const handlePriorityChange = (priority) => {
    setTaskDetails({ ...taskDetails, priority });
  };

  const handleAddChecklistItem = () => {
    setTaskDetails({
      ...taskDetails,
      checklist: [...taskDetails.checklist, { name: "", selected: false }],
    });
  };

  //   const handleChecklistChange = (e, index) => {
  //     const { name, value, checked } = e.target;
  //     const updatedChecklist = [...taskDetails.checklist];
  //     updatedChecklist[index] = {
  //       ...updatedChecklist[index],
  //       [name]: value || checked,
  //     };
  //     setTaskDetails({ ...taskDetails, checklist: updatedChecklist });
  //   };

  const handleChecklistChange = (e, index) => {
    const { name, value, checked } = e.target;
    const updatedChecklist = [...taskDetails.checklist];
    updatedChecklist[index] = {
      ...updatedChecklist[index],
      [name]: value || checked,
    };
    setTaskDetails((prevState) => ({
      ...prevState,
      checklist: updatedChecklist,
    }));
  };

  const handleDeleteChecklist = (index) => {
    setTaskDetails((prevTaskDetails) => {
      const updatedChecklist = [...prevTaskDetails.checklist];
      updatedChecklist.splice(index, 1);
      return { ...prevTaskDetails, checklist: updatedChecklist };
    });
  };

  useEffect(() => {
    console.log(taskDetails);
  }, []);
  return (
    <>
      {true && (
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
                  onChange={handleChange}
                  placeholder="Enter Task Title"
                />
              </div>
              <div className={styles.selectPriority}>
                <p>
                  Select Priority<sup>*</sup>
                </p>
                <div
                  className={`${styles.highPriority} ${
                    taskDetails?.priority === "high" ? styles.selected : ""
                  }`}
                  onClick={() => handlePriorityChange("high")}
                >
                  <div
                    style={{ backgroundColor: "#FF2473" }}
                    className={styles.dot}
                  ></div>
                  <p>HIGH PRIORITY</p>
                </div>
                <div
                  className={`${styles.medPriority} ${
                    taskDetails?.priority === "medium" ? styles.selected : ""
                  }`}
                  onClick={() => handlePriorityChange("medium")}
                >
                  <div
                    style={{ backgroundColor: "#18B0FF" }}
                    className={styles.dot}
                  ></div>
                  <p>MODERATE PRIORITY</p>
                </div>
                <div
                  className={`${styles.lowPriority} ${
                    taskDetails?.priority === "low" ? styles.selected : ""
                  }`}
                  onClick={() => handlePriorityChange("low")}
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
                  Checklist &#40;1/3&#41;<sup>*</sup>
                </p>
                {taskDetails.checklist.map((item, index) => (
                  <div className={styles.itemBox} key={index}>
                    <input
                      type="checkbox"
                      name={`checklist[${index}].selected`}
                      onChange={(e) => handleChecklistChange(e, index)}
                    />
                    <input
                      type="text"
                      name={`checklist[${index}].name`}
                      onChange={(e) => handleChecklistChange(e, index)}
                      placeholder="Type..."
                    />
                    <img
                      src={deleteIcon}
                      alt="icon"
                      onClick={() => handleDeleteChecklist(index)}
                    />
                  </div>
                ))}

                <button
                  onClick={handleAddChecklistItem}
                  className={styles.addNewBtn}
                >
                  + Add New
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskAddModal;
