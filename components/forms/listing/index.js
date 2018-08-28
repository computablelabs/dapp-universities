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

    this.refName = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearFields = this.clearFields.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();

    const {
      onBeforeSubmit,
      onAfterSubmit,
      participants,
      submitApplication,
    } = this.props;

    const userAddress = participants.length ? participants[1].address : '';

    const formData = new FormData(e.target);
    const name = formData.get('name');

    await onBeforeSubmit();
    await submitApplication({
      listing: name,
      userAddress,
      deposit: 100,
      data: 'misc data',
    });
    await onAfterSubmit();
    this.clearFields();
  }

  clearFields() {
    this.refName.current.value = '';
  }

  render() {
    return (
      <div>
        <style jsx>
          {`
            form {
              display: inline-block;
            }

            .input-container {
              display: flex;
              flex-direction: row;
              margin-bottom: 6px;
            }

            .input-container > div:not(:last-child) {
              margin-right: 12px;
            }

            .cta-container {
              display: flex;
              flex-direction: row;
              justify-content: flex-end;
            }
          `}
        </style>

        <h1>Enter the name of your university</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="input-container">
            <div>
              <label htmlFor="name">
                <div>University Name</div>
                <input
                  ref={this.refName}
                  type="text"
                  id="name"
                  name="name"
                />
              </label>
            </div>

          <div className="cta-container">
            <button type="submit">
              Submit Listing
            </button>
          </div>
        </form>
      </div>
    );
  }
}

ListingForm.propTypes = {
  onBeforeSubmit: PropTypes.func,
  onAfterSubmit: PropTypes.func,
  participants: PropTypes.arrayOf(PropTypes.object),
  submitApplication: PropTypes.func,
};

ListingForm.defaultProps = {
  onBeforeSubmit: () => {},
  onAfterSubmit: () => {},
  participants: [],
  submitApplication: () => {},
};

export default Container(ListingForm);

