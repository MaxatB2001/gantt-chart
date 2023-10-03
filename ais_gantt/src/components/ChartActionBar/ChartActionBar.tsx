import { useContext, useState } from "react";
import "./ChartActionBar.css";
import DialogButton from "../DialogButton/DialogButton";
import { MetadataContext } from "../../contexts/MetaData.context";
import { applyFilter } from "../../api/task-queries";
// import { Filter } from "../../models/Filter";
import { GroupContext } from "../../contexts/Tasks.context";
import { ViewContext } from "../../contexts/View.context";

const ChartActionBar = () => {
  const metaDataContext = useContext(MetadataContext);
  const groupContext = useContext(GroupContext);
  const viewContext = useContext(ViewContext)

  const options = [
    {
      label: "Группировка",
      className: "grouping",
    },
  ];

  const apply = () => {
    applyFilter(viewContext?.view).then((data) => {
      console.log(data);
      groupContext?.setGroups(data);
      setActive(null);
    });
  };

  const [active, setActive] = useState<null | number>(null);
  // const [filter, setFilter] = useState<Filter>({ g: "", udfUid: null });

  return (
    <>
      {active === 0 && (
        <div className="action-loolbar">
          <div className="dialog-header">
            <div className="dialog-header-left">
              <div
                onClick={() => setActive(null)}
                className="dialog-close"
              ></div>
              <div className="dialog-title">Группировка</div>
              <DialogButton onClick={() => apply()} text="Применить" />
            </div>
          </div>
          <div className="toolbar-content">
            <div className="toolbar-subtitle">Группировать задачи по</div>
            <div className="toolbar-data">
              <div className="toolbar-field-label">Стандартные</div>
              <div className="toolbar-field-data">
                <div
                  onClick={() =>
                    viewContext?.setView({ ...viewContext.view, g: "TPG", udfUid: null })
                  }
                  className={
                    viewContext?.view.g == "TPG"
                      ? "selected toolbar-list-button"
                      : "toolbar-list-button"
                  }
                >
                  <span>Проекты</span>
                </div>
                <div
                  onClick={() =>
                    viewContext?.setView({ ...viewContext.view, g: "NOR", udfUid: null })
                  }
                  className={
                    viewContext?.view.g == "NOR"
                      ? "selected toolbar-list-button"
                      : "toolbar-list-button"
                  }
                >
                  <span>Без группировки</span>
                </div>
              </div>
            </div>
            <div className="toolbar-data">
              <div className="toolbar-field-label">Данные задачи</div>
              <div className="toolbar-field-data">
                {metaDataContext?.metaData?.taskDataFields.map((tdf) => (
                  <div
                    onClick={() =>
                      viewContext?.setView({ ...viewContext.view, g: "DFG", udfUid: tdf.uid })
                    }
                    key={tdf.uid}
                    className={
                      viewContext?.view.udfUid == tdf.uid && viewContext.view.g == "DFG"
                        ? "selected toolbar-list-button"
                        : "toolbar-list-button"
                    }
                  >
                    <span>{tdf.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{marginTop: "10px"}} className="toolbar-subtitle">Группировать ресурсы по</div>
            <div className="toolbar-data">
              <div className="toolbar-field-label">Стандартные</div>
              <div className="toolbar-field-data">
                <div
                  onClick={() =>
                    viewContext?.setView({ ...viewContext.view, g: "RPG", udfUid: null })
                  }
                  className={
                    viewContext?.view.g == "RPG"
                      ? "selected toolbar-list-button"
                      : "toolbar-list-button"
                  }
                >
                  <span>Проекты</span>
                </div>
              </div>
            </div>
            <div className="toolbar-data">
              <div className="toolbar-field-label">Данные ресурса</div>
              <div className="toolbar-field-data">
                {/* {metaDataContext?.metaData?.taskDataFields.map((tdf) => (
                  <div
                    onClick={() =>
                      setFilter({ ...filter, g: "DFG", udfUid: tdf.uid })
                    }
                    key={tdf.uid}
                    className={
                      filter.udfUid == tdf.uid && filter.g == "DFG"
                        ? "selected toolbar-list-button"
                        : "toolbar-list-button"
                    }
                  >
                    <span>{tdf.name}</span>
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        style={{ display: active == null ? "flex" : "none" }}
        className="action-bar"
      >
        {options.map((option, index) => (
          <div
            key={option.label}
            onClick={() => setActive(index)}
            className={"action-bar-btn " + option.className}
          ></div>
        ))}
      </div>
    </>
  );
};

export default ChartActionBar;
