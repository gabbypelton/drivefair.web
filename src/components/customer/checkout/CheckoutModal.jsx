import React from "react";
import { connect } from "react-redux";
import { Spinner, Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { toggleReadyToPay } from "../../../actions/cart";
import { getAddresses, selectAddress } from "../../../actions/customer";
import CardForm from "./CardForm";
import EditAddress from "./EditAddress";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Row,
  TouchableHighlight,
  ModificationSelect,
  ModificationOption,
} from "../../styles";
import { colors } from "../../../constants/theme";

class CheckoutForm extends React.Component {
  state = {
    addresses: [],
    selectedAddressIndex: null,
  };

  componentDidMount() {
    this.props.getAddresses();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.addressesLoading && !this.props.addressesLoading) {
      this.setState({
        addresses: [...this.props.addresses],
      });
    }
  }

  selectAddress(selectedAddressIndex) {
    const selectedAddress = this.state.addresses[selectedAddressIndex];
    this.setState({
      selectedAddressIndex,
      selectedAddress,
    });
    if (selectedAddress) {
      this.props.selectAddress(selectedAddress._id);
    }
  }

  render() {
    return (
      <Modal
        isOpen={this.props.readyToPay}
        toggle={() => this.props.toggleReadyToPay(false)}
      >
        <ModalHeader>Checkout</ModalHeader>
        <ModalBody>
          {this.props.orderMethod === "DELIVERY" ? (
            <Container>
              <Row>Addresses</Row>
              <Row>(click to select)</Row>
              <Row>
                <ModificationSelect>
                  {this.props.addressesLoading ? (
                    <Spinner />
                  ) : (
                    this.state.addresses.map((address, index) => {
                      return (
                        <ModificationOption
                          key={address._id}
                          value={index}
                          selected={this.state.selectedAddressIndex === index}
                          onClick={() => this.selectAddress(index)}
                        >
                          {address.street}
                        </ModificationOption>
                      );
                    })
                  )}
                </ModificationSelect>
              </Row>
              <Row>
                <Col>
                  <TouchableHighlight onClick={() => this.selectAddress(null)}>
                    <FontAwesomeIcon
                      icon={faPlusCircle}
                      color={colors.primary100}
                    />
                    New Address
                  </TouchableHighlight>
                </Col>
              </Row>
              <Row>
                <EditAddress address={this.state.selectedAddress} />
              </Row>
            </Container>
          ) : null}
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
  addresses: state.customer.addresses,
  addressesLoading: state.customer.isLoading,
  orderMethod: state.cart.method,
});

const mapDispatchToProps = {
  getAddresses,
  selectAddress,
  toggleReadyToPay,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
