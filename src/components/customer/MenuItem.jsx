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
  Card,
} from "reactstrap";
import { addToCart } from "../../actions/cart";
import { OptionContainer, OptionLabel, OptionInput } from "../styles";
import { formatPriceFromFloatString } from "../../services/formatting";

const MenuItem = (props) => {
  const { menuItem } = props;
  const modObj = {};
  menuItem.modifications.forEach((modification) => {
    const { name, type, defaultOption } = modification;
    if (type === "multiple") {
      modObj[name] = [defaultOption || ""];
    } else {
      modObj[name] = defaultOption || "";
    }
  });
  const [selectedMods, setMods] = useState({ ...modObj });

  const addToCart = () => {
    let price = menuItem.price;
    Object.keys(selectedMods).forEach(modName => {
      const selectedMod = selectedMods[modName];
      const menuItemMod = menuItem.modifications.find(mod => mod.name === modName);
      if (Array.isArray(selectedMod)) {
        selectedMod.forEach(option => {
          price += menuItemMod[option].price;
        });
      } else {
        console.log(menuItemMod.options[selectedMod].price)
        price += menuItemMod.options[selectedMod].price;
      }
    })
    props.addToCart(menuItem, selectedMods, price, props.selectedVendor._id)
  }
  
  const updateSelectedMods = ({ type, name, value, checked }, modification) => {
    let newValue;
    if (type === "checkbox") {
      if (checked) {
        newValue = [...selectedMods[name], value];
      } else {
        newValue = selectedMods[name].filter(option => option !== value);
      }
    } else newValue = value;
    setMods({
      ...selectedMods,
      [name]: newValue,
    });
  };
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
                mod={mod}
                selectedMods={selectedMods}
                updateSelectedMods={updateSelectedMods.bind(this)}
              />
            ))}
          </Row>
          <Button onClick={() => addToCart(menuItem, selectedMods)}>
            Add to cart
          </Button>
        </CardBody>
      </Card>
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
        {Object.keys(mod.options).map((optionName) => (
          <OptionContainer key={optionName}>
            <OptionLabel for={optionName}>
              {optionName} (
              +{formatPriceFromFloatString(mod.options[optionName].price)})
            </OptionLabel>
            <OptionInput
              name={mod.name}
              id={optionName}
              value={optionName}
              checked={
                (mod.type === "multiple" &&
                  selectedMods[mod.name].includes(optionName)) ||
                selectedMods[mod.name] === optionName
              }
              type={mod.type === "multiple" ? "checkbox" : "radio"}
              onChange={(e) => updateSelectedMods(e.target, mod)}
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
