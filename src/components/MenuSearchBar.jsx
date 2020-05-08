import React from "react";
import { connect } from "react-redux";
import { Input, Row, Col } from "./styles";
import { searchMenu } from "../actions/menu";

export const Searchbar = (props) => {
  return (
    <Row style={{ marginBottom: "1rem" }}>
      <Col xs="12" md="4" xl="3">
        <Input
          placeholder="Searh Menu"
          value={props.searchString}
          onChange={(e) => props.searchMenu(e.target.value)}
        />
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  searchString: state.menu.searchString,
});

const mapDispatchToProps = {
  searchMenu,
};

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
