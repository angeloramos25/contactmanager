var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var AddForm = require('./AppForm.js');
var ContactList = require('./ContactList.js');
var Firebase = require('firebase');

// Initialize Firebase
var config = {
	apiKey: "AIzaSyBDX7OV64LqF4qipJ4FuKJWYpBIInscKfs",
	authDomain: "contactlist-557d9.firebaseapp.com",
	databaseURL: "https://contactlist-557d9.firebaseio.com",
	projectId: "contactlist-557d9",
	storageBucket: "contactlist-557d9.appspot.com",
	messagingSenderId: "586360404394"
};
Firebase.initializeApp(config);

function getAppState(){
	return {
		contacts: AppStore.getContacts()
	}
}

var App = React.createClass({
	getInitialState: function(){
		return getAppState();
	},

	componentDidMount: function(){
		AppStore.addChangeListener(this._onChange);
	},

	componentUnmount: function(){
		AppStore.removeChangeListener(this._onChange);
	},

	render: function(){
		return(
			<div>
				<AddForm />
				<ContactList contacts={this.state.contacts} />
			</div>
		);
	},

	// Update view state when change is received
	_onChange: function(){
		this.setState(getAppState());
	}
});

module.exports = App;
