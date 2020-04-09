import React, { useState } from "react";
import { connect } from "react-redux";
import {
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Row,
  Col,
  Button,
  CardImg,
  FormGroup,
  Label,
  Input,
  InputGroup,
} from "reactstrap";
import { addToCart } from "../../actions/cart";
import { OptionContainer, OptionLabel, OptionInput } from "../styles";
import { formatPriceFromFloatString } from "../../services/formatting";

const MenuItem = (props) => {
  const { menuItem } = props;
  const modObj = {};
  menuItem.modifications.forEach((modification) => {
    if (modification.type === "multiple") {
      modObj[modification.name] = [modification.default || ""];
    } else {
      modObj[modification.name] = modification.default || "";
    }
  });
  const [selectedMods, setMods] = useState({ ...modObj });
  const updateSelectedMods = ({ type, name, value, checked }) => {
    let newValue;
    if (type === "checkbox") {
      if (checked) {
        newValue = [...selectedMods[name], value];
      } else {
        newValue = [...selectedMods[name].filter((mod) => mod !== value)];
      }
    } else newValue = value;
    setMods({
      ...selectedMods,
      [name]: newValue,
    });
  };
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
          {menuItem.modifications.map((mod) => (
            <MenuItemMod
              mod={mod}
              selectedMods={selectedMods}
              updateSelectedMods={updateSelectedMods.bind(this)}
            />
          ))}
        </Row>
        <Button onClick={() => props.addToCart(menuItem, selectedMods)}>
          Add to cart
        </Button>
      </CardBody>
    </Col>
  );
};

const MenuItemMod = (props) => {
  const { mod, updateSelectedMods, selectedMods } = props;
  return (
    <Col key={mod._id}>
      <Row>
        <Col>
          <Label for={mod.name}>{mod.displayName}</Label>
        </Col>
      </Row>
      <Row>
        {mod.options.map((option) => (
          <OptionContainer key={option._id}>
            <OptionLabel for={option.name}>
              {option.name} ({formatPriceFromFloatString(option.price)})
            </OptionLabel>
            <OptionInput
              name={mod.name}
              id={option.name}
              value={option.name}
              checked={
                typeof selectedMods[mod.name] === "object" &&
                selectedMods[mod.name].includes(option.name)
              }
              selected={
                typeof selectedMods[mod.name] === "string" &&
                selectedMods[mod.name] === option.name
              }
              type={mod.type === "multiple" ? "checkbox" : "radio"}
              onChange={(e) => updateSelectedMods(e.target)}
            />
          </OptionContainer>
        ))}
      </Row>
    </Col>
  );
};

const mapStateToProps = (state) => ({
  selectedVendor: state.vendor.selectedVendor,
});

const mapDispatchToProps = {
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
