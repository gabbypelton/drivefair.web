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
} from "reactstrap";
import { removeFromCart} from "../../actions/cart";

const CartItem = (props) => {
  const { cartItem } = props;
  const { menuItem, modifications } = cartItem;
  return (
    <Col xs={12} md={6} xl={4}>
      <CardBody>
        <CardImg
          top
          width="100%"
          src="https://via.placeholder.com/400"
          alt="Card image cap"
        />
        <CardTitle>{menuItem.name}</CardTitle>
        <CardSubtitle>{menuItem.description}</CardSubtitle>
        <CardText>${parseFloat(menuItem.price).toFixed(2)}</CardText>
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
        <Button onClick={() => props.removeFromCart(cartItem.key)}>Remove</Button>
      </CardBody>
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
  removeFromCart
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
