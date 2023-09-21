// import moment from "moment";
import { projects, resources, tasks } from "../data/mock-data";
import { calculateDifferenceInDays, mapTasksToUser } from "../utils/helpers";
import ResourceRow from "../components/ResourceRow/ResourceRow";
import GroupRow from "../components/GroupRow/GroupRow";
import { Fragment, useContext, useEffect } from "react";
import { GroupContext } from "../contexts/Tasks.context";

const GantChart = (props: { startDate: number; endDate: number }) => {

  const groupContext = useContext(GroupContext)
  const { innerWidth } = window;
  const differnceInDays = calculateDifferenceInDays(
    props.startDate,
    props.endDate
  );
  
    useEffect(() => {

      const usersWithTasks = mapTasksToUser(tasks, resources);
      const projectWithUsers = projects.map((project) => {
        const users = usersWithTasks.filter((user) =>
          user.tasks.some((task) => task.projectUid === project.id)
        );
        return {
          ...project,
          users,
        };
      });
  
      groupContext?.setProjects(projectWithUsers);
    }, [])

  const cellWidth = Math.floor((innerWidth - 201) / differnceInDays)
  console.log(cellWidth);
  console.log(groupContext?.projects);
  
  

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
              left: 201 + cellWidth * (i + 1) ,
              height: "100%",
              display: "block"
            }}
          ></span>
        )
      })}
     
      {groupContext?.links}
      {
        groupContext?.projects.map(project => (
          <Fragment key={project.id}>
            <GroupRow project={project}/>
            {project.isOpen && project.users.map((user) => 
            <ResourceRow key={user.id} resource={user} projectId={project.id}/>
          )}
          </Fragment>
        ))
      }
    </div>
  );
};

export default GantChart;
