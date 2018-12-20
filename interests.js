firebase.database().ref("/Interests/").once('value', function (snapshot) {
	snapshot.forEach(function (child) {
		var container = document.getElementsByClassName("cat-container")[0];
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

function confirm(){
	var actives = document.getElementsByClassName('active');
	var interests = [];
	var i;
	for (i = 0; i < actives.length; i++){
		interests.push(actives[i].childNodes[1].innerHTML);
		console.log(actives[i].childNodes[1].innerHTML);
	}
	console.log(firebase.auth().currentUser.uid);
	firebase.database().ref('users/'+firebase.auth().currentUser.uid).update({
		Interests: 	interests
	}, function(error){
		if (error){
			alert(error);
		}
		else{
			window.location= "index.html";
		}
	});
}