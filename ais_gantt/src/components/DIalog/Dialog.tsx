import { useContext, useEffect, useState } from "react";
import "./Dialog.css";
import { DialogContext } from "../../contexts/Dialog.context";
import { MetadataContext } from "../../contexts/MetaData.context";
import { TaskDataValues } from "../../models/TaskDataValues";
import { getTask, updateTask } from "../../api/task-queries";
import { Task } from "../../models/Task";

const Dialog = () => {
  const dialogContext = useContext(DialogContext);
  const metaDataContext = useContext(MetadataContext);
  // const [taskDataValues, setTaskDataValues] = useState<TaskDataValues[]>([])
  const [task, setTask] = useState<Task>({
    title: "",
    uid: "",
    projectUid: "",
    userUid: "",
    startDate: 0,
    endDate: 0,
    parentId: "",
    taskDataValues: [],
  });

  const closeDialog = () => {
    dialogContext?.setDialogState(null);
  };

  const saveTask = () => {
    updateTask(task).then(data => {
      console.log(data)
      closeDialog()
    })
  }

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(task.taskDataValues);
    
    setTask({...task, taskDataValues: task.taskDataValues.map(tdv => {
      if (tdv.taskDataFieldUId == event.target.id) {
        return {...tdv, value: event.target.value}
      } else {
        return tdv
      }
    })})
  }

  useEffect(() => {
    if (dialogContext?.dialogState?.taskUid) {
      getTask(dialogContext?.dialogState?.taskUid).then((task) => {
        if (metaDataContext?.metaData && task.taskDataValues.length < metaDataContext?.metaData?.taskDataFields.length) {
          metaDataContext?.metaData?.taskDataFields.forEach(tdf => {
            console.log(tdf, "TDF");
            
            if (task.taskDataValues.findIndex(tdv => tdv.taskDataFieldUId == tdf.uid) < 0) {
              task.taskDataValues.push({taskDataFieldUId: tdf.uid, value: ""})
            }
          })
        }
        console.log(task);
        setTask(task);
      });
    }
  }, [dialogContext?.dialogState]);

  if (!dialogContext?.dialogState) {
    return null;
  } else {
    return (
      <div
        className="dialog"
        style={{ top: dialogContext.dialogState.top - 110 }}
      >
        <div className="dialog-header">
          <div className="dialog-header-left">
            <div className="dialog-title">Задача</div>
            <div onClick={saveTask} className="dialog-save-btn">Сохранить</div>
            <div></div>
          </div>
          <div onClick={closeDialog} className="dialog-close-btn"></div>
        </div>
        <div className="dialog-content">
          <div>Название</div>
          <input
            onChange={(event) => {
              if (task) {
                setTask({ ...task, title: event.target.value });
              }
            }}
            value={task?.title}
          />
          {metaDataContext?.metaData?.taskDataFields.map((df) => (
            <div key={df.uid}>
              <div>{df.name}</div>
              <input
                id={df.uid}
                value={
                  task.taskDataValues.length > 0
                    ? task.taskDataValues.find(
                        (tdv) => tdv.taskDataFieldUId == df.uid
                      )?.value
                    : ""
                }
                onChange={onValueChange}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default Dialog;
