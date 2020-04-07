import React, { Component } from "react";
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
} from "reactstrap";

export const VendorInfo = (props) => {
  const { businessName, address, phoneNumber } = props.vendor;
  return (
    <Col xs="12" md="6" xl="4">
      <Card>
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
          <Button>Menu</Button>
        </CardBody>
      </Card>
    </Col>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(VendorInfo);
