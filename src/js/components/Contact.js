var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var Contact = React.createClass({
	render: function(){
		return(
			<tr>
        <td>{this.props.contact.name}</td>
        <td>{this.props.contact.phone}</td>
        <td>{this.props.contact.email}</td>
        <td><a href="#" className="btn btn-success" onClick={this.handleEdit.bind(this, this.props.contact)}>Edit</a></td>
        <td><a href="#" className="btn btn-danger" onClick={this.handleDelete.bind(this,this.props.contact.id)}>Delete</a></td>
			</tr>
		);
	},
  handleDelete: function(id,j) {
    AppActions.removeContact(id);
  },
  handleEdit: function(contact, j) {
    AppActions.editContact(contact);
  }
});

module.exports = Contact;
