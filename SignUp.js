function signUp(){
	var name = signupForm["name"].value;
	var email = signupForm["email"].value;
	var password = signupForm["pass"].value;
	firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
   		writeUserData(firebase.auth().currentUser.uid, name, email);
	}).catch(function(error) {
    	var errorCode = error.code;
    	var errorMessage = error.message;
        alert(errorMessage);
    	console.log(error);
	});

}

function writeUserData(userId, name, email) {
	firebase.database().ref('users/' + userId).set({
    	username: name,
    	email: email
  	}, function(error){
		if (error){
			alert(error);
		}
		else{
			window.location= "categories.htm";
		}
	});
}