import React, { useState } from "react";
import { connect } from "react-redux";
import {
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Row,
  Col,
  CardImg,
  FormGroup,
  Label,
  Input,
  InputGroup,
  Card,
} from "reactstrap";
import { addToCart } from "../../../actions/cart";
import { OptionContainer, OptionLabel, OptionInput, Button } from "../../styles";
import { formatPriceFromFloatString } from "../../../services/formatting";

const MenuItem = (props) => {
  const { menuItem } = props;

  const toggleEditMenuItem = () => {
    console.log("okay");
  }

  return (
    <Col xs="12" md="6" lg="4">
      <Card>
        <CardBody>
          <CardImg
            top
            width="100%"
            src={menuItem.imageUrl}
            alt="Card image cap"
          />
          <input type="upload"></input>
        </CardBody>
      </Card>
    </Col>
  );
};


const mapStateToProps = () => ({})

const mapDispatchToProps = {
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
