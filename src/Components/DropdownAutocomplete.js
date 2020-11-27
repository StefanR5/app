import React, { Component } from "react";

class DropdownAutocomplete extends Component {
  render() {
    const { input } = this.props;

    return (
      <div>
        <div>
          <div className="item">
            <select className="ui search dropdown" {...input}>
              <option value={null} />
              {this.props.list &&
                this.props.list.map((i) => {
                  return (
                    <option key={i.key} value={i.value}>
                      {i.text}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default DropdownAutocomplete;
