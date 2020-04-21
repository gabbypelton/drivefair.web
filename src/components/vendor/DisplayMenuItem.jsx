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
import { addToCart } from "../../actions/cart";
import { OptionContainer, OptionLabel, OptionInput, Button } from "../styles";
import { formatPriceFromFloatString } from "../../services/formatting";

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
            src="https://via.placeholder.com/200"
            alt="Card image cap"
          />
          <CardTitle>{menuItem.name}</CardTitle>
          <CardSubtitle>{menuItem.description}</CardSubtitle>
          <CardText>${parseFloat(menuItem.price).toFixed(2)}</CardText>
          <Row>
            {menuItem.modifications.map((mod) => (
              <MenuItemMod
                key={mod._id}
                mod={mod}
              />
            ))}
          </Row>
          <Button
            color="primary"
            onClick={() => toggleEditMenuItem()}
            buttonText="Edit Item"
            isLoading={props.isLoading}
          />
        </CardBody>
      </Card>
    </Col>
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
            <p>{optionName} - {formatPriceFromFloatString(mod.options[optionName].price)}</p>))}
      </Row>
    </Col>
  );
};

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
