// import { useXarrow } from "react-xarrows";
import { Task } from "../../models/Task";
import {
  calculateDifferenceInDays,
  calculateTaskLeftOffset,
  calculateTaskWidth,
  getElementTopOffset,
} from "../../utils/helpers";
import "./Task.css";
import interact from "interactjs";
import { useContext, useEffect, useRef } from "react";
import { DialogContext } from "../../contexts/Dialog.context";
import { GroupContext } from "../../contexts/Tasks.context";

type TaskProps = {
  task: Task;
  rowIndex: number;
  projectId?: string;
};

const GanttTask = ({ task, rowIndex, projectId }: TaskProps) => {
  // const updateXarrow = useXarrow();
  const testStart = 1693515600000;
  const dialogContext = useContext(DialogContext);
  const taskRef = useRef(null);
  const groupContext = useContext(GroupContext)

  // console.log(calculateTaskWidth(1693515600000, 1696107600000, task.startDate, task.endDate))

  const openDialog = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // console.log(getElementTopOffset(event).bottom, task.uid);

    const top = getElementTopOffset(event).bottom;
    dialogContext?.setDialogState({ top, taskUid: task.uid });
  };

  const updateTask = (task: Task, groupUid: string) => {
    const updatedGroups = groupContext?.groups
  }

  useEffect(() => {
    // console.log(taskRef.current)
    interact(taskRef.current as unknown as HTMLElement)
    .draggable({
      lockAxis: "x",
      listeners: {
        move: (event) => {
          const { target, dx, dy } = event;
              const x = parseFloat(target.getAttribute('data-x') || '0') + dx;
              const y = parseFloat(target.getAttribute('data-y') || '0') + dy;

              target.style.transform = `translate(${x}px, ${y}px)`;
              target.setAttribute('data-x', x);
              target.setAttribute('data-y', y);
        },
        
      },
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent'
        })
      ]
    
     
    })
    .resizable({
      edges: {left: true, right: true},
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent'
        })
      ],
      listeners: {
        move(event) {
          var target = event.target;
            var x = parseFloat(target.getAttribute('data-x')) || 0;
            var y = parseFloat(target.getAttribute('data-y')) || 0;

            // update the element's style
            target.style.width = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';
            
            // translate when resizing from top or left edges
            x += event.deltaRect.left;
            y += event.deltaRect.top;

            target.style.transform = 'translate(' + x + 'px,' + y + 'px)';

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }
      }
    })
    .on("tap", (event) => {
      console.log("TAPPP", event)
      openDialog(event)
    });

    return () => {
      console.log("TASK DESTROY");
    };
  }, []);

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
          calculateTaskWidth(
            task.startDate,
            task.endDate,
            testStart,
            1696107600000
          ) *
            57 +
          "px",
        // borderRadius: "2px",
        zIndex: 1000,
        position: "absolute",
        left: calculateTaskLeftOffset(task.startDate, testStart) * 57 + "px",
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
