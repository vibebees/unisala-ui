import React, { useEffect } from "react";
import "./auth.css";
import Authentication from "./Authentication";
import { CloseIcon } from "../icons";
import { useHistory, useLocation } from "react-router";
import { URLdelete } from "@utils/lib/URLupdate";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const Modal = () => {
  const { replace } = useHistory();
  const { search } = useLocation();
  const [forceshow, setForceshow] = React.useState(false);

  useEffect(() => {
    if (search.includes("auth")) {
      setForceshow(true);
    }
  }, [search]);

  const onClose = () => {
    const updatedURL = URLdelete("auth");
    replace({ search: updatedURL });
    setForceshow(false);
  };

  return (
    <>
      <div
        className={clsx(
          "fixed flex justify-center z-50  bg-black bg-opacity-10  backdrop-blur-[1px] w-screen h-screen inset-0",
          forceshow ? "opacity-100" : "opacity-0",
          !forceshow ? "pointer-events-none" : "",
          forceshow ? "scale-100" : "scale-0",
          !forceshow ? "select-none" : ""
        )}
      >
        <AnimatePresence>
          {forceshow && (
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                duration: 0.2,
                type: "spring",
                ease: "easeInOut",
                stiffness: 120,
              }}
              style={{
                width: "100%",
                maxWidth: "500px",
                background: "white",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                margin: "auto",
                overflow: "hidden",
              }}
            >
              <div className="flex justify-end p-1">
                <button
                  id="close-auth-modal"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onClose();
                  }}
                >
                  <CloseIcon />
                </button>
              </div>

              <Authentication />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

const AuthModal = () => {
  const { search } = useLocation();
  const [settled, setSettled] = React.useState(false);

  React.useEffect(() => {
    if (search.includes("auth")) {
      setSettled(true);
    }
  }, [search]);

  return settled ? <Modal /> : null;
};

export default AuthModal;
