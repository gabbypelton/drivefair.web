import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Spinner } from "reactstrap";

import EditVendor from "../../components/vendor/EditVendor";
import DisplayVendor from "../../components/vendor/DisplayVendor";
import DisplayOrEditMenuItem from "../../components/vendor/menuItem/DisplayOrEditMenuItem";
import { getMenu } from "../../actions/menu";
import {
  Link,
  Container,
  Row,
  Col,
  Button,
  MenuRow,
} from "../../components/styles";

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

  componentDidMount() {
    this.props.getMenu();
  }

  render() {
    if (this.props.isLoading) return <Spinner />;
    if (!this.props.vendor || !this.props.vendor._id)
      return <Redirect to="/" />;
    const { menuItems, vendor } = this.props;
    return (
      <Container>
        <Row>
          {this.state.showVendorEditor ? (
            <EditVendor vendor={vendor} />
          ) : (
            <DisplayVendor vendor={vendor} />
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
          {menuItems.map((menuItem) => (
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
  menuItems: state.menu.menuItems,
  isLoading: state.menu.isLoading,
});

const mapDispatchToProps = {
  getMenu,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
