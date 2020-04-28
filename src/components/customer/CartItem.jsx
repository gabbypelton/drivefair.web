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
  Card,
} from "reactstrap";
import { removeFromCart } from "../../actions/cart";

import { Button } from "../styles";

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
            {modifications.map((selectedMod) => {
              const menuItemMod = menuItem.modifications.find(
                (a) => (a.name = selectedMod.name)
              );
              return (
                <SelectedOptions
                  selectedMod={selectedMod}
                  menuItemMod={menuItemMod}
                  key={selectedMod._id}
                />
              );
            })}
          </Row>
          <Button
            onClick={() => props.removeFromCart(orderItem._id)}
            buttonText="Remove"
            isLoading={props.isLoading}
          />
        </CardBody>
      </Card>
    </Col>
  );
};

const SelectedOptions = (props) => (
  <Col>
    <Row>
      <Col>{props.menuItemMod.name}</Col>
    </Row>
    {Array.isArray(props.selectedMod.selectedOptions) ? (
      <Col>
        {props.selectedMod.selectedOptions.map((option) => {
          return (
            <Row>
              <Col>{option.name}</Col>
            </Row>
          );
        })}
      </Col>
    ) : (
      <Row>
        <Col>{props.selectedMod.selectedOptions.name}</Col>
      </Row>
    )}
    <Row></Row>
  </Col>
);

const mapStateToProps = (state) => ({
  selectedVendor: state.vendor.selectedVendor,
  isLoading: state.cart.isLoading,
});

const mapDispatchToProps = {
  removeFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
