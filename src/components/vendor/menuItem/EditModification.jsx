import React, { Component } from "react";
import { connect } from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";

import {
  Button,
  Col,
  Row,
  Label,
  Input,
  ModificationFormGroup,
  ModificationInputGroup,
} from "../../styles";

import { colors } from "../../../constants/theme";

const EditModification = (props) => {
  const { mod, modIndex, handleModificationChange } = props;

  const handleOptionChange = (optionIndex, name, value) => {
    const options = [...mod.options];
    const updatedOption = { ...options[optionIndex] };
    updatedOption[name] = value;
    options.splice(optionIndex, 1, updatedOption);
    handleModificationChange(modIndex, "options", options);
  };

  const addOption = () => {
    const modOptions = [...mod.options, { name: "", price: "" }];
    handleModificationChange(modIndex, "options", modOptions);
  };

  return (
    <ModificationFormGroup>
      <Row>
        <ModificationInputGroup>
          <Label to="name">Name</Label>
          <Input
            name="name"
            value={mod.name}
            onChange={(e) =>
              handleModificationChange(modIndex, e.target.name, e.target.value)
            }
          />
        </ModificationInputGroup>
      </Row>
      <Row>
        <Button
          color="primary"
          active={mod.type === "single"}
          buttonText="Single"
          onClick={(e) =>
            handleModificationChange(modIndex, "type", "single", e)
          }
        />
        <Button
          color="primary"
          active={mod.type === "multiple"}
          buttonText="Multiple"
          onClick={(e) =>
            handleModificationChange(modIndex, "type", "multiple", e)
          }
        />
      </Row>
      <Row>
        {mod.options.map((option, optionIndex) => {
          return (
            <Row>
              <Col>
                <ModificationInputGroup>
                  <Label to="name">Name</Label>
                  <Input
                    name="name"
                    value={option.name}
                    onChange={(e) =>
                      handleOptionChange(
                        optionIndex,
                        e.target.name,
                        e.target.value
                      )
                    }
                  />
                </ModificationInputGroup>
              </Col>
              <Col>
                <ModificationInputGroup>
                  <Label to="price">Price</Label>
                  <Input
                    name="price"
                    value={option.price}
                    onChange={(e) =>
                      handleOptionChange(
                        optionIndex,
                        e.target.name,
                        e.target.value
                      )
                    }
                  />
                </ModificationInputGroup>
              </Col>
            </Row>
          );
        })}
        <Row>
          <Col>
            <FontAwesomeIcon
              icon={faPlusCircle}
              color={colors.primary}
              onClick={() => addOption()}
            />
          </Col>
        </Row>
      </Row>
    </ModificationFormGroup>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EditModification);
