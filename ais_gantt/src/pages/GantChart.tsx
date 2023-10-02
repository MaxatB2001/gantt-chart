// import moment from "moment";
import { buildTaskTree, calculateDifferenceInDays, isTask } from "../utils/helpers";
import ResourceRow from "../components/ResourceRow/ResourceRow";
import GroupRow from "../components/GroupRow/GroupRow";
import { Fragment, useContext, useEffect } from "react";
import { GroupContext } from "../contexts/Tasks.context";
import { init } from "../api/task-queries";
import { MetadataContext } from "../contexts/MetaData.context";
import TasksRow from "../components/TasksRow/TasksRow";
import { ViewContext } from "../contexts/View.context";
import "./GantChart.css"

const GantChart = () => {

  const viewContext = useContext(ViewContext)

  const groupContext = useContext(GroupContext);
  const metaDataContext = useContext(MetadataContext)
  const differnceInDays = calculateDifferenceInDays(
    viewContext?.view?.startDate as number,
    viewContext?.view?.endDate as number
  );

  useEffect(() => {
    init().then((data) => {
      console.log(data);
      
      const tree = buildTaskTree(data.tasks);
      const pwt = data.projects.map((project) => {
        const tasks = tree.filter((task) => task.projectUid === project.uid);
        return {
          uid: project.uid,
          title: project.fullName,
          type: "project",
          items: tasks,
          isOpen: true
        };
      });
      
      groupContext?.setGroups(pwt);
      metaDataContext?.setMetaData({taskDataFields: data.TaskDataFields, projects: data.projects})
    });
  }, []);

  const cellWidth = viewContext?.view.cellWidth as number;

  return (
    <div className="gantt-chart">
      <div style={{position: "relative"}}>
      {[...Array(differnceInDays)].map((x, i) => {
        console.log(x)
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
      {groupContext?.links}
      {groupContext?.groups.map((group) => (
        <Fragment key={group.uid}>
          <GroupRow group={group} />
          {group.isOpen &&
            group.items.map(item => {
              if ( isTask(item)) return <TasksRow groupUid={group.uid} key={item.uid} task={item}/>
              return <ResourceRow key={item.id} groupUid={group.uid} resource={item} projectId={group.uid}/>
            }
               
            )
          }
        </Fragment>
      ))}
      </div>
    </div>
  );
};

export default GantChart;
