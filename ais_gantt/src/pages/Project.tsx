import { Fragment, useContext, useEffect, useState } from "react";
import TasksRow from "../components/TasksRow/TasksRow";
import { projects, tasks } from "../data/mock-data";
import {
  buildTaskTree,
  calculateDifferenceInDays,
} from "../utils/helpers";
import { Task } from "../models/Task";
import GroupRow from "../components/GroupRow/GroupRow";
import { Project } from "../models/Project";
import { GroupContext } from "../contexts/Tasks.context";
import { init } from "../api/task-queries";
import Dialog from "../components/Dialog/Dialog";

const ProjectC = (props: { startDate: number; endDate: number }) => {
  // const tree = buildTaskTree(tasks);

  // const [tree, setTree] = useState<Task[]>([]);
  // let [projectsWithTasks, setProjectsWithTasks] = useState< Project[] >([])
  const groupContext = useContext(GroupContext)

  useEffect(() => {
    init().then(data => {
      const tree = buildTaskTree(data.tasks)  
      const pwt = data.projects.map(project => {
        const tasks = tree.filter((task) =>
        task.projectUid === project.uid
      );
      return {
        ...project,
        tasks,
      };
      })
      groupContext?.setProjects(pwt);
    })
  }, []);
  // setProjectsTasks(tree)
  const differnceInDays = calculateDifferenceInDays(
    props.startDate,
    props.endDate
  );
  const cellWidth = Math.floor((innerWidth - 201) / differnceInDays);
  // Calculate the elapsed time


  console.log(cellWidth);

  return (
    <div style={{ position: "relative" }}>
      {[...Array(differnceInDays)].map((x, i) => {
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              top: 0,
              width: "1px",
              borderLeft: "1px solid rgba(0,0,0,0.2)",
              left: 201 + cellWidth * (i + 1),
              height: "100%",
              display: "block",
            }}
          ></span>
        );
      })}
      <Dialog />
      {groupContext?.projects.map(proj => (
        <Fragment key={proj.uid}>
          <GroupRow key={proj.uid} project={proj}/>
          {proj.isOpen && proj.tasks.map(task => (
            <TasksRow key={task.uid} task={task}/>
          ))}
        </Fragment>
      ))}
      {/* {tree.map((task) => (
        <TasksRow key={task.id} task={task} />
      ))} */}
    </div>
  );
};

export default ProjectC;
