function signup(){
	var email = myForm["email"].value;
	var pass = myForm["pass"].value;
	firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
}