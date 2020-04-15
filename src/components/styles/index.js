import React from "react";
import { Link as RRLink } from "react-router-dom";
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

export const Form = styled(BSForm)`
  width: 50%;
`;

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

export const OptionContainer = styled(BSCol)`
  display: flex;
`;

export const OptionLabel = styled(BSLabel)``;

export const OptionInput = styled(BSInput)``;
export const NavLink = styled(BSNavLink)`
  cursor: pointer;
`;
const ButtonBase = styled(BSButton)`
  background: ${(props) => colors[props.color]};
  width: ${props => props.color === "link" ? "" : "20%"};
  min-width: 100px;
  margin: 1rem 2% 0 2%;
`;

export const Button = (props) => {
  return (
    <ButtonBase {...props} disabled={props.isLoading}>
      {props.isLoading ? <Spinner /> : props.buttonText}
    </ButtonBase>
  );
};
