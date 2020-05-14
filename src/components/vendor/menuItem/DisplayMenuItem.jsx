import React, { useState } from "react";
import { connect } from "react-redux";
import { Label, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { removeMenuItem } from "../../../actions/menu";
import {
  formatPriceFromFloatString,
  formatImgurUrl,
} from "../../../services/formatting";
import {
  ModalHeader,
  ModalBody,
  Modal,
  CardImg,
  Row,
  Col,
  Button,
  DeleteIcon,
  TouchableHighlight,
  ViewOptionsList,
  ViewOptionsItem,
  ViewModificationsList,
} from "../../styles";

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
      <ViewModificationsList>
        {menuItem.modifications.map((mod) => (
          <MenuItemMod key={mod._id} mod={mod} />
        ))}
      </ViewModificationsList>
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
    <Col xs="6">
      <Row>
        <Col>{mod.name}</Col>
      </Row>
      <ViewOptionsList>
        {mod.options.map((option, optionIndex) => (
          <ViewOptionsItem
            xs="12"
            selected={optionIndex === mod.defaultOptionIndex}
          >
            {option.name} - {formatPriceFromFloatString(option.price)}
          </ViewOptionsItem>
        ))}
      </ViewOptionsList>
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
              title="Yes"
              onClick={() => props.removeMenuItem(props.menuItem._id)}
            />
            <Button
              title="No"
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
