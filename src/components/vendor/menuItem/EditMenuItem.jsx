import React, { Component } from "react";
import { connect } from "react-redux";
import { CardBody, FormGroup } from "reactstrap";
import { Form, Col, Row, Label, Input, InputErrorMessage } from "../../styles";

export class EditMenuItem extends Component {
  state = {
    name: "",
    formErrors: {},
  };

  componentDidMount() {
    this.setState({
      ...this.props.menuItem,
    });
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  render() {
    return (
      <CardBody>
        <Row>
          <Form>
            <FormGroup>
              <Label to="image">Name</Label>
              <Input
                type="file"
                name="image"
                onChange={this.handleChange.bind(this)}
              />
              <InputErrorMessage>
                {this.state.formErrors.name}
              </InputErrorMessage>
            </FormGroup>
          </Form>
        </Row>
        <Row>
          <Form>
            <FormGroup>
              <Label to="name">Name</Label>
              <Input
                name="name"
                value={this.state.name}
                onChange={this.handleChange.bind(this)}
              />
              <InputErrorMessage>
                {this.state.formErrors.name}
              </InputErrorMessage>
            </FormGroup>
          </Form>
        </Row>
        <Row>
          <Form>
            <FormGroup>
              <Label to="description">Description</Label>
              <Input
                name="description"
                value={this.state.description}
                onChange={this.handleChange.bind(this)}
              />
              <InputErrorMessage>
                {this.state.formErrors.description}
              </InputErrorMessage>
            </FormGroup>
          </Form>
        </Row>
        <Row>
          <Form>
            <FormGroup>
              <Label to="price">Price</Label>
              <Input
                name="price"
                value={this.state.price}
                onChange={this.handleChange.bind(this)}
              />
              <InputErrorMessage>
                {this.state.formErrors.price}
              </InputErrorMessage>
            </FormGroup>
          </Form>
        </Row>
      </CardBody>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EditMenuItem);
