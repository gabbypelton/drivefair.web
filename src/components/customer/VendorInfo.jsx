import React from "react";
import { connect } from "react-redux";
import {
  Row,
  CardBody,
  Card,
  Col,
  CardTitle,
  CardText,
  CardSubtitle,
  Button,
  CardImg,
} from "reactstrap";
import { Link } from "react-router-dom";

export const VendorInfo = (props) => {
  const { businessName, address, phoneNumber, _id } = props.vendor;
  return (
    <Col xs="12" md="6" xl="4">
      <Card>
        <CardImg
          top
          width="100%"
          src="https://via.placeholder.com/400"
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle>{businessName}</CardTitle>
          <CardSubtitle>{phoneNumber}</CardSubtitle>
          <CardText>
            <Row>
              <Col>
                {address.street} {address.unit}
              </Col>
            </Row>
            <Row>
              <Col>
                {address.city}, {address.state} {address.zip}
              </Col>
            </Row>
            <Row>
              <Col>{address.street}</Col>
            </Row>
          </CardText>
          <Link to={`/vendors/${_id}`}>Menu</Link>
        </CardBody>
      </Card>
    </Col>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(VendorInfo);
