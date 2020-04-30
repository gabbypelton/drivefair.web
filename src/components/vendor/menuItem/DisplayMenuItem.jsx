import React, { useState } from "react";
import { connect } from "react-redux";
import {
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardImg,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { removeMenuItem } from "../../../actions/menu";
import {
  formatPriceFromFloatString,
  formatImgurUrl,
} from "../../../services/formatting";
import { Row, Col, Button, DeleteIcon, TouchableHighlight } from "../../styles";

const DisplayMenuItem = (props) => {
  const { menuItem } = props;
  const fullImageUrl = formatImgurUrl(menuItem.imageUrl);

  const [showRemoveModal, setShowRemoveModal] = useState(false);

  return (
    <CardBody>
      <TouchableHighlight onClick={() => setShowRemoveModal(true)}>
        <DeleteIcon />
      </TouchableHighlight>
      <CardImg
        top
        width="100%"
        src={fullImageUrl}
        alt={`Image for ${menuItem.name}`}
      />
      <CardTitle>{menuItem.name}</CardTitle>
      <CardSubtitle>{menuItem.description}</CardSubtitle>
      <CardText>${parseFloat(menuItem.price).toFixed(2)}</CardText>
      <Row>
        {menuItem.modifications.map((mod) => (
          <MenuItemMod key={mod._id} mod={mod} />
        ))}
      </Row>
      <RemoveItemConfirmationModal
        {...{ showRemoveModal, setShowRemoveModal }}
        {...props}
      />
    </CardBody>
  );
};

const MenuItemMod = (props) => {
  const { mod } = props;
  return (
    <Col key={mod._id}>
      <Row>
        <Col>
          <Label for={mod.name}>{mod.name}</Label>
        </Col>
      </Row>
      <Row>
        {mod.options.map((option) => (
          <Col xs="6">
            {option.name} - {formatPriceFromFloatString(option.price)}
          </Col>
        ))}
      </Row>
    </Col>
  );
};

const RemoveItemConfirmationModal = (props) => {
  return (
    <Modal
      isOpen={props.showRemoveModal}
      toggle={() => props.setShowRemoveModal(false)}
    >
      <ModalHeader>Delete Item</ModalHeader>
      <ModalBody>
        <Row>
          <Col>Are you sure?</Col>
        </Row>
        <Row>
          <Col>
            <Button
              buttonText="Yes"
              color="secondary"
              onClick={() => props.removeMenuItem(props.menuItem._id)}
            />
            <Button
              buttonText="No"
              color="secondary"
              onClick={() => props.setShowRemoveModal(false)}
            />
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  removeMenuItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayMenuItem);
