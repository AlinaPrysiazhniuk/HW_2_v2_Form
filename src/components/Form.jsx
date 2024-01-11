import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  //запис у локальний стейт даних, що вводять в інпути
  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state); //передача через пропс при відправці форми локального стейту з даними
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              placeholder="Name"
              pattern="^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$"
              required
            />
          </label>
          <label>
            Contact
            <input
              type="tel"
              name="number"
              value={number}
              onChange={this.handleChange}
              placeholder="Number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              required
            />
          </label>
          <button type="submit">Add contact</button>
        </form>
      </div>
    );
  }
}

Form.prototypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
//при відправці форми потрібно додавати контакт в масив контактів
