// import moment from "moment";
import { calculateDifferenceInDays, mapTasksToUser } from "../utils/helpers";
import ResourceRow from "../components/ResourceRow/ResourceRow";
import GroupRow from "../components/GroupRow/GroupRow";
import { Fragment, useContext, useEffect } from "react";
import { GroupContext } from "../contexts/Tasks.context";
import Dialog from "../components/Dialog/Dialog";
import { init } from "../api/task-queries";
import { MetadataContext } from "../contexts/MetaData.context";

const GantChart = (props: { startDate: number; endDate: number }) => {
  const groupContext = useContext(GroupContext);
  const metaDataContext = useContext(MetadataContext)
  const { innerWidth } = window;
  const differnceInDays = calculateDifferenceInDays(
    props.startDate,
    props.endDate
  );

  useEffect(() => {
    init().then((data) => {
      console.log(data);
      const usersWithTasks = mapTasksToUser(data.tasks, data.resourses);
      const projectWithUsers = data.projects.map((project) => {
        const users = usersWithTasks.filter((user) =>
          user.tasks.some((task) => task.projectUid === project.uid)
        );
        return {
          ...project,
          isOpen: true,
          users,
        };
      });
      
      groupContext?.setProjects(projectWithUsers);
      metaDataContext?.setMetaData({taskDataFields: data.TaskDataFields})
    });
  }, []);

  const cellWidth = Math.floor((innerWidth - 201) / differnceInDays);
  console.log(cellWidth);
  console.log(groupContext?.projects);

  return (
    <div style={{ position: "relative" }}>
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
      <Dialog />
      {groupContext?.links}
      {groupContext?.projects.map((project) => (
        <Fragment key={project.uid}>
          <GroupRow project={project} />
          {project.isOpen &&
            project.users.map((user) => (
              <ResourceRow
                key={user.id}
                resource={user}
                projectId={project.uid}
              />
            ))}
        </Fragment>
      ))}
    </div>
  );
};

export default GantChart;
