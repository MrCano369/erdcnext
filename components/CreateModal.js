import { createRef, useEffect, useState } from "react";
import Modal from "./Modal";

export default function CreateModal({ active, close, func }) {
  const [title, setTitle] = useState("");

  const input = createRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    func(title);
    close();
  };

  useEffect(() => {
    if (active) {
      setTitle("");
      input.current.focus();
    }
  }, [active]);

  return (
    <Modal title="Create New Activity" active={active} close={close}>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Title</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              ref={input}
              placeholder="Activity title"
            />
            <span className="icon is-left">
              <i className="fas fa-skiing-nordic"></i>
            </span>
          </div>
        </div>
        <button className="button is-primary">Create Activity</button>
      </form>
    </Modal>
  );
}
