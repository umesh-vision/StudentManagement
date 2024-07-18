import React, { Component } from "react";

interface IProps {
  fieldName: string;
  fieldType: string;
  value: any;
  function?: (value: any) => boolean;
  showValidation: boolean;
}

interface IState {
  errorMessage: string;
  isValidate: boolean;
}

class Validation extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      errorMessage: "",
      isValidate: true,
    };
  }

  componentDidUpdate(prevProps: IProps) {
    if (
      prevProps.value !== this.props.value ||
      prevProps.showValidation !== this.props.showValidation
    ) {
      this.validate();
    }
  }

  validate() {
    let errorMessage = "";
    if (
      this.props.showValidation &&
      this.props.fieldType === "string" &&
      (!this.props.value || this.props.value.trim() === "")
    ) {
      errorMessage = this.props.fieldName + " is required";
      this.setState({ isValidate: false });
    } else if (this.props.showValidation && this.props.fieldType === "number") {
      if (!this.props.value) {
        errorMessage = this.props.fieldName + " is required";
        this.setState({ isValidate: false });
      } else if (this.props.value <= 0) {
        errorMessage = this.props.fieldName + " must be greater than 0";
        this.setState({ isValidate: false });
      }
    }

    if (
      !errorMessage &&
      this.props.showValidation &&
      this.props.function &&
      typeof this.props.function === "function"
    ) {
      const isValid = this.props.function(this.props.value);
      if (!isValid) {
        errorMessage = `${this.props.fieldName} is invalid`;
      }
    }

    this.setState({ errorMessage: errorMessage });
  }

  render() {
    return (
      <div>
        {this.state.errorMessage && (
          <span className="text-danger">{this.state.errorMessage}</span>
        )}
      </div>
    );
  }
}

export default Validation;
