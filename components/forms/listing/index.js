import React from 'react';
import PropTypes from 'prop-types';

import Container from './container';

/*
 * TODO
 * - string 32 chars max
 */

class ListingForm extends React.Component {
  constructor() {
    super();

    this.refUniversity = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearFields = this.clearFields.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();

    const {
      onBeforeSubmit,
      onAfterSubmit,
      registryAddress,
      participants,
      submitApplication,
    } = this.props;

    const userAddress = participants.length ? participants[1].address : '';

    const formData = new FormData(e.target);
    const value = formData.get('university');

    await onBeforeSubmit();
    await submitApplication(registryAddress, value, userAddress, 100);
    await onAfterSubmit();
    this.clearFields();
  }

  clearFields() {
    this.refUniversity.current.value = '';
  }

  render() {
    return (
      <div>
        <h1>Enter the name of your university</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            ref={this.refUniversity}
            type="text"
            name="university"
          />

          <button type="submit">
            Add
          </button>
        </form>
      </div>
    );
  }
}

ListingForm.propTypes = {
  onBeforeSubmit: PropTypes.func,
  onAfterSubmit: PropTypes.func,
  registryAddress: PropTypes.string,
  participants: PropTypes.arrayOf(PropTypes.object),
  submitApplication: PropTypes.func,
};

ListingForm.defaultProps = {
  onBeforeSubmit: () => {},
  onAfterSubmit: () => {},
  registryAddress: '',
  participants: [],
  submitApplication: () => {},
};

export default Container(ListingForm);

