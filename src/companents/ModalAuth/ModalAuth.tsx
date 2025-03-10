"use client";

import Modal from "react-modal";
import { useEffect, useState } from "react";
import Login from "../auth/Login";

type ModalProps = {
  setModalIsOpen: (value: boolean) => void;
  modalIsOpen: boolean;
};

export default function ModalAuth({ setModalIsOpen, modalIsOpen }: ModalProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const appElement = document.getElementById("__next") || document.body;
      Modal.setAppElement(appElement);
    }
  }, []);
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          zIndex: 1000,
        },
        content: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          background: "#141414",
          padding: "20px",
          borderRadius: "10px",
          border: "2px solid #262626",
          maxWidth: "900px",
          height: "240px",
          width: "350px",
          textAlign: "center",
        },
      }}
    >
      <Login />
    </Modal>
  );
}
