import { useContext } from "react";
import { Resource } from "../../models/Resource";
import { getElementTopOffset, groupTasks } from "../../utils/helpers";
// import moment from "moment";
import GanttTask from "../GantTask/Task";
import "./ResourceRow.css";
import { DialogContext } from "../../contexts/Dialog.context";

type ResourceRowProps = {
  resource: Resource;
  projectId?: string;
  groupUid: string;
};

const ResourceRow = ({ resource, projectId, groupUid }: ResourceRowProps) => {
  console.log("RESOURCE");
  
  const dialogContext = useContext(DialogContext);

  const grouppedTasks = groupTasks(resource.tasks);
  const openDialog = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const top = getElementTopOffset(event).bottom;
    // console.log(top);

    dialogContext?.setDialogState({ top, userUid: resource.id });
  };

  return (
    <>
      {resource.tasks.length == 0 && 
        <div
        className="resource-row"
        // onClick={() => console.log(index)}
        style={{
          height: "24px",
          position: "relative",
          display: "flex",
          borderTop:  "1px solid rgba(0,0,0,0.3)" 
        }}
      >
         <div
              className="resource-row-label"
              style={{
                width: "201px",
              }}
            >
              <div className="resource-row-text">
                {resource.name}
              </div>
                <div onClick={openDialog} className="add-icon add-task"></div>
            </div>
            <div style={{ position: "relative", flex: 1 }}></div>
      </div>
      }
      {grouppedTasks.length > 0 &&
        grouppedTasks.map((tasks, index) => (
          <div
            className="resource-row"
            // onClick={() => console.log(index)}
            key={index}
            style={{
              height: index == 0 ? "24px" : "16px",
              position: "relative",
              display: "flex",
              borderTop: index == 0 ? "1px solid rgba(0,0,0,0.3)" : "",
            }}
          >
            <div
              className="resource-row-label"
              style={{
                width: "201px",
              }}
            >
              <div className="resource-row-text">
                {index == 0 ? resource.name : ""}
              </div>
              {index == 0 && (
                <div onClick={openDialog} className="add-icon add-task"></div>
              )}
            </div>
            <div style={{ position: "relative", flex: 1 }}>
              {tasks.map((task) => (
                <GanttTask
                  key={task.uid}
                  task={task}
                  groupUid={groupUid}
                  rowIndex={index}
                  projectId={projectId}
                />
              ))}
            </div>
          </div>
        ))}
    </>
  );
};

export default ResourceRow;
