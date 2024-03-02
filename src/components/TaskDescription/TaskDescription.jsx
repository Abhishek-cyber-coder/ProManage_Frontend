import React, { useEffect, useState } from "react";
import styles from "./TaskDescription.module.css";
import codeSandBoxIcon from "../../assets/icons/codeSandBox.svg";
import { getTaskDescription } from "../../apis/task";
import { formatDateAsMMDD } from "../../utils/helper";

function TaskDescription() {
  const [taskData, setTaskData] = useState({});

  useEffect(() => {
    fetchTaskDetailsById();
  }, []);

  const fetchTaskDetailsById = async () => {
    const taskId = window.location.pathname?.split("/").slice(-1)[0];

    if (!taskId) return;

    const response = await getTaskDescription(taskId);
    setTaskData(response);
  };

  const getDotColor = (priority) => {
    switch (priority) {
      case "low":
        return "#63C05B";
      case "medium":
        return "#18B0FF";
      case "high":
        return "#ff2473";
      default:
        return "#000";
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "low":
        return "LOW PRIORITY";
      case "medium":
        return "MODERATE PRIORITY";
      case "high":
        return "HIGH PRIORITY";
      default:
        return "UNKNOWN PRIORITY";
    }
  };

  const countChecklistChecked = () => {
    return taskData?.checklist?.filter((item) => item.selected)?.length;
  };
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.topHeading}>
          <img src={codeSandBoxIcon} alt="icon" />
          <p>Pro Manage</p>
        </div>
        {taskData ? (
          <div className={styles.taskDescriptionSection}>
            <div className={styles.taskDetailBox}>
              <div className={styles.topSection}>
                <div
                  style={{ backgroundColor: getDotColor(taskData?.priority) }}
                  className={styles.dot}
                ></div>
                <p>{getPriorityLabel(taskData?.priority)}</p>
              </div>
              <div className={styles.title}>{taskData?.title}</div>
              <div className={styles.checklistSection}>
                <p>
                  Checklist &#40;{countChecklistChecked()}/
                  {taskData?.checklist?.length}&#41;
                </p>
                <div className={styles.checklistItems}>
                  {taskData?.checklist?.map((item, index) => (
                    <div key={index} className={styles.itemBox}>
                      <input type="checkbox" checked={item.selected} readOnly />
                      <div className={styles.checklistValue}>{item.name}</div>
                    </div>
                  ))}
                </div>
              </div>
              {taskData?.dueDate && (
                <div className={styles.dateSection}>
                  <p>Due Date</p>
                  <div>{formatDateAsMMDD(taskData?.dueDate)}</div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className={styles.error}>
              <p>Error Code 500</p>
              <p>Task Deleted/Internal Server Error</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default TaskDescription;
