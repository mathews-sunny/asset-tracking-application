import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const AllAssetsItem: React.FC<{
  key: string;
  id: string;
  name: string;
  symbol: string;
}> = (props) => {
  const { t } = useTranslation();
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
          {t("description.name")}{props.name}
        </Card.Title>
        <Card.Text>
          {t("description.symbol")}{props.symbol}
          <br />{t("description.id")}{props.id}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default AllAssetsItem;
