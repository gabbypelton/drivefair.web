import React from "react";
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { toggleReadyToPay } from "../../../actions/cart";
import CardForm from "./CardForm";

class CheckoutForm extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.readyToPay} toggle={() => this.props.toggleReadyToPay(false)}>
        <ModalHeader>Checkout</ModalHeader>
        <ModalBody>
          <Elements stripe={stripePromise}>
            <CardForm />
          </Elements>
        </ModalBody>
      </Modal>
    );
  }
}

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_PUBLIC_KEY);

const mapStateToProps = (state) => ({
  readyToPay: state.cart.readyToPay,
});

const mapDispatchToProps = {
  toggleReadyToPay,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
