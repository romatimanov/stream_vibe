"use client";

import Modal from "react-modal";
import style from "./modal.module.css";

import { useEffect, useState } from "react";

type ModalProps = {
  video: any;
  setModalIsOpen: (value: boolean) => void;
  modalIsOpen: boolean;
  currentLanguage: string;
};

export default function ModalComponent({
  video,
  setModalIsOpen,
  modalIsOpen,
  currentLanguage,
}: ModalProps) {
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
      contentLabel="Простая модалка"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          zIndex: 1000,
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          background: "#141414",
          padding: "5px",
          borderRadius: "10px",
          border: "2px solid #262626",
          maxWidth: "900px",
          width: "100%",
        },
      }}
    >
      {video && video.results.length > 0 ? (
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${video?.results[0].key}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder="0"
          className={style.video}
        ></iframe>
      ) : (
        <div className={style.loading}>
          {currentLanguage === "en-US"
            ? "No video available for this movie"
            : " Нет доступного видео"}
        </div>
      )}
    </Modal>
  );
}
