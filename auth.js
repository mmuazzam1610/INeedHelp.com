
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
  	});
	alert(userId);
}

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



let selectedFile;

$(document).ready(function(){
    $("#submit_video_btn").hide();

    document.getElementById("inputvideo_tag").addEventListener('change', handleFileSelect, false);
    function handleFileSelect(event) {
        selectedFile = event.target.files[0];
        $("#submit_video_btn").show();
    };
});

function confirmUpload() {
    var metadata = {
         contentType: 'video'
     };
    var uploadTask = firebase.storage().ref().child('videos/' + selectedFile.name).put(selectedFile, metadata);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function(snapshot){
        console.log(snapshot);
          // Observe state change events such as progress, pause, and resume
          // See below for more detail
    }, function(error) {
          console.log(error);
          alert("An error occured.");
    }, function() {
          // Handle successful uploads on complete
		  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
		var postKey = firebase.database.ref('Videos/').push().key;
		var downloadURL = uploadTask.snapshot.downloadURL;
		var updates = {};
		var postData= {
			url: downloadURL
		}
		updates[/'Videos/' + postKey]
		firebase.database().ref('Videos/' + postKey).set({
			username: name,
			email: email
		  });
         console.log(downloadURL);

    });
}