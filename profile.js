$(document).ready(function(){
	document.getElementById("profile_photo").addEventListener('change', handleFileSelect, false);
	function handleFileSelect(event) {
		var selectedFile = event.target.files[0];
		//$("#submit_video_btn").show();
		uploadPhoto(selectedFile);
	}
});

var curr_user = firebase.auth().currentUser.uid;
firebase.database().ref('users/'+curr_user).once('value', function(snapshot){
	document.getElementsByClassName("name")[0].innerHTML = snapshot.child("username").val();
	document.getElementsByClassName("email")[0].innerHTML = snapshot.child("email").val();
});


firebase.database().ref('users/'+curr_user).once('value', function (snapshot) {
	snapshot.forEach(function (child) {
		var container = document.getElementsByClassName("topics-follow")[0];
		var element = document.createElement('div');
		element.setAttribute('class', 'element');
		element.addEventListener("click", function (){
			element.classList.toggle("active");
		});
		var img = document.createElement('img');
		img.setAttribute('src', 'images/hike.jpg');
		element.appendChild(img);
		var content = document.createElement('div');
		content.setAttribute('class', 'content');
		content.innerHTML = child.val();
		element.appendChild(content);
		container.appendChild(element);
	});
});


	function uploadPhoto(file){
		var metadata = {
				 contentType: 'image'
		};

		var uploadTask = firebase.storage().ref().child('tutorial_images/' + file.name).put(file, metadata);
		// Register three observers:
		// 1. 'state_changed' observer, called any time the state changes
		// 2. Error observer, called on failure
		// 3. Completion observer, called on successful completion

		uploadTask.on('state_changed', function(snapshot){
				console.log(snapshot);
				//console.log(snapshot);
				// Observe state change events such as progress, pause, and resume
				// See below for more detail
			}, function(error) {
				console.log(error);
				alert("An error occured.");
			}, function() {
				curr_user = firebase.auth().currentUser.uid;
				uploadTask.snapshot.ref.getDownloadURL().then(function (downloadUrl){
					firebase.database().ref("users/" + curr_user).update({
						photoUrl : downloadUrl
					}, function(error){
					if (error){
						alert(error);
					}
					else{
						document.getElementById('profile_photo').setAttribute('src', downloadUrl);
					}
				});
			});
		});
	}