import React, { useEffect, useState } from "react";
import styles from "./Board.module.css";
import StatusBoard from "../StatusBoard/StatusBoard";
import { getUserInfo, getCurrentDate } from "../../utils/helper";

import { getTasks } from "../../apis/task";

function Board() {
  const [selectedOption, setSelectedOption] = useState("thisWeek");
  const [topPageInfo, setTopPageInfo] = useState({
    username: "",
    date: "",
  });
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const userInfo = getUserInfo();
    const todayDate = getCurrentDate();
    setTopPageInfo({ username: userInfo, date: todayDate });
  }, []);

  useEffect(() => {
    fetchAllTasks();
  }, [selectedOption]);

  const fetchAllTasks = async () => {
    const response = await getTasks(selectedOption);
    setTasks(response);
  };
  return (
    <div className={styles.mainBoardSection}>
      <div className={styles.topHeadings}>
        <p className={styles.username}>Welcome! {topPageInfo.username}</p>
        <p className={styles.date}>{topPageInfo.date}</p>
      </div>
      <div className={styles.midSection}>
        <p className={styles.pageHeading}>Board</p>
        <select
          value={selectedOption}
          className={styles.selectBtn}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="thisWeek">This week</option>
          <option value="thisMonth">This month</option>
        </select>
      </div>
      <div className={styles.lastSection}>
        <StatusBoard
          status="Backlog"
          plusBtn={false}
          tasks={tasks?.filter((task) => task.status === "backlog")}
        />
        <StatusBoard
          status="To do"
          plusBtn={true}
          tasks={tasks?.filter((task) => task.status === "todo")}
        />
        <StatusBoard
          status="In progress"
          plusBtn={false}
          tasks={tasks?.filter((task) => task.status === "progress")}
        />
        <StatusBoard
          status="Done"
          plusBtn={false}
          tasks={tasks?.filter((task) => task.status === "done")}
        />
      </div>
    </div>
  );
}

export default Board;
