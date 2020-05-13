import React, { useMemo, useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { Label } from "reactstrap";
import { connect } from "react-redux";

import useResponsiveFontSize from "../../useResponsiveFontSize";
import { pay } from "../../../actions/cart";
import { Button, InputErrorMessage } from "../../styles";
import { colors } from "../../../constants/theme";

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: colors.text,
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    [fontSize]
  );

  return options;
};

const CardForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const [paymentError, setPaymentError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const payload = await stripe.createToken(
      elements.getElement(CardNumberElement)
    );

    if (payload.error) {
      setPaymentError(payload.error.message);
      return;
    }

    props.pay(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label to="cardNumber">Card number</Label>
      <CardNumberElement
        options={options}
        name="cardNumber"
        onReady={() => {
          console.log("CardNumberElement [ready]");
        }}
        onChange={(event) => {
          console.log("CardNumberElement [change]", event);
        }}
        onBlur={() => {
          console.log("CardNumberElement [blur]");
        }}
        onFocus={() => {
          console.log("CardNumberElement [focus]");
        }}
      />
      <Label to="expiry">Expiration date</Label>
      <CardExpiryElement
        options={options}
        name="expiry"
        onReady={() => {
          console.log("CardNumberElement [ready]");
        }}
        onChange={(event) => {
          console.log("CardNumberElement [change]", event);
        }}
        onBlur={() => {
          console.log("CardNumberElement [blur]");
        }}
        onFocus={() => {
          console.log("CardNumberElement [focus]");
        }}
      />
      <Label to="cvc">CVC</Label>
      <CardCvcElement
        options={options}
        name="cvc"
        onReady={() => {
          console.log("CardNumberElement [ready]");
        }}
        onChange={(event) => {
          console.log("CardNumberElement [change]", event);
        }}
        onBlur={() => {
          console.log("CardNumberElement [blur]");
        }}
        onFocus={() => {
          console.log("CardNumberElement [focus]");
        }}
      />
      <Button
        type="submit"
        disabled={!stripe}
        isLoading={props.isLoading}
        title="Pay"
      />
      <InputErrorMessage>{paymentError}</InputErrorMessage>
    </form>
  );
};

const mapStateToProps = (state) => ({
  orderItems: state.cart.orderItems,
  vendorId: state.cart.selectedVendorId,
  method: state.cart.selectedMethod,
  isLoading: state.cart.isLoading,
});

const mapDispatchToProps = {
  pay,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardForm);
