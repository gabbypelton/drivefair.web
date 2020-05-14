import React, { Component } from "react";
import { connect } from "react-redux";

import DisplayMenuItem from "./DisplayMenuItem";
import EditMenuItem from "./EditMenuItem";
import { Button, Col, Card } from "../../styles";
import { CardFooter } from "reactstrap";

export class DisplayOrEditMenuItem extends Component {
  state = {
    editMenuItem: false,
  };

  toggleEditMenuItem() {
    const editMenuItem = !this.state.editMenuItem;
    this.setState({
      editMenuItem,
    });
  }

  render() {
    const { menuItem } = this.props;
    return (
      <Col xs="12" md="6" lg="4">
        <Card>
          {this.state.editMenuItem || !menuItem ? (
            <EditMenuItem menuItem={menuItem} />
          ) : (
            <DisplayMenuItem menuItem={menuItem} />
          )}
          <CardFooter>
            {menuItem ? (
              <Button
                
                onClick={() => this.toggleEditMenuItem()}
                title={this.state.editMenuItem ? "Cancel" : "Edit"}
                isLoading={this.props.isLoading}
              />
            ) : null}
          </CardFooter>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayOrEditMenuItem);
