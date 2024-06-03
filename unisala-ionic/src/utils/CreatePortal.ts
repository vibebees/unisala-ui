import { createPortal } from "react-dom";

const CreatePortal = (children: JSX.Element, container: string) => {
  return (
    window !== undefined &&
    document.getElementById("filter-container") &&
    createPortal(children, document.getElementById(container)!)
  );
};

export default CreatePortal;
