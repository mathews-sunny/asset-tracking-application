import { useCallback, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../hooks/use-http";
import { RootState, setApiAssets } from "../store";
import AllAssetsItem from "./AllAssetsItem";

const AllAssets: React.FC<{}> = (props) => {
  const { sendRequest: fetchApi } = useHttp();
  const dispatch = useDispatch();
  const allAssets = useSelector(
    (state: RootState) => state.apiAssetsSlice.apiAllAssets
  );
  const { t } = useTranslation();
  const apiResponseHandler = (data: any) => {
    dispatch(setApiAssets(data.data));
  };
  const loadDataHandler = useCallback(() => {
    fetchApi(
      {
        /*
         * Using cors-anywhere for development purpose to avoid CORS validsation issue.
         * Temporary access required : For that visit https://cors-anywhere.herokuapp.com/
         * and request for temporary access (quick access)
         */
        url: `https://cors-anywhere.herokuapp.com/https://api.coincap.io/v2/assets`,
      },
      apiResponseHandler
    );
  }, []);
  useEffect(() => {
    loadDataHandler();
  }, [loadDataHandler]);

  return (
    <div className="d-flex flex-row flex-wrap">
      {allAssets.length > 0 &&
        allAssets.map((asset) => (
          <AllAssetsItem
            key={asset.id}
            id={asset.id}
            symbol={asset.symbol}
            name={asset.name}
          />
        ))}
      {allAssets.length === 0 && (
        <Card
          bg="dark"
          border="info"
          text="white"
          style={{ width: "15rem" }}
          className="m-2"
        >
          <Card.Header className="text-warning">
            {t("description.reload")}
          </Card.Header>
          <Card.Body>
            <Card.Title> {t("description.apiSlow")} </Card.Title>
            <Card.Text>{t("description.reloadAgain")}</Card.Text>
            <Button variant="info" onClick={loadDataHandler}>
              {t("description.reload")}
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default AllAssets;
