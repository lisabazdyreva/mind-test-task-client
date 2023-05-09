import "./modal.css";

interface IModalProps {
  text: string;
}

const Modal = ({ text }: IModalProps) => {
  return (
    <div className="modal-wrapper">
      <div className="modal">
        {text}
        <p>A popup will disappear in few seconds.</p>
      </div>
    </div>
  );
};

export default Modal;
