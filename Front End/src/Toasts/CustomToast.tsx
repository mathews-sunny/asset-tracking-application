import { useEffect, useState } from "react";
import { Toast } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setToast } from "../store";

const CustomToast: React.FC<{}> = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const success = useSelector((state: RootState) => state.toastSlice.success);
  const message = useSelector((state: RootState) => state.toastSlice.message);
  const { t } = useTranslation();
  useEffect(() => {
    if (message) setShow(true);
  }, [message]);
  return (
    <Toast
      onClose={() => {
        setShow(false);
        dispatch(setToast({ success: success, message: "" }));
      }}
      show={show}
      delay={3000}
      autohide
    >
      <Toast.Header className={`${success ? "bg-success" : "bg-danger"}`}>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto text-light">
          {success ? t("description.success") : t("description.error")}
        </strong>
      </Toast.Header>
      <Toast.Body className={`${success ? "text-success" : "text-danger"}`}>
        {message}
      </Toast.Body>
    </Toast>
  );
};

export default CustomToast;
