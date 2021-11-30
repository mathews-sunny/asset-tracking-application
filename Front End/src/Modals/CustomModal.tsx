import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import classes from "./CustomModal.module.css";
import { useTranslation } from "react-i18next";
const CustomModal: React.FC<{
  show: boolean;
  onHide: () => void;
  onReset: () => void;
  heading: string;
}> = (props) => {
  const {t} = useTranslation();
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName={classes.dialog}
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className={classes.title}
        >
          {props.heading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.children}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onReset}>{t("description.yes")}</Button>
        <Button onClick={props.onHide}>{t("description.no")}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
