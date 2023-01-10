interface ToastComponentProps {
  title: string;
  description?: string;
}

const ToastComponent = (props: ToastComponentProps) => {
  return (
    <div className="toast-wrapper">
      <span className="title">
        {props.title ? props.title : "خطایی رخ داده است"}
      </span>
      <span className="desc">
        {props.description ? props.description : null}
      </span>
    </div>
  );
};

export default ToastComponent;
