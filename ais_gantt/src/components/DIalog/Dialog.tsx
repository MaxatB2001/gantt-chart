import { useContext, useEffect, useState } from "react";
import "./Dialog.css";
import { DialogContext } from "../../contexts/Dialog.context";
import { MetadataContext } from "../../contexts/MetaData.context";
// import { TaskDataValues } from "../../models/TaskDataValues";
import { getTask, updateTask } from "../../api/task-queries";
import { Task } from "../../models/Task";
import DialogButton from "../DialogButton/DialogButton";
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import { Project } from "../../models/Project";

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
    updateTask(task).then((data) => {
      closeDialog();
    });
  };

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask({
      ...task,
      taskDataValues: task.taskDataValues.map((tdv) => {
        if (tdv.taskDataFieldUId == event.target.id) {
          return { ...tdv, value: event.target.value };
        } else {
          return tdv;
        }
      }),
    });
  };

  useEffect(() => {
    if (dialogContext?.dialogState?.taskUid) {
      getTask(dialogContext?.dialogState?.taskUid).then((task) => {
        if (
          metaDataContext?.metaData &&
          task.taskDataValues.length <
            metaDataContext?.metaData?.taskDataFields.length
        ) {
          metaDataContext?.metaData?.taskDataFields.forEach((tdf) => {

            if (
              task.taskDataValues.findIndex(
                (tdv) => tdv.taskDataFieldUId == tdf.uid
              ) < 0
            ) {
              task.taskDataValues.push({
                taskDataFieldUId: tdf.uid,
                value: "",
              });
            }
          });
        }
        setTask(task);
      });
    }
  }, [dialogContext?.dialogState]);

  //  let currentTab = tabs[activeTab];

  if (!dialogContext?.dialogState) {
    return null;
  } else {
    return (
      <div className="dialog" style={{ top: dialogContext.dialogState.top }}>
        {dialogContext.history.length < 1 && (
          <>
            <div className="dialog-header">
              <div className="dialog-header-left">
                <div
                  onClick={dialogContext.handleBackClick}
                  className="dialog-close"
                ></div>
                <div className="dialog-title">Задача</div>
                <DialogButton onClick={saveTask} text="Сохранить" />
                {dialogContext.tabs.map((tab, index) => {
                  return (
                    tab.label && (
                      <div
                        key={tab.label}
                        onClick={() => dialogContext.handleTabClick(tab.path)}
                        className="action-udf action-btn"
                      >
                        <span className={tab.className}></span>
                        {tab.label}
                      </div>
                    )
                  );
                })}
              </div>
              <div onClick={closeDialog} className="dialog-close-btn"></div>
            </div>
            <div className="dialog-content">
              <div className="task-type-group">
                <TextField
                  onChange={(event) => {
                    if (task) {
                      setTask({ ...task, title: event.target.value });
                    }
                  }}
                  value={task?.title}
                  variant="standard"
                  label="Название"
                  size="small"
                />
                <Autocomplete
                disablePortal
                  options={metaDataContext?.metaData?.projects as Project[]}
                  renderInput={(params) => <TextField   variant="standard"  {...params} label="Проект" />}
                  getOptionLabel={(option) => option.fullName}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option.uid}>
                        {option.fullName}
                      </li>
                    )
                  }}
                />

              </div>

              <div className="task-udf-block" style={{gridTemplateColumns: `repeat(${Math.ceil(metaDataContext?.metaData?.taskDataFields.length as number / 3)}, 1fr)`}}>
                {
                metaDataContext?.metaData?.taskDataFields.map((df) => (
                  <div key={df.uid}>
                    <TextField
                      id={df.uid}
                      value={
                        task.taskDataValues.length > 0
                          ? task.taskDataValues.find(
                              (tdv) => tdv.taskDataFieldUId == df.uid
                            )?.value
                          : ""
                      }
                      onChange={onValueChange}
                      variant="standard"
                      label={df.name}
                      size="small"
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {dialogContext.history.length > 0 && dialogContext.currentTab?.element}
      </div>
    );
  }
};

export default Dialog;
