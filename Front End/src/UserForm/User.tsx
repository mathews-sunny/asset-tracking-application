import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import useInput from "../hooks/use-input";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setToast, setUser } from "../store";
import CustomModal from "../Modals/CustomModal";
import { useNavigate } from "react-router-dom";
import classes from "./User.module.css";
import useHttp from "../hooks/use-http";
import { useTranslation } from "react-i18next";
const User: React.FC<{}> = (props) => {
  const mailReg = /[0-9a-zA-Z]+(.[0-9a-zA-Z]+)?@[0-9A-Za-z]+(.[0-9a-zA-Z]+)?/;
  let domain: string = "";
  const tldList = useSelector((state: RootState) => state.tldSlice.tlds);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sendRequest: fetchUser } = useHttp();
  const { t } = useTranslation();
  const {
    value: enteredName,
    enteredInputIsValid: enteredNameIsValid,
    hasError: nameInputIsInvalid,
    inputChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((value) => value.trim().length >= 3);

  const {
    value: enteredEmail,
    enteredInputIsValid: enteredEmailIsValid,
    hasError: emailInputIsInvalid,
    inputChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => {
    let trimmedValue = value.trim();
    let nonDomain: string = "";
    const lastIndex = trimmedValue.lastIndexOf(".");
    if (lastIndex > -1) {
      nonDomain = trimmedValue.substring(0, lastIndex);
      domain = trimmedValue.substring(lastIndex + 1, trimmedValue.length);
    }
    const matchExact = (r: RegExp, str: string) => {
      let match: RegExpMatchArray | null = str.match(r);
      if (!match) return false;
      return str === match[0];
    };
    return (
      trimmedValue !== "" &&
      matchExact(mailReg, nonDomain) &&
      tldList.includes(domain)
    );
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    return () => setShowModal(false);
  }, []);

  let formIsInvalid: boolean = false;
  if (!enteredNameIsValid || !enteredEmailIsValid) {
    formIsInvalid = true;
  }

  const formSubmissionHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (nameInputIsInvalid || emailInputIsInvalid) {
      return;
    }
    await fetchUser(
      {
        url: `http://localhost:8083/hahn-application/api/userdetails?UserFirstName=${enteredName}&MailId=${enteredEmail}`,
      },
      userResponseHandler
    );
  };

  const userResponseHandler = (UserSate: any) => {
    if (UserSate.status === false) {
      dispatch(
        setToast({ success: UserSate.status, message: UserSate.message })
      );
      return;
    }
    dispatch(setUser(UserSate));
    formResetHandler();
    navigate("/assets", { replace: true });
  };

  const formResetHandler = () => {
    setShowModal(false);
    resetName();
    resetEmail();
  };

  return (
    <div className={classes.user}>
      <Card border="dark" style={{ width: "21rem" }} className={classes.card}>
        <Card.Header>{t("description.user")}</Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={formSubmissionHandler}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>{t("description.email")}</Form.Label>
              <Form.Control
                type="email"
                placeholder={t("description.enterEmail")}
                onChange={emailInputChangeHandler}
                onBlur={emailBlurHandler}
                value={enteredEmail}
                isInvalid={emailInputIsInvalid}
              />
              <Form.Control.Feedback type="invalid">
                <span>
                  {domain && !tldList.includes(domain)
                    ? t("description.invalidTld")
                    : t("description.invalidMail")}
                </span>
              </Form.Control.Feedback>
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>{t("description.firstName")}</Form.Label>
              <Form.Control
                placeholder={t("description.firstName")}
                onChange={nameInputChangeHandler}
                onBlur={nameBlurHandler}
                value={enteredName}
                isInvalid={nameInputIsInvalid}
              />
              <Form.Control.Feedback type="invalid">
                {t("description.invalidFirstName")}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="m-1"
              disabled={formIsInvalid}
            >
              {t("description.send")}
            </Button>
            <Button
              disabled={!enteredName && !enteredEmail}
              variant="primary"
              type="reset"
              onClick={() => setShowModal(true)}
              className="m-1"
            >
              {t("description.reset")}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <CustomModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onReset={formResetHandler}
        heading={t("description.warning")}
      >
        {t("description.resetUser")}
      </CustomModal>
    </div>
  );
};

export default User;
