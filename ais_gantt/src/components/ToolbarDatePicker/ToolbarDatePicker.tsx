import { useState } from "react";
import "./ToolbarDatePicker.css"
import { BaseSingleInputFieldProps, DatePicker, DatePickerProps, DateValidationError, FieldSection, UseDateFieldProps } from "@mui/x-date-pickers";
import { Moment } from "moment";
import moment from "moment";

interface ToolbarDatePickerFieldProps
  extends UseDateFieldProps<Moment>,
    BaseSingleInputFieldProps<
      Moment | null,
      Moment,
      FieldSection,
      DateValidationError
    > {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToolbarDatePicker = (props: ToolbarDatePickerFieldProps) => {


    const {
        setOpen,
        id,
        InputProps: { ref } = {},
        inputProps: { 'aria-label': ariaLabel } = {},
      } = props;


  return (
    <span 
    id={id}
    ref={ref}
    aria-label={ariaLabel}
    onClick={() => setOpen?.((prev) => !prev)}
    className="timing-toolbar-item">
            <div
              style={{
                lineHeight: "20px",
                textTransform: "uppercase",
                fontSize: "15px",
                fontWeight: 600,
              }}
            >
              {moment(props.value).format("MMMM").substring(0, 3)}
            </div>
            <div
              style={{
                lineHeight: "30px",
                fontSize: "26px",
                fontWeight: 600,
              }}
            >
              {moment(props.value).date()}
            </div>
            <div
              style={{
                textTransform: "uppercase",
                lineHeight: "23px",
                fontSize: "13px",
                fontWeight: 400,
              }}
            >
              {moment(props.value).format("dddd").substring(0, 3)}
            </div>
          </span>
  )
}

// export default ToolbarDatePicker


export default function ButtonDatePicker(
    props: Omit<DatePickerProps<Moment>, 'open' | 'onOpen' | 'onClose'>,
  ) {
    const [open, setOpen] = useState(false);
  
    return (
      <DatePicker
        slots={{ field: ToolbarDatePicker, ...props.slots }}
        slotProps={{ field: { setOpen } as any }}
        {...props}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      />
    );
  }
  