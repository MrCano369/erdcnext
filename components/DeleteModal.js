import Modal from "./Modal";

export default function CreateModal({ active, close, title, func }) {
  return (
    <Modal title={title} active={active} close={close}>
      <p>
        Are you sure you want to delete this activity <b>permanently</b>?
      </p>
      <br />
      <div className="buttons is-justify-content-flex-end">
        <button className="button is-light" onClick={close}>
          Cancel
        </button>
        <button className="button is-danger" onClick={func}>
          Delete permanently
        </button>
      </div>
    </Modal>
  );
}
