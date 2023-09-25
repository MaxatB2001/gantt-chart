import { useState } from "react";
import "./ChartActionBar.css";

const ChartActionBar = () => {
  const options = [
    {
      label: "Группировка",
      className: "grouping",
    },
  ];

  const [active, setActive] = useState<null | number>(null);
  return (
    <>
      <div style={{maxHeight: "500px", height: "100%"}} className="action-loolbar">
        <div style={{height: "100%"}}>test</div>
      </div>
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
