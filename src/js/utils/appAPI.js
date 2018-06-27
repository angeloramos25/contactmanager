var AppActions = require('../actions/AppActions');
var Firebase = require('firebase');


module.exports = {
  saveContact: function(contact) {
    const db = Firebase.database().ref().child('Contacts');
    db.push({
      contact: contact
    });
  },
	getContacts: function() {
    const db = Firebase.database().ref().child('Contacts');
		db.once("value", function(snapshot) {
			var contacts = [];
			snapshot.forEach(function(contact) {
				const contactObj = {
					id: contact.key,
					name: contact.val().contact.name,
					phone: contact.val().contact.phone,
					email: contact.val().contact.email
				}
				contacts.push(contactObj);
				AppActions.receiveContacts(contacts);
			});
		});
	},
  removeContact: function(contactId) {
    const db = Firebase.database().ref().child('Contacts');
    db.child(contactId).remove();
  }
}
