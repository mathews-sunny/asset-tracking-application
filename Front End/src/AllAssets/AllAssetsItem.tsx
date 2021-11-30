import { Card, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../hooks/use-http";
import { asset, RootState, setAsset, setToast } from "../store";

const AllAssetsItem: React.FC<{
  key: string;
  id: string;
  name: string;
  symbol: string;
}> = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.userSlice.id);
  const { sendRequest: saveAsset } = useHttp();
  const addAssetHandler = async () => {
    let asset = {
      assetId: props.id,
      symbol: props.symbol,
      name: props.name,
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
    }
  };
  return (
    <Card
      bg="dark"
      border="success"
      key={props.id}
      text="white"
      style={{ width: "15rem" }}
      className="m-2"
    >
      <Card.Header className="text-success">{props.name}</Card.Header>
      <Card.Body>
        <Card.Title>
          {t("description.name")}
          {props.name}
        </Card.Title>
        <Card.Text>
          {t("description.symbol")}
          {props.symbol}
          <br />
          {t("description.id")}
          {props.id}
        </Card.Text>
        <Button variant="success" onClick={addAssetHandler}>
        {t("description.add")}
      </Button>
      </Card.Body>
    </Card>
  );
};

export default AllAssetsItem;
