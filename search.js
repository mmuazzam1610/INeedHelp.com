//called for setting global variable
function myFunc(key){
  localStorage.topic = key;
  window.location = "DisplayPageTutorials.htm";
}

//called on keyUp
function predict(){
	var list = document.getElementById("tutorials");
	var text = document.getElementById("searchbar").value.toLowerCase();
	if (text.length > 3){

        //looks through images node in database
		firebase.database().ref('/Images/').once('value').then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				var pos = childSnapshot.key.toLowerCase().search(text);
				if (pos !== -1){
					var i;
					var contains;
					for (i = 0; i < list.options.length; i++){
						if (list.options[i].value == childSnapshot.key){
							contains = true;
						}
					}
					if (!contains){
						var option = document.createElement('option');
						option.value = childSnapshot.key;
						list.appendChild(option);
					}
				}
			});
        });
        
        //looks through images node in database
		firebase.database().ref('/Videos/').once('value').then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				var pos = childSnapshot.child("title").val().toLowerCase().search(text);
				if (pos !== -1){
					var i;
					var contains;
					for (i = 0; i < list.options.length; i++){
						if (list.options[i].value == childSnapshot.child("title").val()){
							contains = true;
						}
					}
					if (!contains){
						var option = document.createElement('option');
						option.value = childSnapshot.child("title").val();
						list.appendChild(option);
					}
				}
			});
		});
	}
}

// called on buttonclicked
function search(){
	var url;
	var resultDiv = document.getElementsByClassName("results");
	var text = document.getElementById("searchbar").value;
	firebase.database().ref('/Images/').once('value').then(function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var pos = childSnapshot.key.search(text);
			if (pos !== -1){
				firebase.database().ref('/Images/'+childSnapshot.key+'/').once('value').then(function(snapshot1){
					snapshot1.forEach(function (childSnapshot1) {
						url = childSnapshot1.child("url").val();
						return true;
					});
					//console.log(childSnapshot.key);
					var div = document.createElement('div');
					div.setAttribute('id', 'aResult');
					var link = document.createElement('a');
					link.setAttribute('href', "javascript:myFunc('"+childSnapshot.key+"')");
					div.appendChild(link);
					var img = document.createElement('img');
					img.setAttribute('src', url);
					link.appendChild(img);
					var title = document.createElement('div');
					title.setAttribute('id', 'title');
					title.innerHTML = childSnapshot.key;
					link.appendChild(title);
					if (resultDiv[0].childElementCount == 0){
						resultDiv[0].appendChild(div);
					}
					else{
						resultDiv[0].replaceChild(div, resultDiv[0].children[0]);
					}
				});
				return true;
			}
		});
	});
	firebase.database().ref('/Videos/').once('value').then(function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var pos = childSnapshot.child("title").val().search(text);
			if (pos !== -1){
				var div = document.createElement('div');
				div.setAttribute('id', 'aResult');
				var link = document.createElement('a');
				link.setAttribute('href', "javascript:myFunc('"+childSnapshot.child("title").val()+"')");
				div.appendChild(link);
				var vid = document.createElement('video');
				vid.setAttribute('src', childSnapshot.child('url').val());
				link.appendChild(vid);
				var title = document.createElement('div');
				title.setAttribute('id', 'title');
				title.innerHTML = childSnapshot.child("title").val();
				link.appendChild(title);
				if (resultDiv[0].childElementCount == 0){
						resultDiv[0].appendChild(div);
				}
				else{
					resultDiv[0].replaceChild(div, resultDiv[0].children[0]);
				}
			}
		});
	});
}