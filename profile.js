
var curr_user;

	/*document.getElementById("profile_photo").addEventListener('change', handleFileSelect, false);
	function handleFileSelect(event) {
		var selectedFile = event.target.files[0];
		//$("#submit_video_btn").show();
		uploadPhoto(selectedFile);
	}*/
	curr_user = localStorage.user;
firebase.database().ref("users/"+curr_user.uid+"/Interests/").once('value', function (snapshot) {
	snapshot.forEach(function (child) {
		console.log(child.val());
		var container = document.getElementsByClassName("topics-follow")[0];
		var element = document.createElement('div');
		element.setAttribute('class', 'holder');
		var img = document.createElement('img');
		firebase.database().ref("Interests/").once('value', function (snapshot1) {
			snapshot1.forEach('value', function(children) {
				console.log(children.child("name").val());
				console.log(child.val());
				if (children.child("name").val() == child.val()){
					img.setAttribute('src', children.child("url").val());
					return true;
				}
			});
		});
		element.appendChild(img);
		var content = document.createElement('h6');
		content.setAttribute('id', 'holder-text');
		content.innerHTML = child.val();
		element.appendChild(content);
		container.appendChild(element);
	});
});


	firebase.database().ref('users/'+curr_user.uid).once('value', function(snapshot){
		document.getElementsByClassName("name")[0].innerHTML = snapshot.child("username").val();
		document.getElementsByClassName("email")[0].innerHTML = snapshot.child("email").val();
		console.log(snapshot.child("username").val());
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