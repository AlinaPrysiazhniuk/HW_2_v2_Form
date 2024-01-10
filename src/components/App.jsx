import React, { Component } from 'react';
import { Form } from './Form';
import { List } from './List';
import { nanoid } from 'nanoid';
import { Filter } from './Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.state.contacts.some(
      i =>
        (i.name.toLowerCase() === contact.name.toLowerCase() &&
          i.number === contact.number) ||
        i.number === contact.number
    )
      ? alert(`${name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [contact, ...contacts],
        }));
  };

  findContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilterInput = event => {
    this.setState({ filter: event.target.value });
  };

  render() {
    const { filter } = this.state;
    return (
      <>
        <Form onSubmit={this.formSubmitHandler} />
        <Filter filter={filter} changeFilterInput={this.changeFilterInput} />
        <List
          contacts={this.findContacts()}
          deleteContact={this.deleteContact}
        />
      </>
    );
  }
}
//після відправки форми дані повинні заноситися до списку контактів і
// і в список на екрані додається новий контакт
