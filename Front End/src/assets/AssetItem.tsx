import { useState } from "react";
import { Card, Button, CloseButton } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import useHttp from "../hooks/use-http";
import CustomModal from "../Modals/CustomModal";
import { removeAsset, setToast } from "../store";

const AssetItem: React.FC<{
  key: number;
  id: number;
  assetId: string;
  name: string;
  symbol: string;
}> = (props) => {
  const { sendRequest: deleteAsset } = useHttp();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  const onRemoveHandler = async () => {
    await deleteAsset(
      {
        url: `http://localhost:8083/hahn-application/api/assets/${props.id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
      deleteHandler
    );
  };
  const deleteHandler = (data: { status: boolean; message: string }) => {
    if (!data.status) {
      dispatch(setToast({ success: data.status, message: data.message }));
    } else if (data.status) {
      dispatch(setToast({ success: data.status, message: data.message }));
      dispatch(removeAsset(props.id));
    }
  };

  return (
    <Card
      bg="secondary"
      border="info"
      key={props.id}
      text="white"
      style={{ width: "15rem" }}
      className="m-2"
    >
      <Card.Header className="text-info">
        {props.name}
        <CloseButton
          variant="white"
          className="bg-info position-absolute top-0 end-0"
          onClick={() => setShowModal(true)}
        />
      </Card.Header>
      <Card.Body>
        <Card.Title>
          {t("description.name")} {props.name}
        </Card.Title>
        <Card.Text>
          {t("description.symbol")} {props.symbol}
          <br /> {t("description.id")} {props.assetId}
        </Card.Text>
        <Button variant="info" onClick={() => setShowModal(true)}>
          {t("description.remove")}
        </Button>
      </Card.Body>
      <CustomModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onReset={onRemoveHandler}
        heading={t("description.warning")}
      >
        {t("description.deleteAsset")}
      </CustomModal>
    </Card>
  );
};

export default AssetItem;
