import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../hooks/use-http";
import { asset, RootState, setAsset, setAssets, setToast } from "../store";
import Tabs from "react-bootstrap/Tabs";
import { Card, Form, Tab, Button, Row, Col } from "react-bootstrap";
import AssetItem from "../assets/AssetItem";
import useInput from "../hooks/use-input";
import CustomModal from "../Modals/CustomModal";
import classes from "./Assets.module.css";
import AllAssets from "../AllAssets/AllAssets";
import Profile from "../Profile/Profile";
import { useTranslation } from "react-i18next";

const Assets: React.FC<{}> = (props) => {
  const assets = useSelector((state: RootState) => state.assetsSlice.assets);
  const userId = useSelector((state: RootState) => state.userSlice.id);
  const { sendRequest: fetchAssets } = useHttp();
  const { sendRequest: saveAsset } = useHttp();
  const [key, setKey] = useState("assets");
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    value: enteredName,
    enteredInputIsValid: enteredNameIsValid,
    hasError: nameInputIsInvalid,
    inputChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((value) => value.trim().length !== 0);

  const {
    value: enteredSymbol,
    enteredInputIsValid: enteredSymbolIsValid,
    hasError: symbolInputIsInvalid,
    inputChangeHandler: symbolInputChangeHandler,
    inputBlurHandler: symbolBlurHandler,
    reset: resetSymbol,
  } = useInput((value) => value.trim().length !== 0);

  const {
    value: enteredId,
    enteredInputIsValid: enteredIdIsValid,
    hasError: idInputIsInvalid,
    inputChangeHandler: idInputChangeHandler,
    inputBlurHandler: idBlurHandler,
    reset: resetId,
  } = useInput((value) => value.trim().length !== 0);

  const [showModal, setShowModal] = useState(false);

  let formIsInvalid: boolean = false;
  if (!enteredNameIsValid || !enteredSymbolIsValid || !enteredIdIsValid) {
    formIsInvalid = true;
  }

  useEffect(() => {
    const assetsResponseHandler = (assetsFetched: any) => {
      console.log(assetsFetched);
      if (assetsFetched.status === false) {
        return;
      }
      dispatch(setAssets(assetsFetched));
    };
    const callFetch = async () => {
      await fetchAssets(
        {
          url: `http://localhost:8083/hahn-application/api/assets?UserId=${userId}`,
        },
        assetsResponseHandler
      );
    };
    callFetch();
    return () => {
      dispatch(setAssets([]));
    };
  }, [dispatch, fetchAssets, userId]);

  const formSubmissionHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (nameInputIsInvalid || symbolInputIsInvalid || idInputIsInvalid) {
      return;
    }
    let asset = {
      assetId: enteredId,
      symbol: enteredSymbol,
      name: enteredName,
    };
    await saveAsset(
      {
        url: `http://localhost:8083/hahn-application/api/assets?UserId=${userId}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: asset,
      },
      responseHandler
    );
  };

  const responseHandler = (data: {
    status: boolean;
    message: string;
    response: string | null;
    asset: asset | null;
  }) => {
    if (!data.status) {
      dispatch(setToast({ success: data.status, message: data.message }));
    } else if (data.status) {
      dispatch(setToast({ success: data.status, message: data.message }));
      console.log(data.asset);
      if (data.asset) {
        dispatch(setAsset(data.asset));
      }
      formResetHandler();
    }
  };

  const formResetHandler = () => {
    setShowModal(false);
    resetName();
    resetSymbol();
    resetId();
  };

  return (
    <Tabs
      activeKey={key}
      id="details-tab"
      className="mb-3"
      onSelect={(k) => {
        return setKey(k!);
      }}
    >
      <Tab eventKey="assets" title={t("description.trackedAssets")}>
        <Card border="dark" style={{ width: "70rem" }} className={classes.card}>
          <Card.Header>{t("description.addAsset")}</Card.Header>
          <Card.Body>
            <Form
              noValidate
              onSubmit={formSubmissionHandler}
              className="d-flex "
            >
              <div>
                <Row>
                  <Form.Group as={Col} className="mb-2" controlId="formId">
                    <Form.Label>{t("description.id")}</Form.Label>
                    <Form.Control
                      placeholder={t("description.enterId")}
                      onChange={idInputChangeHandler}
                      onBlur={idBlurHandler}
                      value={enteredId}
                      isInvalid={idInputIsInvalid}
                    />
                    <Form.Control.Feedback type="invalid">
                      {t("description.idError")}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>
                  <Form.Group as={Col} className="mb-2" controlId="formName">
                    <Form.Label>{t("description.assetName")}</Form.Label>
                    <Form.Control
                      placeholder={t("description.enterName")}
                      onChange={nameInputChangeHandler}
                      onBlur={nameBlurHandler}
                      value={enteredName}
                      isInvalid={nameInputIsInvalid}
                    />
                    <Form.Control.Feedback type="invalid">
                      {t("description.errorName")}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} className="mb-2" controlId="formSymbol">
                    <Form.Label>{t("description.assetSymbol")}</Form.Label>
                    <Form.Control
                      placeholder={t("description.enterSymbol")}
                      onChange={symbolInputChangeHandler}
                      onBlur={symbolBlurHandler}
                      value={enteredSymbol}
                      isInvalid={symbolInputIsInvalid}
                    />
                    <Form.Control.Feedback type="invalid">
                      {t("description.errorSymbol")}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </div>
              <div className={classes["button-div"]}>
                <Button
                  variant="primary"
                  type="submit"
                  className="m-1"
                  disabled={formIsInvalid}
                >
                  {t("description.send")}
                </Button>
                <Button
                  disabled={!enteredName && !enteredSymbol && !enteredId}
                  variant="primary"
                  type="reset"
                  onClick={() => setShowModal(true)}
                  className="m-1"
                >
                  {t("description.reset")}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
        <div className="d-flex flex-row flex-wrap">
          {assets.length > 0 &&
            assets.map((asset) => (
              <AssetItem
                key={asset.id}
                id={asset.id}
                assetId={asset.assetId}
                symbol={asset.symbol}
                name={asset.name}
              />
            ))}
          {assets.length === 0 && (
            <Card
              bg="dark"
              border="info"
              text="white"
              style={{ width: "15rem" }}
              className="m-2"
            >
              <Card.Header className="text-warning">
                {t("description.addAssets")}
              </Card.Header>
              <Card.Body>
                <Card.Title> {t("description.noAssets")} </Card.Title>
                <Card.Text>{t("description.noAssetsMessage")}</Card.Text>
              </Card.Body>
            </Card>
          )}
        </div>
        <CustomModal
          show={showModal}
          onHide={() => setShowModal(false)}
          onReset={formResetHandler}
          heading={t("description.warning")}
        >
          {t("description.resetAsset")}
        </CustomModal>
      </Tab>
      <Tab eventKey="pick" title={t("description.assetsList")}>
        <AllAssets />
      </Tab>
      <Tab eventKey="profile" title={t("description.profile")}>
        <Profile />
      </Tab>
    </Tabs>
  );
};

export default Assets;
