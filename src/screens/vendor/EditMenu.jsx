import React, { Component } from "react";
import { connect } from "react-redux";

import EditVendor from "../../components/vendor/EditVendor";
import DisplayVendor from "../../components/vendor/DisplayVendor";
import DisplayOrEditMenuItem from "../../components/vendor/menuItem/DisplayOrEditMenuItem";
import {
  Link,
  Container,
  Row,
  Col,
  Button,
  MenuRow,
} from "../../components/styles";
import { Redirect } from "react-router";
import EditMenuItem from "../../components/vendor/menuItem/EditMenuItem";

export class Menu extends Component {
  state = {
    showVendorEditor: false,
  };

  toggleVendorEditor() {
    const showVendorEditor = !this.state.showVendorEditor;
    this.setState({
      showVendorEditor,
    });
  }

  render() {
    if (!this.props.vendor || !this.props.vendor._id)
      return <Redirect to="/" />;
    const { menu, _id } = this.props.vendor;
    return (
      <Container>
        <Row>
          {this.state.showVendorEditor ? (
            <EditVendor vendor={this.props.vendor} />
          ) : (
            <DisplayVendor vendor={this.props.vendor} />
          )}
        </Row>

        <Row>
          <Col>
            <Button
              color="primary"
              buttonText={
                this.state.showVendorEditor ? "Cancel" : "Edit Profile"
              }
              onClick={() => this.toggleVendorEditor()}
            />
          </Col>
        </Row>
        <MenuRow>
          {menu.map((menuItem) => (
            <DisplayOrEditMenuItem key={menuItem._id} menuItem={menuItem} />
          ))}
          <DisplayOrEditMenuItem menuItem={null} />
        </MenuRow>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  vendor: state.session.profile,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
