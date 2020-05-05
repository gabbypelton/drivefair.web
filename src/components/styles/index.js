import React from "react";
import { Link as RRLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faPlus,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  Container as BSContainer,
  Modal as BSModal,
  ModalBody as BSModalBody,
  ModalHeader as BSModalHeader,
  ModalFooter as BSModalFooter,
  Input as BSInput,
  InputGroup as BSInputGroup,
  ButtonGroup as BSButtonGroup,
  Form as BSForm,
  FormGroup as BSFormGroup,
  Label as BSLabel,
  Card as BSCard,
  CardImg as BSCardImg,
  Button as BSButton,
  Row as BSRow,
  Col as BSCol,
  NavLink as BSNavLink,
  Spinner,
} from "reactstrap";

import { colors } from "../../constants/theme";

import styled from "styled-components";

export const Container = styled(BSContainer)`
  background: ${colors.white};
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
`;

export const Col = styled(BSCol)``;

export const Row = styled(BSRow)`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled(BSModal)``;

export const ModalHeader = styled(BSModalHeader)`
  background: ${colors.white};
`;

export const ModalBody = styled(BSModalBody)`
  background: ${colors.white};
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

export const ModalFooter = styled(BSModalFooter)`
  background: ${colors.white};
`;

export const Form = styled(BSForm)``;

export const SearchBarRow = styled(BSRow)`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

export const SearchForm = styled(BSForm)`
  margin: 2rem 0 4rem 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 50%;
`;

export const DataInputGroup = styled(BSInputGroup)`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

export const Input = styled(BSInput)``;

export const DataLabel = styled(BSLabel)``;

export const SearchInput = styled(BSInput)``;

export const InputGroup = styled(BSInputGroup)`
  width: 100%;
`;

export const ButtonGroup = styled(BSButtonGroup)`
  margin: 1rem 0 0 0;
`;

export const Label = styled(BSLabel)``;

export const ResultContainer = styled(Col)``;

export const Card = styled(BSCard)`
  margin-bottom: 1rem;
`;

export const CardImg = styled(BSCardImg)`
  max-height: 600px;
`;

export const Link = styled(RRLink)``;

export const ContentHeading = styled(BSRow)`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  text-align: center;
`;

export const AutoCompleteContainer = styled(Col)`
  border: solid 1px gray;
  background: white;
  position: absolute;
  z-index: 5;
  top: 3rem;
  width: 91.6%;
`;

export const AutoCompleteItem = styled.div`
  &:hover {
    cursor: pointer;
    background: #555;
  }
`;

export const InputErrorMessage = styled.small`
  minheight: 1rem;
  color: red;
`;

export const OptionLabel = styled(BSLabel)``;

export const OptionInput = styled(BSInput)``;

export const NavLink = styled(BSNavLink)`
  cursor: pointer;
`;
const ButtonBase = styled(BSButton)`
  background: ${(props) => colors[props.color]};
  width: ${(props) => (props.color === "link" ? "" : "20%")};
  min-width: 100px;
  margin: 1rem 2% 2rem 2%;
`;

export const SmallButton = styled(BSButton)`
  background: ${(props) => colors[props.color]};
  margin: 1rem 2% 2rem 2%;
`;

export const ModificationFormGroup = styled(BSFormGroup)`
  padding: 1rem 5%;
`;

export const MenuRow = styled(BSRow)`
  align-items: flex-start;
`;

export const ModificationInputGroup = styled(BSInputGroup)``;

export const TouchableHighlight = styled.div`
  text-align: center;
  &:hover {
    cursor: pointer;
    background-color: ${colors.black};
    color: ${colors.white};
  }
`;

export const ModificationSelect = styled(Col)`
  height: 5rem;
  overflow-y: scroll;
`;

export const ModificationOption = styled(Row)`
  justify-content: space-around;
  ${(props) =>
    props.selected
      ? `
        background-color: ${colors.black};
        color: ${colors.white};
      `
      : `
        background-color: ${colors.white};
        color: ${colors.black};
      `}
`;

export const EditOptionContainer = styled(BSRow)`
  padding: 0 0 0 0;
  margin: 0 0 0 0;
  height: 4rem;
  align-items: center;
  background-color: ${(props) =>
    props.selected ? colors.black : colors.white};
  &:hover {
    cursor: pointer;
  }
`;

export const ViewOptionsList = styled(BSRow)``;

export const ViewModificationsList = styled(BSRow)`
  align-items: flex-start;
`;

export const OrderList = styled(BSCol)``;

export const OrderListHeading = styled(BSRow)`
  justify-content: center;
  background: ${colors.primary};
  color: ${colors.white};
`;

export const OrderListBody = styled(BSRow)`
  justify-content: center;
`;

export const ViewOptionsItem = styled(BSCol)`
  ${(props) =>
    props.selected
      ? `
      background-color: ${colors.black};
      color: ${colors.white};
    `
      : `
      background-color: ${colors.white};
      color: ${colors.black};
    `}
`;

export const OrderContainer = styled(BSCol)`
  margin: 0 0 1rem;
`;

export const OrderHistoryContainer = styled(BSCol)`
  border: solid ${colors.black} 1px;
`;

export const OrderItemContainer = styled(BSCol)`
  margin: 1rem 0;
`

export const Button = (props) => {
  return (
    <ButtonBase {...props} disabled={props.isLoading}>
      {props.isLoading ? <Spinner /> : props.buttonText}
    </ButtonBase>
  );
};

export const DeleteIcon = (props) => <FontAwesomeIcon icon={faTimes} />;
