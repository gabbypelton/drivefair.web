import React from "react";
import { connect } from "react-redux";
import { CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { Row, Card, Col, Button, CardImg } from "../styles";
import { Link } from "react-router-dom";
import { selectVendor } from "../../actions/vendor";
import { formatImgurUrl } from "../../services/formatting";

export const VendorInfo = (props) => {
  const { businessName, address, phoneNumber, _id, logoUrl } = props.vendor;
  return (
    <Col xs="12" md="6" lg="4">
      <Card>
        <CardImg
          top
          width="100%"
          src={formatImgurUrl(logoUrl)}
          alt={`Company logo for ${businessName}`}
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
