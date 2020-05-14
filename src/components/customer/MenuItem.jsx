import React, { Component } from "react";
import { connect } from "react-redux";
import { CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
import { addToCart } from "../../actions/cart";
import {
  Card,
  Col,
  Row,
  CardImg,
  Button,
  ModificationSelect,
  ModificationOption,
} from "../styles";
import {
  formatPriceFromFloatString,
  formatImgurUrl,
} from "../../services/formatting";

class MenuItem extends Component {
  state = {
    modifications: [],
  };

  componentDidMount() {
    const { modifications } = this.props.menuItem;
    modifications.forEach((modification) => {
      modification.options[modification.defaultOptionIndex].selected = true;
    });
    this.setState({
      modifications,
    });
  }

  toggleModificationOption(modIndex, optionIndex) {
    let { modifications } = this.state;
    if (modIndex !== null && optionIndex !== null) {
      const modification = modifications[modIndex];
      const option = modification.options[optionIndex];
      if (modification.type === "single") {
        modification.options.forEach((option, index) => {
          if (index === optionIndex) {
            option.selected = true;
          } else {
            option.selected = false;
          }
        });
      } else {
        option.selected = !option.selected;
      }
    }
    this.setState({ modifications });
  }

  addToCart() {
    const modifications = this.state.modifications.map((mod) => {
      return { ...mod, options: mod.options.filter((a) => a.selected) };
    });
    this.props.addToCart(
      this.props.menuItem,
      modifications,
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
              {this.state.modifications.map((mod, modIndex) => (
                <Col key={mod._id}>
                  <h4>{mod.name}</h4>
                  <ModificationSelect>
                    {mod.options.map((option, optionIndex) => {
                      return (
                        <ModificationOption
                          key={option._id}
                          value={optionIndex}
                          selected={option.selected}
                          onClick={() =>
                            this.toggleModificationOption(modIndex, optionIndex)
                          }
                        >
                          {option.name}
                        </ModificationOption>
                      );
                    })}
                  </ModificationSelect>{" "}
                </Col>
              ))}
            </Row>
            <Button
              
              onClick={() => this.addToCart()}
              title="Add to cart"
              isLoading={this.props.isLoading}
            />
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedVendor: state.vendor.selectedVendor,
  isLoading: state.cart.isLoading,
});

const mapDispatchToProps = {
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
