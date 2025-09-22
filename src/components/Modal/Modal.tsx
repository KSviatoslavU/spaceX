import { createPortal } from "react-dom";
import "./Modal.scss";
import { useLaunchesContext } from "../../context/LaunchesContext";
import { useEffect } from "react";

export default function Modal() {
  const { state, dispatch } = useLaunchesContext();
  useEffect(() => {
    if (state.isModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [state.isModalOpen]);

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
          <img
            src={
              state.activeLaunch?.links?.mission_patch ||
              "https://www.dgl.ru/wp-content/uploads/2022/06/spacex-zeichen-640x360.jpg"
            }
          ></img>
        </div>
        <div className="modal-content">
          <ul>
            <li>
              <strong>Mission name:</strong>
              <p className="text">{state.activeLaunch?.mission_name}</p>
            </li>
            <li>
              <strong>Rocket name:</strong>
              <p className="text">{state.activeLaunch?.rocket?.rocket_name}</p>
            </li>
            <li>
              <strong>Detail:</strong>
              <p className="text">{state.activeLaunch?.details}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
}
