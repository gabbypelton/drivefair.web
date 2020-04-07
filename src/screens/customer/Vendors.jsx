import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Container } from "reactstrap";
import VendorInfo from "../../components/customer/VendorInfo";
import { getVendors } from "../../actions/vendor";

export class Vendors extends Component {
  componentDidMount() {
    this.props.getVendors();
  }
  render() {
    return (
      <Container>
        {this.props.vendors.map((vendor) => {
          return <VendorInfo vendor={vendor} />;
        })}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  vendors: state.vendor.vendors,
});

const mapDispatchToProps = {
  getVendors
};

export default connect(mapStateToProps, mapDispatchToProps)(Vendors);
