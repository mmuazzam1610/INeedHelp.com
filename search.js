function predict(){
	var list = document.getElementById("tutorials");
	var text = document.getElementById("searchbar").value;
	if (text.length > 3){
		firebase.database().ref('/Images/').once('value').then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				var pos = childSnapshot.key.search(text);
				if (pos !== -1){
					console.log(childSnapshot.key.substr(pos));
					var option = document.createElement('option');
					option.value = childSnapshot.key.substr(pos);
					list.appendChild(option);
				}
			});
		});
	}
}

function search(){
	var text = document.getElementById("searchbar").value;
	firebase.database().ref('/Images/').once('value').then(function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var pos = childSnapshot.key.search(text);
			if (pos !== -1){
				console.log(childSnapshot.key.substr(pos));
				var div = document.createElement('div');
				div.setAttribute('id', 'aResult');
				var img = document.createElement('img');
				img.setAttribute('src', childSnapshot.child('url').val);
				div.appendChild(img);
				var title = document.createElement('div');
				title.setAttribute('id', 'title');
				title.innerHTML = childSnapshot.key.substr(pos);
				div.appendChild(title);
			}
		});
	});
}