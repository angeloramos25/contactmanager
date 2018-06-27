var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppAPI = require('../utils/AppAPI.js');

var CHANGE_EVENT = 'change';

var _contacts = [];

var AppStore = assign({}, EventEmitter.prototype, {
  saveContact: function(contact) {
    _contacts.push(contact);
  },
  getContacts: function() {
    return _contacts;
  },
  setContacts: function(contacts) {
    _contacts = contacts;
  },
  removeContact: function(contactId) {
    const index = _contacts.findIndex(contact => contact.id === contactId);
    _contacts.splice(index, 1);
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on('change', callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.actionType) {
    case AppConstants.SAVE_CONTACT:
      console.log('Save contact');

      //Save to Store
      AppStore.saveContact(action.contact);

      //Save to Firebase
      AppAPI.saveContact(action.contact);

      AppStore.emitChange();
      break;
    case AppConstants.RECEIVE_CONTACTS:
      console.log('Receiving contact');

      AppStore.setContacts(action.contacts);

      AppStore.emitChange();
      break;
    case AppConstants.REMOVE_CONTACT:
      console.log('Removing contact');

      //Remove from Store
      AppStore.removeContact(action.contactId);

      //Remove from Firebase
      AppAPI.removeContact(action.contactId);

      AppStore.emitChange();
      break;

  }

  return true;
});

module.exports = AppStore;
