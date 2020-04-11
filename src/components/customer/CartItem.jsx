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
  Button,
  Card,
} from "reactstrap";
import { removeFromCart } from "../../actions/cart";

const CartItem = (props) => {
  const { orderItem } = props;
  const { menuItem, modifications } = orderItem;
  return (
    <Col xs="12" md="6" lg="4">
      <Card>
        <CardBody>
          <CardTitle>{menuItem.name}</CardTitle>
          <CardText>${parseFloat(orderItem.price).toFixed(2)}</CardText>
          <Row>
            {Object.keys(modifications).map((modName) => {
              const menuItemMod = menuItem.modifications.find(
                (mod) => mod.name === modName
              );
              const selections = modifications[modName];
              return (
                <SelectedOptions
                  menuItemMod={menuItemMod}
                  selections={selections}
                  key={menuItemMod._id}
                />
              );
            })}
          </Row>
          <Button onClick={() => props.removeFromCart(orderItem._id)}>
            Remove
          </Button>
        </CardBody>
      </Card>
    </Col>
  );
};

const SelectedOptions = (props) => (
  <Col>
    <Row>
      <Col>{props.menuItemMod.displayName}</Col>
    </Row>
    {typeof props.selections === "object" ? (
      <Col>
        {props.selections.map((selection) => {
          return (
            <Row>
              <Col>{selection}</Col>
            </Row>
          );
        })}
      </Col>
    ) : (
      <Row>
        <Col>{props.selections}</Col>
      </Row>
    )}
    <Row></Row>
  </Col>
);

const mapStateToProps = (state) => ({
  selectedVendor: state.vendor.selectedVendor,
});

const mapDispatchToProps = {
  removeFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
