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
import { selectVendor } from "../../actions/vendor";

export const VendorInfo = (props) => {
  const { businessName, address, phoneNumber, _id } = props.vendor;
  return (
    <Col xs="12" md="6" lg="4">
      <Card>
        <CardImg
          top
          width="100%"
          src="https://via.placeholder.com/200"
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle>{businessName}</CardTitle>
          <CardSubtitle>{phoneNumber}</CardSubtitle>
          <CardText>
            {address.street} {address.unit}
          </CardText>
          <CardText>
            {address.city}, {address.state} {address.zip}
          </CardText>
          <Link to={"/menu"} onClick={() => props.selectVendor(_id)}>
            Menu
          </Link>
        </CardBody>
      </Card>
    </Col>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { selectVendor };

export default connect(mapStateToProps, mapDispatchToProps)(VendorInfo);
