import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Container } from "reactstrap";
import VendorInfo from "../../components/customer/VendorInfo";
import { getVendors } from "../../actions/vendor";
import { Redirect } from "react-router";

export class Vendors extends Component {
  componentDidMount() {
    this.props.getVendors();
  }

  render() {
    if (!this.props.vendors) {
      return <Redirect to="/" />;
    }
    return (
      <Container>
        <Row>
          {this.props.vendors.map((vendor) => {
            return <VendorInfo vendor={vendor} />;
          })}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  vendors: state.vendor.vendors,
});

const mapDispatchToProps = {
  getVendors,
};

export default connect(mapStateToProps, mapDispatchToProps)(Vendors);
