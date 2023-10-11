// import { useXarrow } from "react-xarrows";
import { Task } from "../../models/Task";
import {
  calculateTaskLeftOffset,
  calculateTaskWidth,
  getElementTopOffset,
  isTask,
  updateTasksInTree,
} from "../../utils/helpers";
import "./Task.css";
import interact from "interactjs";
import { useContext, useEffect, useRef, useState } from "react";
import { DialogContext } from "../../contexts/Dialog.context";
import { GroupContext } from "../../contexts/Tasks.context";
import { ViewContext } from "../../contexts/View.context";
import moment from "moment";
import { Group } from "../../models/Group";
import { Resource } from "../../models/Resource";

type TaskProps = {
  task: Task;
  rowIndex: number;
  projectId?: string;
  groupUid: string;
};

const GanttTask = ({ task, rowIndex, projectId, groupUid }: TaskProps) => {
  const viewContext = useContext(ViewContext);
  const startDate = viewContext?.view.startDate as number;
  const endDate = viewContext?.view.endDate as number;
  const cellWidth = viewContext?.view.cellWidth as number;
  // const updateXarrow = useXarrow();
  const dialogContext = useContext(DialogContext);
  const taskRef = useRef(null);
  const groupContext = useContext(GroupContext);

  const [y, setY] = useState(0);
  const [width, setWidth] = useState(0);

  // console.log("RERENDER");
  // console.log("START", moment(task.startDate).toISOString())
  // console.log("END", moment(task.endDate).toISOString())

  const openDialog = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // console.log(getElementTopOffset(event).bottom, task.uid);

    const top = getElementTopOffset(event).bottom;
    dialogContext?.setDialogState({ top, taskUid: task.uid });
  };

  //Обновление задачи
  const updateTask = (task: Task, groupUid: string) => {
    let updatedGroups: Group[] = [];
    const group = groupContext?.groups.find((g) => g.uid == groupUid);
    if (group && group.items.length > 0) {
      //Обнвление задач в дереве
      if (isTask(group.items[0])) {
        group.items = group?.items.map((item) => {
          return updateTasksInTree(item as Task, task);
        }) as Task[];

        updatedGroups = groupContext?.groups.map((g) => {
          if (g.uid === group.uid) return group;
          return g;
        }) as Group[];
      } else {
        //Обнвление задачи у ресуросов
        updatedGroups = groupContext?.groups.map((g) => {
          g.items = g.items.map((item) => {
            if (!isTask(item)) {
              item.tasks = item.tasks.map((t) => {
                if (t.uid === task.uid) return task;
                return t;
              });
            }
            return item;
          }) as Resource[];
          return g;
        }) as Group[];
      }
    }
    
    //Обновление состояния групп
    groupContext?.setGroups(updatedGroups as Group[]);
  };

  useEffect(() => {
    console.log("Y RERENDER");
    setWidth(
      calculateTaskWidth(task.startDate, task.endDate, startDate, endDate) *
        cellWidth
    );
    setY(calculateTaskLeftOffset(task.startDate, startDate) * cellWidth);
  }, [task, cellWidth]);

  useEffect(() => {
    // console.log(taskRef.current)
    interact(taskRef.current as unknown as HTMLElement)
      .draggable({
        lockAxis: "x",
        listeners: {
          move: (event) => {
            const { dx} = event;
            setY((prev) => prev + dx);
            console.log("Y", dx)
          },

          end(event) {
            // console.log(event.x0);

            // console.log(event.pageX)
            let moveX = event.pageX - event.x0;


            if (moveX > 0) {
              const updatedTask = {
                ...task,
                startDate: moment(task.startDate)
                  .add(Math.trunc(moveX / cellWidth), "day")
                  .valueOf(),
                endDate: moment(task.endDate)
                  .add(Math.trunc(moveX / cellWidth), "day")
                  .valueOf(),
              };

              updateTask(updatedTask, groupUid);
            }
            if (moveX < 0) {
              const updatedTask = {
                ...task,
                startDate: moment(task.startDate)
                  .subtract(-Math.trunc(moveX / cellWidth), "day")
                  .valueOf(),
                endDate: moment(task.endDate)
                  .subtract(-Math.trunc(moveX / cellWidth), "day")
                  .valueOf(),
              };

              updateTask(updatedTask, groupUid);
            }
          },
        },
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: "parent",
            // endOnly: true
          }),
        ],
      })
      .resizable({
        edges: { left: true, right: true },
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: "parent",
          }),
          interact.modifiers.restrictSize({ min: {width: cellWidth, height: 0}  }),
        ],
        listeners: {
          move(event) {
            const { width, left } = event.rect;
            console.log(width, left);
            setWidth(width)
            setY(left - 201 - 50)
          },

          end(event) {
            // var distanceX = event.dx;
            let moveX = event.pageX - event.x0;
            console.log(moveX);

            if (event.deltaRect.left > 0) {
              console.log("LEFTO RIGHTO"); 
              const updatedTask = {
                ...task,
                startDate: moment(task.startDate)
                  .add(Math.trunc(moveX / cellWidth), "day")
                  .valueOf(),
              };

              updateTask(updatedTask, groupUid);

            }
            if (event.deltaRect.left < 0) {
              const updatedTask = {
                ...task,
                startDate: moment(task.startDate)
                  .subtract(-Math.trunc(moveX / cellWidth), "day")
                  .valueOf(),
              };

              updateTask(updatedTask, groupUid);
            }
            if (event.deltaRect.right > 0) {
              console.log("RIGHTO RIGTO");
              const updatedTask = {
                ...task,
                endDate: moment(task.endDate)
                  .add(Math.trunc(moveX / cellWidth), "day")
                  .valueOf(),
              };

              updateTask(updatedTask, groupUid);
            }
            if (event.deltaRect.right < 0) {
              console.log("LEFTO RIGHTO");

              const updatedTask = {
                ...task,
                endDate: moment(task.endDate)
                  .subtract(-Math.trunc(moveX / cellWidth), "day")
                  .valueOf(),
              };

              updateTask(updatedTask, groupUid);
            }

            console.log("MOVE MOVE X", Math.trunc(moveX / cellWidth));

            console.log(event.deltaRect);
          },
        },
      })
      .on("tap", (event) => {
        console.log(task);
        openDialog(event);
      });

    return () => {
      console.log("TASK DESTROY");
    };
  }, [cellWidth, task]);

  // if (width == 0) return null

  return (
    <div
      ref={taskRef}
      // onClick={openDialog}
      id={task.uid}
      className={
        !projectId
          ? "gantt-taskbar noselect"
          : projectId == task.projectUid
          ? "gantt-taskbar noselect"
          : "gantt-taskbar-hidden" + " gantt-taskbar noselect"
      }
      style={{
        height: "15px",
        backgroundColor: "#0000ff",
        color: "white",
        width:
          width == 0
            ? calculateTaskWidth(
                task.startDate,
                task.endDate,
                startDate,
                endDate
              ) * cellWidth
            : width + "px",
        // borderRadius: "2px",
        zIndex: 1,
        position: "absolute",
        left:
          y == 0
            ? calculateTaskLeftOffset(task.startDate, startDate) * cellWidth
            : y + "px",
        top: rowIndex == 0 ? 8 : 0,
        display: "flex",
        fontStyle: "normal",
        fontWeight: "normal",
        lineHeight: "15px",
        fontSize: "12px",
      }}
    >
      <span>{task.title}</span>
    </div>
  );
};

export default GanttTask;
