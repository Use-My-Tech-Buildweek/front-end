import { useEffect } from 'react'

const Modal = ({ actionToConfirm, textButton, modalId }) => {

    useEffect(() => {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
    modal.style.background = "white";
    modal.style.border = "3px solid red";
    modal.style.borderRadius = "10px";
    modal.style.padding = "4%"; 
    modal.style.zIndex = 10;
    }, [])

    const cancelModal = () => {
        const modal = document.getElementById(modalId);
        modal.style.display = "none";
    }

    const confirm = () => {
        actionToConfirm()
        const modal = document.getElementById(modalId);
        modal.style.display = "none";
    }

    return(
    <div id={modalId}>
      <p>Are you sure you want to {textButton}?</p>
      <div>
        <button onClick={confirm}>{textButton}</button>
        <button onClick={cancelModal}>Cancel</button>
      </div>
    </div>
    )
}

export default Modal