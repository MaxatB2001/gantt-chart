import { useContext, useState } from "react";
import "./ChartActionBar.css";
import DialogButton from "../DialogButton/DialogButton";
import { MetadataContext } from "../../contexts/MetaData.context";
import { applyFilter } from "../../api/task-queries";
import { Filter } from "../../models/Filter";

const ChartActionBar = () => {
  const metaDataContext = useContext(MetadataContext);

  const options = [
    {
      label: "Группировка",
      className: "grouping",
    },
  ];

  const apply = () => {
    applyFilter(filter).then(data => {
      console.log(data)
      setActive(null)
    })
  };

  const [active, setActive] = useState<null | number>(null);
  const [filter, setFilter] = useState<Filter>({ g: "", udfUid: null });

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
            <div className="toolbar-subtitle">Группировать по</div>
            <div className="toolbar-data">
              <div className="toolbar-field-label">Стандартные</div>
              <div className="toolbar-field-data">
                <div
                  onClick={() => setFilter({ ...filter, g: "TPG", udfUid: null })}
                  className={
                    filter.g == "TPG"
                      ? "selected toolbar-list-button"
                      : "toolbar-list-button"
                  }
                >
                  <span>Проекты</span>
                </div>
              </div>
            </div>
            <div className="toolbar-data">
              <div className="toolbar-field-label">Данные задачи</div>
              <div className="toolbar-field-data">
                {metaDataContext?.metaData?.taskDataFields.map((tdf) => (
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
                ))}
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
