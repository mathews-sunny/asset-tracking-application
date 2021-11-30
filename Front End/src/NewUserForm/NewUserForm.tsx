import Button from "react-bootstrap/Button";
import { Fragment, useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/use-input";
import CustomModal from "../Modals/CustomModal";
import { RootState, setToast } from "../store";
import classes from "./NewUserForm.module.css";
import useHttp from "../hooks/use-http";
import { useTranslation } from "react-i18next";

const NewUserForm: React.FC<{}> = () => {
  const mailReg = /[0-9a-zA-Z]+(.[0-9a-zA-Z]+)?@[0-9A-Za-z]+(.[0-9a-zA-Z]+)?/;
  let domain: string = "";
  const tldList = useSelector((state: RootState) => state.tldSlice.tlds);
  const dispatch = useDispatch();
  const { isLoading: savingUser, sendRequest: saveUser } = useHttp();
  const { t } = useTranslation();
  const {
    value: enteredFirstName,
    enteredInputIsValid: enteredFirstNameIsValid,
    hasError: firstNameInputIsInvalid,
    inputChangeHandler: firstNameInputChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput((value) => value.trim().length >= 3);

  const {
    value: enteredLastName,
    enteredInputIsValid: enteredLastNameIsValid,
    hasError: lastNameInputIsInvalid,
    inputChangeHandler: lastNameInputChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
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

  const {
    value: enteredAge,
    enteredInputIsValid: enteredAgeIsValid,
    hasError: ageInputIsInvalid,
    inputChangeHandler: ageInputChangeHandler,
    inputBlurHandler: ageBlurHandler,
    reset: resetAge,
  } = useInput((value) => +value.trim() > 18);

  const {
    value: enteredStreetName,
    enteredInputIsValid: enteredStreetNameIsValid,
    hasError: streetNameInputIsInvalid,
    inputChangeHandler: streetNameInputChangeHandler,
    inputBlurHandler: streetNameBlurHandler,
    reset: resetStreetName,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredHouseNumber,
    enteredInputIsValid: enteredHouseNumberIsValid,
    hasError: houseNumberInputIsInvalid,
    inputChangeHandler: houseNumberInputChangeHandler,
    inputBlurHandler: houseNumberBlurHandler,
    reset: resetHouseNumber,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredZipCode,
    enteredInputIsValid: enteredZipCodeIsValid,
    hasError: zipCodeInputIsInvalid,
    inputChangeHandler: zipCodeInputChangeHandler,
    inputBlurHandler: zipCodeBlurHandler,
    reset: resetZipCode,
  } = useInput((value) => {
    return value.trim() !== "" && +value.trim() > 0;
  });

  const [showModal, setShowModal] = useState(false);

  let formIsInvalid: boolean = false;
  if (
    !enteredFirstNameIsValid ||
    !enteredLastNameIsValid ||
    !enteredEmailIsValid ||
    !enteredAgeIsValid ||
    !enteredStreetNameIsValid ||
    !enteredHouseNumberIsValid ||
    !enteredZipCodeIsValid
  ) {
    formIsInvalid = true;
  }

  const formSubmissionHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      firstNameInputIsInvalid ||
      lastNameInputIsInvalid ||
      emailInputIsInvalid ||
      ageInputIsInvalid ||
      streetNameInputIsInvalid ||
      houseNumberInputIsInvalid ||
      zipCodeInputIsInvalid
    ) {
      return;
    }
    let preparedBody = {
      age: +enteredAge,
      firstName: enteredFirstName,
      lastName: enteredLastName,
      address: {
        postalCode: +enteredZipCode,
        houseNumber: enteredHouseNumber,
        street: enteredStreetName,
      },
      email: enteredEmail,
    };
    saveUser(
      {
        url: "http://localhost:8083/hahn-application/api/users",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: preparedBody,
      },
      responseHandler
    );
  };

  const responseHandler = (data: {
    status: boolean;
    message: string;
    responseData: {} | null;
  }) => {
    if (!data.status) {
      dispatch(setToast({ success: data.status, message: data.message }));
    } else if (data.status) {
      dispatch(setToast({ success: data.status, message: data.message }));
      formResetHandler();
    }
  };
  const formResetHandler = () => {
    setShowModal(false);
    resetFirstName();
    resetLastName();
    resetEmail();
    resetAge();
    resetStreetName();
    resetHouseNumber();
    resetZipCode();
  };
  return (
    <div className={classes.newuser}>
      <Card border="dark" style={{ width: "45rem" }}>
        <Card.Header>{t("description.registerUser")}</Card.Header>
        <Card.Body>
          <Fragment>
            <Form
              noValidate
              onSubmit={formSubmissionHandler}
              className={
                !savingUser
                  ? `w-100 h-100 d-inline-block`
                  : `w-100 h-100 d-inline-block justify-content`
              }
            >
              {savingUser && (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">
                    {t("description.loading")}
                  </span>
                </Spinner>
              )}
              {!savingUser && (
                <Fragment>
                  <Row className="mb-2">
                    <Form.Group
                      as={Col}
                      className="mb-2"
                      controlId="formFirstName"
                    >
                      <Form.Label>{t("description.firstName")}</Form.Label>
                      <Form.Control
                        placeholder={t("description.firstName")}
                        onChange={firstNameInputChangeHandler}
                        onBlur={firstNameBlurHandler}
                        value={enteredFirstName}
                        isInvalid={firstNameInputIsInvalid}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t("description.invalidFirstName")}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      className="mb-2"
                      controlId="formLastName"
                    >
                      <Form.Label>{t("description.lastName")}</Form.Label>
                      <Form.Control
                        placeholder={t("description.lastName")}
                        onChange={lastNameInputChangeHandler}
                        onBlur={lastNameBlurHandler}
                        value={enteredLastName}
                        isInvalid={lastNameInputIsInvalid}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t("description.invalidLastName")}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} className="mb-2" controlId="formEmail">
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
                    <span className="w-25">
                      <Form.Group as={Col} className="mb-2" controlId="formAge">
                        <Form.Label>{t("description.age")}</Form.Label>
                        <Form.Control
                          type="number"
                          onChange={ageInputChangeHandler}
                          onBlur={ageBlurHandler}
                          value={Math.round(+enteredAge)}
                          isInvalid={ageInputIsInvalid}
                          min="19"
                          step="1"
                        />
                        <Form.Control.Feedback type="invalid">
                          {t("description.invalidAge")}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </span>
                  </Row>
                  <Row className="mb-2">
                    <Form.Group
                      as={Col}
                      className="mb-2"
                      controlId="formStreet"
                    >
                      <Form.Label>{t("description.street")}</Form.Label>
                      <Form.Control
                        placeholder={t("description.streetName")}
                        onChange={streetNameInputChangeHandler}
                        onBlur={streetNameBlurHandler}
                        value={enteredStreetName}
                        isInvalid={streetNameInputIsInvalid}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t("description.invalidStreet")}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      className="mb-2"
                      controlId="formHouseNumber"
                    >
                      <Form.Label>{t("description.houseNumber")}</Form.Label>
                      <Form.Control
                        placeholder={t("description.houseNumber")}
                        onChange={houseNumberInputChangeHandler}
                        onBlur={houseNumberBlurHandler}
                        value={enteredHouseNumber}
                        isInvalid={houseNumberInputIsInvalid}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t("description.invalidHouseNumber")}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <span className="w-25">
                      <Form.Group
                        as={Col}
                        className="mb-2"
                        controlId="formZipCode"
                      >
                        <Form.Label>{t("description.zipCode")}</Form.Label>
                        <Form.Control
                          placeholder={t("description.zipCode")}
                          onChange={zipCodeInputChangeHandler}
                          onBlur={zipCodeBlurHandler}
                          value={enteredZipCode}
                          isInvalid={zipCodeInputIsInvalid}
                        />
                        <Form.Control.Feedback type="invalid">
                          {enteredZipCode
                            ? t("description.invalidZipcode")
                            : t("description.mandatoryZipcode")}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </span>
                  </Row>
                  <Button
                    variant="primary"
                    type="submit"
                    className="m-2"
                    disabled={formIsInvalid}
                  >
                    {t("description.register")}
                  </Button>
                  <Button
                    disabled={
                      !enteredFirstName &&
                      !enteredLastName &&
                      !enteredEmail &&
                      !enteredAge &&
                      !enteredZipCode &&
                      !enteredHouseNumber &&
                      !enteredStreetName
                    }
                    variant="primary"
                    type="reset"
                    onClick={() => setShowModal(true)}
                    className="m-2"
                  >
                    {t("description.reset")}
                  </Button>
                </Fragment>
              )}
            </Form>
          </Fragment>
        </Card.Body>
      </Card>
      <CustomModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onReset={formResetHandler}
        heading={t("description.warning")}
      >
        {t("description.resetUserForm")}
      </CustomModal>
    </div>
  );
};

export default NewUserForm;
