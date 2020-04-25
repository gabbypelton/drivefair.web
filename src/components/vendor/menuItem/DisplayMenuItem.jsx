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
import {
  formatPriceFromFloatString,
  formatImgurUrl,
} from "../../../services/formatting";

const DisplayMenuItem = (props) => {
  const { menuItem } = props;
  const fullImageUrl = formatImgurUrl(menuItem.imageUrl);

  return (
    <CardBody>
      <CardImg top width="100%" src={fullImageUrl} alt="Card image cap" />
      <CardTitle>{menuItem.name}</CardTitle>
      <CardSubtitle>{menuItem.description}</CardSubtitle>
      <CardText>${parseFloat(menuItem.price).toFixed(2)}</CardText>
      <Row>
        {menuItem.modifications.map((mod) => (
          <MenuItemMod key={mod._id} mod={mod} />
        ))}
      </Row>
    </CardBody>
  );
};

const MenuItemMod = (props) => {
  const { mod } = props;
  return (
    <Col key={mod._id}>
      <Row>
        <Col>
          <Label for={mod.name}>{mod.displayName}</Label>
        </Col>
      </Row>
      <Row>
        {Object.keys(mod.options).map((optionName) => (
          <p>
            {optionName} -{" "}
            {formatPriceFromFloatString(mod.options[optionName].price)}
          </p>
        ))}
      </Row>
    </Col>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayMenuItem);
