function signIn(){
	var email = loginForm["email"].value;
	var password = loginForm["pass"].value;
	var user = firebase.auth().currentUser;
	if (user) {
  		alert(user);
	} else {
		// No user is signed in.
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		if (errorCode === 'auth/wrong-password') {
			alert('Wrong password.');
		} else {
			alert(errorMessage);         
		}
			console.log(error);
		});	
	}
}

