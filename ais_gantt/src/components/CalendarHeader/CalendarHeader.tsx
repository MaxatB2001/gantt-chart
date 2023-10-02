import moment from "moment";
import "./CalendarHeader.css";
import { calculateDifferenceInDays } from "../../utils/helpers";
import { useContext, useEffect } from "react";
import { GroupContext } from "../../contexts/Tasks.context";
// import { useXarrow } from "react-xarrows";
import {

  LocalizationProvider,

} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import ButtonDatePicker from "../ToolbarDatePicker/ToolbarDatePicker";
import { ViewContext } from "../../contexts/View.context";

const CalendarHeader = () => {

  const viewContext = useContext(ViewContext)
  const startDate = viewContext?.view.startDate as number
  const endDate = viewContext?.view.endDate as number

  // const updateXarrow = useXarrow();
  const { innerWidth } = window;
  const currDate = moment(startDate).subtract(1, "day")
  const lastDate = moment(endDate).add(1, "day");


  const dates: moment.Moment[] = [];
  const differnceInDays = calculateDifferenceInDays(
    startDate,
    endDate
  );


   const cellWidth = viewContext?.view.cellWidth as number


  useEffect(() => {
    console.log("INNER WIDTH INER INNER", innerWidth)
    const cellWidth = Math.floor((innerWidth - 251) / differnceInDays);
    viewContext?.setView({...viewContext.view, cellWidth})
  }, [viewContext?.view.startDate, viewContext?.view.endDate])

  const groupContext = useContext(GroupContext);

  while (currDate.add(1, "days").diff(lastDate) <= 0) {
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
    groupContext?.setGroups(
      groupContext?.groups.map((group) => ({ ...group, isOpen: true }))
    );
    // updateXarrow();
  };

  const collapseAllGroups = () => {
    groupContext?.setGroups(
      groupContext?.groups.map((group) => ({ ...group, isOpen: false }))
    );
    // updateXarrow();
  };

  return (
    <div className="calendar-header">
      <div style={{ width: "201px", display: "flex", flexDirection: "column" }}>
        <span className="timing-toolbar">
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <ButtonDatePicker
              value={moment(startDate)}
              onChange={(newValue) => viewContext?.setView({...viewContext.view, startDate: newValue?.valueOf() as number})}
            />

            <ButtonDatePicker
              value={moment(endDate)}
              onChange={(newValue) =>viewContext?.setView({...viewContext.view, endDate: newValue?.valueOf() as number})}
            />
          </LocalizationProvider>
        </span>
        <div className="buttonbar">
          <input onClick={() => expandAllGroups()} type="button" />
          <input onClick={() => collapseAllGroups()} type="button" />
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


