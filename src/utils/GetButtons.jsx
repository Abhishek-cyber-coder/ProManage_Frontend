import React from "react";

function GetButtons({ status }) {
  let buttons;
  switch (status) {
    case "backlog":
      buttons = (
        <>
          <button onClick={() => onButtonClick(task.id, "progress")}>
            PROGRESS
          </button>
          <button onClick={() => onButtonClick(task.id, "todo")}>TO-DO</button>
          <button onClick={() => onButtonClick(task.id, "done")}>DONE</button>
        </>
      );
      break;
    case "todo":
      buttons = (
        <>
          <button onClick={() => onButtonClick(task.id, "backlog")}>
            BACKLOG
          </button>
          <button onClick={() => onButtonClick(task.id, "progress")}>
            PROGRESS
          </button>
          <button onClick={() => onButtonClick(task.id, "done")}>DONE</button>
        </>
      );
      break;
    case "progress":
      <>
        <button onClick={() => onButtonClick(task.id, "backlog")}>
          BACKLOG
        </button>
        <button onClick={() => onButtonClick(task.id, "todo")}>TO-DO</button>
        <button onClick={() => onButtonClick(task.id, "done")}>DONE</button>
      </>;
      break;
    case "done":
      <>
        <button onClick={() => onButtonClick(task.id, "backlog")}>
          BACKLOG
        </button>
        <button onClick={() => onButtonClick(task.id, "todo")}>TO-DO</button>
        <button onClick={() => onButtonClick(task.id, "progress")}>
          PROGRESS
        </button>
      </>;
      break;
    default:
      buttons = null;
  }
  return <>{buttons}</>;
}

export default GetButtons;
