import React from "react";
import { connect } from "react-redux";
import { CardBody, CardTitle, CardText } from "reactstrap";
import { Card, Col, Row, Button } from "../styles";
import { removeFromCart } from "../../actions/cart";

const CartItem = (props) => {
  const { orderItem } = props;
  const { menuItem, modifications } = orderItem;
  return (
    <Col xs="6" md="4" lg="2">
      <Card>
        <CardBody>
          <CardTitle>{menuItem.name}</CardTitle>
          <CardText>${parseFloat(orderItem.price).toFixed(2)}</CardText>
          <Row>
            {modifications.map((selectedMod) => {
              return (
                <Options selectedMod={selectedMod} key={selectedMod._id} />
              );
            })}
          </Row>
          <Button
            onClick={() => props.removeFromCart(orderItem._id)}
            title="Remove"
            isLoading={props.isLoading}
          />
        </CardBody>
      </Card>
    </Col>
  );
};

const Options = (props) => (
  <Col>
    <Row>
      <Col>{props.selectedMod.name}</Col>
    </Row>
    {Array.isArray(props.selectedMod.options) ? (
      <Col>
        {props.selectedMod.options.map((option) => {
          return (
            <Row>
              <Col>{option.name}</Col>
            </Row>
          );
        })}
      </Col>
    ) : (
      <Row>
        <Col>{props.selectedMod.options.name}</Col>
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
