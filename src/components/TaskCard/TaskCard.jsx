import React, { useContext, useEffect, useState } from "react";
import arrowDownIcon from "../../assets/icons/arrowDown.svg";
import arrowUpIcon from "../../assets/icons/arrowUp.svg";
import styles from "./TaskCard.module.css";
import CheckItem from "../CheckItem/CheckItem";
import GetButtons from "../../utils/GetButtons";
import { moveTask } from "../../apis/task";
import MyContext from "../ContextApi/MyContext";
import toast, { Toaster } from "react-hot-toast";
import { calculateColors, formatDateAsMMDD } from "../../utils/helper";
function TaskCard({
  task,
  collapseAll,
  countOfOpenChecklist,
  onToggle,
  status,
}) {
  const {
    fetchTasks,
    handleOpenDeleteModal,
    setDeletableTaskId,
    handleClickOnShare,
    handleOpenEditModal,
  } = useContext(MyContext);

  const [isToggled, setIsToggled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [taskPriority, setTaskPriority] = useState({
    color: "",
    priority: "",
  });
  const [checkedItemCount, setCheckedItemCount] = useState(0);
  const { backgroundColor, textColor } = calculateColors(
    task?.dueDate,
    task?.status
  );

  const handleToggleClick = () => {
    onToggle(!isToggled);
    setIsToggled(!isToggled);
  };

  const handleMenuDotsClick = (e) => {
    e.stopPropagation();
    setIsMenuOpen(true);
    setDeletableTaskId(task._id);
  };

  useEffect(() => {
    const tempPriority = task?.priority;
    switch (tempPriority) {
      case "low":
        setTaskPriority({ color: "#63C05B", priority: "LOW PRIORITY" });
        break;
      case "medium":
        setTaskPriority({ color: "#18B0FF", priority: "MODERATE PRIORITY" });
        break;
      case "high":
        setTaskPriority({ color: "#FF2473", priority: "HIGH PRIORITY" });
        break;
      default:
        setTaskPriority(null);
    }
  }, []);

  useEffect(() => {
    const tempCheckedItemCount = task?.checklist?.filter(
      (item) => item.selected
    ).length;
    setCheckedItemCount(tempCheckedItemCount);
  }, [task]);

  useEffect(() => {
    if (collapseAll && isToggled) {
      setIsToggled(false);
    }
  }, [collapseAll]);

  const handleCheckboxChange = (isChecked) => {
    if (isChecked) {
      setCheckedItemCount((prevCount) => prevCount + 1);
    } else {
      setCheckedItemCount((prevCount) => prevCount - 1);
    }
  };

  const onButtonClick = async (taskId, newStatus) => {
    const response = await moveTask(taskId, newStatus);
    if (response?.success === true) {
      toast.success(response?.message);
    } else {
      toast.error("Internal Server Error");
    }

    fetchTasks();
  };

  return (
    <div onClick={() => setIsMenuOpen(false)} className={styles.taskCard}>
      <div className={styles.top}>
        <div>
          <div
            style={{ backgroundColor: `${taskPriority?.color}` }}
            className={styles.dot}
          ></div>
          <p>{taskPriority?.priority}</p>
        </div>
        <div className={styles.menuDots} onClick={handleMenuDotsClick}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <p className={styles.title}>{task?.title}</p>
      <div className={styles.checklistHeading}>
        <p>
          Checklist &#40;{checkedItemCount}/{task?.checklist?.length}
          &#41;
        </p>
        <img
          src={
            countOfOpenChecklist > 0 && isToggled ? arrowUpIcon : arrowDownIcon
          }
          alt="icon"
          onClick={handleToggleClick}
        />
      </div>
      {countOfOpenChecklist > 0 && isToggled && (
        <div className={styles.checklistItems}>
          {task?.checklist?.map((item) => {
            return (
              <CheckItem
                taskId={task._id}
                key={item._id}
                itemId={item._id}
                name={item.name}
                selected={item.selected}
                onCheckboxChange={handleCheckboxChange}
              />
            );
          })}
        </div>
      )}

      <div
        style={{ justifyContent: task?.dueDate ? "space-between" : "flex-end" }}
        className={styles.footer}
      >
        {task?.dueDate && (
          <div
            style={{ backgroundColor, color: textColor }}
            className={styles.optionalDate}
          >
            {formatDateAsMMDD(task?.dueDate)}
          </div>
        )}

        <div className={styles.buttons}>
          <GetButtons
            taskId={task?._id}
            buttonPressed={onButtonClick}
            newStatus={status}
          />
        </div>
      </div>
      {isMenuOpen ? (
        <div className={styles.menuBox}>
          <div onClick={handleOpenEditModal} className={styles.edit}>
            Edit
          </div>
          <div onClick={handleClickOnShare} className={styles.share}>
            Share
          </div>
          <div onClick={handleOpenDeleteModal} className={styles.delete}>
            Delete
          </div>
        </div>
      ) : (
        <></>
      )}
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
  );
}

export default TaskCard;
