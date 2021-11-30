import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../store";

const Profile: React.FC<{}> = (props) => {
  const user = useSelector((state: RootState) => state.userSlice);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const mainPageHandler = () => {
    navigate("/", { replace: true });
  }
  return (
    <Card border="dark" style={{ width: "40rem" }} className="d-flex m-5">
      <Card.Header>{t("description.userDetails")}</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group
            as={Row}
            className="mb-2"
            controlId={"formPlaintextFirstName"}
          >
            <Form.Label column sm="2" className="text-primary">
              {t("description.firstName")}
            </Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly defaultValue={user.firstName} />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-2"
            controlId={"formPlaintextLastName"}
          >
            <Form.Label column sm="2" className="text-primary">
              {t("description.lastName")}
            </Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly defaultValue={user.lastName} />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-2"
            controlId={"formPlaintextEmail"}
          >
            <Form.Label column sm="2" className="text-primary">
              {t("description.email")}
            </Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly defaultValue={user.email} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-2" controlId={"formPlaintextAge"}>
            <Form.Label column sm="2" className="text-primary">
              {t("description.age")}
            </Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly defaultValue={user.age} />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-2"
            controlId={"formPlaintextAddress"}
          >
            <Form.Label column sm="2" className="text-primary">
              {t("description.address")}
            </Form.Label>
            <Col sm="10">
              <Form.Control
                plaintext
                readOnly
                defaultValue={user.address.houseNumber}
              />
            </Col>
            <Form.Label column sm="2" className="text-primary"></Form.Label>
            <Col sm="10">
              <Form.Control
                plaintext
                readOnly
                defaultValue={user.address.street}
              />
            </Col>
            <Form.Label column sm="2" className="text-primary"></Form.Label>
            <Col sm="10">
              <Form.Control
                plaintext
                readOnly
                defaultValue={user.address.postalCode}
              />
            </Col>
          </Form.Group>
        </Form>
        <Button onClick={mainPageHandler}>{t("description.mainPage")}</Button>
      </Card.Body>
    </Card>
  );
};

export default Profile;
