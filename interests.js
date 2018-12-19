firebase.database().ref("/Interests/").once('value', function (snapshot) {
	snapshot.forEach(function (child) {
		var container = document.getElementsByClassName("cat-container")[0];
		var element = document.createElement('div');
		element.setAttribute('class', 'element');
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