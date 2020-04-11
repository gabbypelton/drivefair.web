import React, { useMemo } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from "@stripe/react-stripe-js";
import { Label } from "reactstrap";
import { connect } from "react-redux";

import useResponsiveFontSize from "../../useResponsiveFontSize";
import { sendCart } from "../../../actions/cart";


const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    [fontSize]
  );

  return options;
};

const CardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement)
    });
    
    this.props.sendCart(this.props.orderItems, this.props.vendorId, this.props.method, payload)
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label to="cardNumber">
        Card number
      </Label>
        <CardNumberElement
          options={options}
          name="cardNumber"
          onReady={() => {
            console.log("CardNumberElement [ready]");
          }}
          onChange={event => {
            console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            console.log("CardNumberElement [focus]");
          }}
        />
      <Label to="expiry">
        Expiration date
      </Label>
        <CardExpiryElement
          options={options}
          name="expiry"
          onReady={() => {
            console.log("CardNumberElement [ready]");
          }}
          onChange={event => {
            console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            console.log("CardNumberElement [focus]");
          }}
        />
      <Label to="cvc">
        CVC
      </Label>
        <CardCvcElement
          options={options}
          name="cvc"
          onReady={() => {
            console.log("CardNumberElement [ready]");
          }}
          onChange={event => {
            console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            console.log("CardNumberElement [focus]");
          }}
        />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

const mapStateToProps = state => ({
  orderItems: state.cart.orderItems,
  vendorId: state.cart.selectedVendorId,
  method: state.cart.selectedMethod,
})

const mapDispatchToProps = {
  sendCart
}

export default connect(mapStateToProps, mapDispatchToProps)(CardForm);
