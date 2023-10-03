import { useContext, useEffect, useState } from "react";
import "./Dialog.css";
import { DialogContext } from "../../contexts/Dialog.context";
import { MetadataContext } from "../../contexts/MetaData.context";
// import { TaskDataValues } from "../../models/TaskDataValues";
import { getTask, updateTask } from "../../api/task-queries";
import { Task } from "../../models/Task";
import DialogButton from "../DialogButton/DialogButton";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Project } from "../../models/Project";
import moment from "moment";
import { GroupContext } from "../../contexts/Tasks.context";
import { isTask } from "../../utils/helpers";
import { Group } from "../../models/Group";
import { Resource } from "../../models/Resource";

const Dialog = () => {
  const dialogContext = useContext(DialogContext);
  const metaDataContext = useContext(MetadataContext);
  const groupContext = useContext(GroupContext);
  const [task, setTask] = useState<Task>({
    title: "",
    // uid: "",
    projectUid: "",
    userUid: "",
    startDate: moment().valueOf(),
    endDate: moment().add(1, "day").valueOf(),
    parentId: "",
    taskDataValues: [],
  });

  const closeDialog = () => {
    dialogContext?.setDialogState(null);
  };

  const saveTask = () => {
    if (dialogContext?.dialogState?.userUid) {
      task.userUid = dialogContext?.dialogState?.userUid;
      addTask(task, task.userUid);
    }

    updateTask(task).then((data) => {
      console.log(data);

      closeDialog();
    });
  };

  const addTask = (task: Task, userUid: string) => {
    const updatedGroups = groupContext?.groups.map((g) => {
      g.items = g.items.map((gi) => {
        if (!isTask(gi) && gi.id == userUid) {
          gi.tasks.push(task);
        }
        return gi as Resource;
      });
      return g;
    }) as Group[];
    groupContext?.setGroups(updatedGroups);
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
    } else {
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
        setTask(task);
      }
    }

    return () => {
      setTask({
        title: "",
        // uid: "",
        projectUid: "",
        userUid: "",
        startDate: moment().valueOf(),
        endDate: moment().add(1, "day").valueOf(),
        parentId: "",
        taskDataValues: [],
      });
    };
  }, [dialogContext?.dialogState]);

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
                {dialogContext.tabs.map((tab) => {
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
                  // disablePortal
                  value={
                    metaDataContext?.metaData?.projects.find(
                      (p) => p.uid == task.projectUid
                    ) || null
                  }
                  options={metaDataContext?.metaData?.projects as Project[]}
                  renderInput={(params) => (
                    <TextField variant="standard" {...params} label="Проект" />
                  )}
                  getOptionLabel={(option) => option.fullName}
                  onChange={(event: any, newValue: Project | null) => {
                    console.log(event);
                    if (newValue)
                      setTask({ ...task, projectUid: newValue.uid });
                  }}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option.uid}>
                        {option.fullName}
                      </li>
                    );
                  }}
                />
              </div>

              <div
                className="task-udf-block"
                style={{
                  gridTemplateColumns: `repeat(${Math.ceil(
                    (metaDataContext?.metaData?.taskDataFields
                      .length as number) / 3
                  )}, 1fr)`,
                }}
              >
                {metaDataContext?.metaData?.taskDataFields.map((df) => (
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
