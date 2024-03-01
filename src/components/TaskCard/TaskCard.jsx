import React, { useEffect, useState } from "react";
import arrowDownIcon from "../../assets/icons/arrowDown.svg";
import arrowUpIcon from "../../assets/icons/arrowUp.svg";
import styles from "./TaskCard.module.css";
import CheckItem from "../CheckItem/CheckItem";
import GetButtons from "../../utils/GetButtons";
function TaskCard({ task, collapseAll, countOfOpenChecklist, onToggle }) {
  const [isToggled, setIsToggled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [taskPriority, setTaskPriority] = useState({
    color: "",
    priority: "",
  });
  const [checkedItemCount, setCheckedItemCount] = useState(0);

  const handleToggleClick = () => {
    onToggle(!isToggled);
    setIsToggled(!isToggled);
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

  return (
    <div className={styles.taskCard}>
      <div className={styles.top}>
        <div>
          <div
            style={{ backgroundColor: `${taskPriority?.color}` }}
            className={styles.dot}
          ></div>
          <p>{taskPriority?.priority}</p>
        </div>
        <div
          className={styles.menuDots}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
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

      <div className={styles.footer}>
        <div className={styles.optionalDate}>Feb 10th</div>
        <div className={styles.buttons}>
          <GetButtons status="todo" />
        </div>
      </div>
      {isMenuOpen ? (
        <div className={styles.menuBox}>
          <div className={styles.edit}>Edit</div>
          <div className={styles.share}>Share</div>
          <div className={styles.delete}>Delete</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default TaskCard;
