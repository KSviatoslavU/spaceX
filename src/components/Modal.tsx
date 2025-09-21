import { createPortal } from "react-dom";
import "./Modal.scss";
import { useLaunchesContext } from "../context";

export default function Modal() {
  const { state, dispatch } = useLaunchesContext();

  const handleClose = () => {
    dispatch({ type: "open_modal", payload: false });
  };

  return createPortal(
    <div onClick={handleClose} className="overlay">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{state.activeLaunch?.mission_name}</h2>
          <button onClick={handleClose} className="close">
            &times;
          </button>
        </div>
        <div className="image">
          <img src={state.activeLaunch?.links?.mission_patch}></img>
        </div>
        <div className="modal-content">
          <ul>
            <li>
              <strong>Mission name:</strong>
              <br></br>
              {state.activeLaunch?.mission_name}
            </li>
            <li>
              <strong>Rocket name:</strong>
              <br></br>
              {state.activeLaunch?.rocket?.rocket_name}
            </li>
            <li>
              <strong>Detail:</strong>
              <br></br>
              {state.activeLaunch?.details}
            </li>
          </ul>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
}
