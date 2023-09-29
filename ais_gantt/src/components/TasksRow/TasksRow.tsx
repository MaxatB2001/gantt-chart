import { useState } from "react";
import { Task } from "../../models/Task";
import GanttTask from "../GantTask/Task";
import "./TasksRow.css";

type TaskRowProps = {
  task: Task;
  groupUid: string
};

const TasksRow = ({ task, groupUid}: TaskRowProps) => {
  const [isOpen, setIsOpen] = useState(task.isOpen);
  return (
    <>
      <div className="task-row">
        <div className="task-row-label" style={{ width: "201px" }}>
          {Array.from(Array(task.level)).map((level, i) =>
            <div onClick={() => console.log(level)}  key={i} style={{width: "15px"}}></div>
          )}
          <div className="task-row-text">{task.title}</div>
          <span
            onClick={() => setIsOpen(!isOpen)}
            className={
              task.children && task.children.length > 0
                ? `task-row-label-btn ${isOpen ? "" : "group-collapsed"}`
                : ""
            }
          ></span>
        </div>
        <div className="task-container">
          <GanttTask rowIndex={0} groupUid={groupUid} key={task.uid} task={task} />
        </div>
      </div>
      {isOpen &&
        task.children?.map((child) => <TasksRow groupUid={groupUid} key={child.uid} task={child} />)}
    </>
  );
};

export default TasksRow;
