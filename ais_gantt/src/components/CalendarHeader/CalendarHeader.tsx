import moment from "moment";
import "./CalendarHeader.css";
import { calculateDifferenceInDays } from "../../utils/helpers";
import { useContext } from "react";
import { GroupContext } from "../../contexts/Tasks.context";
import { useXarrow } from "react-xarrows";


const CalendarHeader = (props: { startDate: number; endDate: number }) => {
  const updateXarrow = useXarrow();
  const { innerWidth } = window;
  const currDate = moment(props.startDate).subtract(1, "day");
  const lastDate = moment(props.endDate);
  const dates: moment.Moment[] = [];
  const differnceInDays = calculateDifferenceInDays(
    props.startDate,
    props.endDate
  );

  const groupContext = useContext(GroupContext)
  const cellWidth = Math.floor((innerWidth - 201) / differnceInDays);
    console.log(cellWidth);
    
  while (currDate.add(1, "days").diff(lastDate) < 0) {
    dates.push(currDate.clone());
  }

  
  const years = [...new Set(dates.map((date) => date.year()))].map((year) => ({
    year,
    count: dates.filter((date) => date.year() == year).length,
  }));
  const months = [...new Set(dates.map((date) => date.month() + 1))].map(
    (month) => ({
      month,
      count: dates.filter((date) => date.month() == month - 1).length,
    })
  );
  const weekNumbers = [...new Set(dates.map((date) => date.isoWeek()))].map(
    (wn) => ({ wn, count: dates.filter((date) => date.isoWeek() == wn).length })
  );

  const expandAllGroups = () => {
    groupContext?.setProjects(groupContext?.projects.map(project => ({...project, isOpen: true})))
    updateXarrow()
  }

  const collapseAllGroups = () => {
    groupContext?.setProjects(groupContext?.projects.map(project => ({...project, isOpen: false})))
    updateXarrow()
  }


  return (
    <div className="calendar-header">
      <div style={{ width: "201px", display: "flex", flexDirection: "column" }}>
        <span className="timing-toolbar">
          <span className="timing-toolbar-item">
            <div
              style={{
                lineHeight: "20px",
                textTransform: "uppercase",
                fontSize: "15px",
                fontWeight: 600,
              }}
            >
              {moment(props.startDate).format("MMMM").substring(0, 3)}
            </div>
            <div
              style={{
                lineHeight: "30px",
                fontSize: "26px",
                fontWeight: 600,
              }}
            >
              {moment(props.startDate).date()}
            </div>
            <div
              style={{
                textTransform: "uppercase",
                lineHeight: "23px",
                fontSize: "13px",
                fontWeight: 400,
              }}
            >
              {moment(props.startDate).format("dddd").substring(0, 3)}
            </div>
          </span>
          <span className="timing-toolbar-item">
            <div
              style={{
                lineHeight: "20px",
                textTransform: "uppercase",
                fontSize: "15px",
                fontWeight: 600,
              }}
            >
              {moment(props.endDate).format("MMMM").substring(0, 3)}
            </div>
            <div
              style={{
                lineHeight: "30px",
                fontSize: "26px",
                fontWeight: 600,
              }}
            >
              {moment(props.endDate).date()}
            </div>
            <div
              style={{
                textTransform: "uppercase",
                lineHeight: "23px",
                fontSize: "13px",
                fontWeight: 400,
              }}
            >
              {moment(props.endDate).format("dddd").substring(0, 3)}
            </div>
          </span>
        </span>
        <div className="buttonbar">
          <input onClick={() => expandAllGroups()} type="button"/>
          <input onClick={() => collapseAllGroups()} type="button"/>
        </div>
      </div>
      <div className="chart-calendar">
        <div
          style={{ height: "22px", lineHeight: "22px" }}
          className="calheader-row"
        >
          {years.map((year, i) => (
            <div
              key={year.year}
              style={{
                width: year.count * cellWidth,
                left:
                  years.slice(0, i).reduce((sum, a) => sum + a.count, 0) *
                  cellWidth,
              }}
              className="year-row-label-box"
            >
              <span className="calheader-label" style={{ fontWeight: 400 }}>
                {year.year}
              </span>
            </div>
          ))}
        </div>
        <div
          style={{ height: "33px", lineHeight: "33px" }}
          className="calheader-row"
        >
          {months.map((month, i) => (
            <div
              key={i}
              style={{
                width: month.count * cellWidth,
                left:
                  months.slice(0, i).reduce((sum, a) => sum + a.count, 0) *
                  cellWidth,
              }}
              className="year-row-label-box"
            >
              <span
                className="calheader-label"
                style={{ fontWeight: 500, textTransform: "uppercase" }}
              >
                {moment()
                  .month(month.month - 1)
                  .format("MMMM")}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{ height: "33px", lineHeight: "33px" }}
          className="calheader-row"
        >
          {weekNumbers.map((wn, i) => (
            <div
              onClick={() => console.log(wn.count)}
              key={i}
              style={{
                width: wn.count * cellWidth,
                left:
                  weekNumbers.slice(0, i).reduce((sum, a) => sum + a.count, 0) *
                  cellWidth,
              }}
              className="year-row-label-box"
            >
              <span
                className="calheader-label"
                style={{ fontWeight: 500, textTransform: "uppercase" }}
              >
                {wn.wn}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{ height: "22px", lineHeight: "22px" }}
          className="calheader-row"
        >
          {dates.map((d, i) => (
            <div
              key={i}
              style={{
                width: cellWidth,
                left: i * cellWidth,
              }}
              className="year-row-label-box"
            >
              <span
                className="calheader-label"
                style={{ fontWeight: 500, textTransform: "uppercase" }}
              >
                {d.date()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
