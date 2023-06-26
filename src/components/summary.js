import React, { Component } from "react";
import "../styles/summary.css";

class Summary extends Component {
  constructor(props) {
    super();
    this.textToEdit = "";
    this.state = {
      mode: 1,
    };
    this.editMode = this.editMode.bind(this);
    this.editOnclick = this.editOnclick.bind(this);
    this.changeToEditMode = this.changeToEditMode.bind(this);
    this.changeToNormalMode = this.changeToNormalMode.bind(this);
    this.getInputValues = this.getInputValues.bind(this);
  }
  editMode() {
    this.setState({
      mode: this.state.mode === 1 ? 2 : 1,
    });
  }
  editOnclick() {
    if (this.state.mode === 1) {
      return (
        <SummaryComponent
          changeToEditMode={this.changeToEditMode}
          summaryText={
            this.textToEdit !== ""
              ? this.textToEdit
              : "Click Edit to add Summary"
          }
        />
      );
    } else {
      return (
        <SummaryEditComponent
          onClick={this.changeToNormalMode}
          editedText={this.getInputValues}
          changeToNormalMode={this.changeToNormalMode}
          textToEdit={this.textToEdit}
        />
      );
    }
  }
  getInputValues(val) {
    this.textToEdit = val;
  }
  async changeToEditMode() {
    this.editMode();
  }
  changeToNormalMode() {
    this.editMode();
  }

  render() {
    return <div className="summary">{this.editOnclick()}</div>;
  }
}
class SummaryComponent extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className="summary">
        <div className="summaryContainer">
          <h2>Summary</h2>
          <button className="editButton" onClick={this.props.changeToEditMode}>
            Edit
          </button>
        </div>
        <p>{this.props.summaryText}</p>
      </div>
    );
  }
}
class SummaryEditComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      textChange: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      textChange: event.target.value,
    });
  }
  render() {
    return (
      <div className="summary">
        <div className="summaryContainer">
          <h2>Summary</h2>
          <button className="editButton" onClick={this.props.onClick}>
            Edit
          </button>
        </div>

        <form>
          <label htmlFor="text"></label>
          <textarea
            name="text"
            id="text"
            onChange={this.handleChange}
            defaultValue={
              this.props.textToEdit !== ""
                ? this.props.textToEdit
                : "Click Edit to add Summary"
            }
          ></textarea>
          <div className="editSummaryButtons">
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                this.props.editedText(this.state.textChange);
                this.props.changeToNormalMode();
              }}
            >
              Submit
            </button>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                this.props.changeToNormalMode();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Summary;
