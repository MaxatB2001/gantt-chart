import { Resource } from "../../models/Resource";
import { groupTasks } from "../../utils/helpers";
// import moment from "moment";
import GanttTask from "../GantTask/Task";
import "./ResourceRow.css"

type ResourceRowProps = {
  resource: Resource;
  projectId?: string
  groupUid: string
};

const ResourceRow = ({ resource, projectId, groupUid }: ResourceRowProps) => {
  
  const grouppedTasks = groupTasks(resource.tasks);

  return (
    <>
      {grouppedTasks.map((tasks, index) => (
        <div
        className="resource-row"
          // onClick={() => console.log(index)}
          key={index}
          style={{ height: index == 0 ? "24px" : "16px", position: "relative", display: "flex", borderTop: index == 0 ? "1px solid rgba(0,0,0,0.3)" : "" }}
        >
          <div
          onClick={() => console.log(resource)}
          className="resource-row-label"
            style={{
              width: "201px",
            }}
          >
            <div className="resource-row-text">{index == 0 ? resource.name : ""}</div>
          </div>
          <div style={{position: "relative", flex: 1}}>
            {tasks.map((task) => (
              <GanttTask key={task.uid} task={task} groupUid={groupUid} rowIndex={index} projectId={projectId}/>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default ResourceRow;
