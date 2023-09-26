import { useContext } from "react";
import { GroupContext } from "../../contexts/Tasks.context";
import { Project } from "../../models/Project";
import "./GroupRow.css"
import { useXarrow } from "react-xarrows";
import { Group } from "../../models/Group";

type GroupRowProps = {
    group: Group;
  };

const GroupRow = ({group}: GroupRowProps) => {
    const groupContext = useContext(GroupContext)
    const updateXarrow = useXarrow();
    const collapseGroup = () => {
        const updated = groupContext?.groups.map(p => {
          if (p.uid == group.uid) {
            return {...p, isOpen: !p.isOpen}
          } 
          return p
        }) || []
    
        groupContext?.setGroups(updated)
        setTimeout(() => {
          updateXarrow()
        })
      }
      

  return (
    <div className="group-row">
        <div className="group-row-label" style={{ width: "201px"}}>
            <span className="group-label">{group.title}</span>
            <span onClick={() => collapseGroup()} className={"group-row-label-btn" + (group.isOpen ? "" : " group-collapsed")}></span>
        </div>
        <div></div>
    </div>
  )
}

export default GroupRow