import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Row,
  Col,
  CardImg,
  FormGroup,
  Label,
  Input,
  InputGroup,
  Card,
} from "reactstrap";
import { addToCart } from "../../actions/cart";
import { OptionContainer, OptionLabel, OptionInput, Button } from "../styles";
import {
  formatPriceFromFloatString,
  formatImgurUrl,
} from "../../services/formatting";

class MenuItem extends Component {
  state = {
    modSelections: [],
  };

  componentDidMount() {
    const INITIAL_MOD_SELECTIONS = this.props.menuItem.modifications.map(
      (modification) => {
        const defaultSelectedOption =
          modification.options[modification.defaultOptionIndex];
        return {
          name: modification.name,
          selectedOptions:
            modification.type === "single"
              ? defaultSelectedOption
              : [defaultSelectedOption],
        };
      }
    );
    this.setState({
      modSelections: INITIAL_MOD_SELECTIONS,
    });
  }

  updateModSelection(mod, option, checked) {
    let { modSelections } = this.state;
    let currentModSelection = modSelections.find((a) => a.name === mod.name);
    if (mod.type === "single") {
      currentModSelection.selectedOptions = option;
    } else {
      if (checked) {
        currentModSelection.selectedOptions = [
          ...currentModSelection.selectedOptions,
          option,
        ];
      } else {
        currentModSelection.selectedOptions = currentModSelection.selectedOptions.filter(
          (a) => a.name === option.name
        );
      }
    }
    modSelections = [
      ...modSelections.filter((a) => a.name !== currentModSelection.name),
      currentModSelection,
    ];
    this.setState({
      modSelections,
    });
  }

  addToCart() {
    this.props.addToCart(
      this.props.menuItem,
      this.state.modSelections,
      this.props.selectedVendor._id
    );
  }

  render() {
    const { menuItem } = this.props;

    return (
      <Col xs="12" md="6" lg="4">
        <Card>
          <CardBody>
            <CardImg
              top
              width="100%"
              src={formatImgurUrl(menuItem.imageUrl)}
              alt={`Image of ${menuItem.name}`}
            />
            <CardTitle>{menuItem.name}</CardTitle>
            <CardSubtitle>{menuItem.description}</CardSubtitle>
            <CardText>${parseFloat(menuItem.price).toFixed(2)}</CardText>
            <Row>
              {menuItem.modifications.map((mod, modIndex) => (
                <MenuItemMod
                  key={mod._id}
                  mod={mod}
                  modSelection={this.state.modSelections[modIndex]}
                  updateModSelection={this.updateModSelection.bind(this)}
                />
              ))}
            </Row>
            <Button
              color="primary"
              onClick={() => this.addToCart()}
              buttonText="Add to cart"
              isLoading={this.props.isLoading}
            />
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const MenuItemMod = (props) => {
  const { mod, updateModSelection, modSelection } = props;
  if (!modSelection) return null;
  return (
    <Col key={mod._id}>
      <Row>
        <Col>
          <Label for={mod.name}>{mod.name}</Label>
        </Col>
      </Row>
      <Row>
        <Col>
          {mod.options.map((option) => (
            <Row key={option.name}>
              <Col xs="3">
                <OptionInput
                  name={mod.name}
                  id={option.name}
                  value={option.name}
                  checked={
                    mod.type === "multiple"
                      ? modSelection.selectedOptions.find(
                          (a) => a._id === option._id
                        )
                      : modSelection.selectedOptions._id === option._id
                  }
                  type={mod.type === "multiple" ? "checkbox" : "radio"}
                  onChange={(e) =>
                    updateModSelection(mod, option, e.target.checked)
                  }
                />
              </Col>
              <Col xs="9">
                <Row>
                  <OptionLabel for={option.name}>
                    {option.name} ( +{formatPriceFromFloatString(option.price)})
                  </OptionLabel>
                </Row>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </Col>
  );
};

const mapStateToProps = (state) => ({
  selectedVendor: state.vendor.selectedVendor,
  isLoading: state.cart.isLoading,
});

const mapDispatchToProps = {
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
