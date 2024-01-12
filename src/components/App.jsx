import React, { Component } from 'react';
import { Form } from './Form';
import { List } from './List';
import { nanoid } from 'nanoid';
import { Filter } from './Filter';

export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '', //відповідє за інпут фільтрації
  };

  formSubmitHandler = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    //при додаванні нового контакту робимо перевірку на наявність номеру в
    // телефонній книзі
    this.state.contacts.some(
      i =>
        (i.name.toLowerCase() === contact.name.toLowerCase() &&
          i.number === contact.number) ||
        i.number === contact.number
    )
      ? alert(`${name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          //якщо такий контакт відсутній то в існуючий список додоаємо новий контакт
          //а поверх нього розпилюємо список уже існуючих контактів
          contacts: [contact, ...contacts],
        }));
  };

  //пошук контакту в списку
  findContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  //видалення контакту
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  //додаємо в інпут фільтру значення для пошуку контакту в няваному списку контактів
  changeFilterInput = event => {
    this.setState({ filter: event.target.value });
  };

  componentDidMount() {
    //викликається один раз коли компонет змонутвався
    console.log('app mount');

    const contactsList = localStorage.getItem('contacts');
    const parsecontactsList = JSON.parse(contactsList);

    if (parsecontactsList) {
      // console.log(parsecontactsList);
      this.setState({ contacts: parsecontactsList });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //викликається кожного разу коли змінються пропси чи стейт
    console.log('app update');

    if (this.state.contacts !== prevState.contacts) {
      console.log('Update contacts');

      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }

    console.log(prevState); // стейт до оновлення компонента
    console.log(this.state); //актуальний стейт після оновлення
  }

  //в методі рендер та componentDidUpdate не можна виклаликати метод setState тому що
  // зациклиться компонент!!!
  // його можна викликати лише при перевірці певної умови (наприклад на http запит)

  render() {
    console.log('render');
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
