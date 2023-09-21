import { useContext } from "react";
import { GroupContext } from "../../contexts/Tasks.context";
import { Project } from "../../models/Project";
import "./GroupRow.css"
import { useXarrow } from "react-xarrows";

type GroupRowProps = {
    project: Project;
  };

const GroupRow = ({project}: GroupRowProps) => {
    const groupContext = useContext(GroupContext)
    const updateXarrow = useXarrow();
    const collapseGroup = () => {
        const updated = groupContext?.projects.map(p => {
          if (p.id == project.id) {
            return {...p, isOpen: !p.isOpen}
          } 
          return p
        }) || []
    
        groupContext?.setProjects(updated)
        setTimeout(() => {
          updateXarrow()
        })
      }
      

  return (
    <div className="group-row">
        <div className="group-row-label" style={{ width: "201px"}}>
            <span className="group-label">{project.title}</span>
            <span onClick={() => collapseGroup()} className={"group-row-label-btn" + (project.isOpen ? "" : " group-collapsed")}></span>
        </div>
        <div></div>
    </div>
  )
}

export default GroupRow