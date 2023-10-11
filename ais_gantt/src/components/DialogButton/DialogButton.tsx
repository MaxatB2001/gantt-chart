import "./DialogButton.css"

const DialogButton = ({text, ...props}: {text: string, [key: string]: any;}) => {
  return (
    <div className="dialog-btn" {...props}>{text}</div>
  )
}

export default DialogButton
