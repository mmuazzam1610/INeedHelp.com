var myTopic;
localStorage.topic;

function myFunc(t) {
  localStorage.topic = t;
  window.location = "DisplayPageTutorials.htm";
}

$(document).ready(function(){
    
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDYoo_UoBiAtUUEiOzIADcpX6T0P3kyKPk",
    authDomain: "ineedhelp-5b43b.firebaseapp.com",
    databaseURL: "https://ineedhelp-5b43b.firebaseio.com",
    projectId: "ineedhelp-5b43b",
    storageBucket: "ineedhelp-5b43b.appspot.com",
    messagingSenderId: "847527345531"
  };
  firebase.initializeApp(config);

  var recentWebsitePostsRef = firebase.database().ref('Images/').limitToFirst(3);
    recentWebsitePostsRef.once('value', function(snapshot) {
      var myURL;
      var childKey;
      snapshot.forEach(function(childSnapshot) {
        childKey = childSnapshot.key;
        var test = childSnapshot.val();

        console.log(childKey);
        
        for (i in test) {
            myURL=(test[i]['url']);
            console.log(myURL);
            break;
        }
        var elem = myURL;
      $("#recent_tutorials").append("<a id='myHref' href='javascript:myFunc(\""+childKey+"\")'><div class='element'><img src='"+elem+"'><div class='content'>"+childKey+"</div></div></a>");
      });
	/*$("#myHref").on("click", function() {
		  alert(childKey);
		  myFunc(childKey);
	  });*/
  }); 
  

  var topWebsitePostsRef = firebase.database().ref().child('Images/').orderByChild('accessed').limitToLast(3);
    topWebsitePostsRef.once('value', function(snapshot) {
      var myURL;
      var childKey; 
      snapshot.forEach(function(childSnapshot) {
        childKey = childSnapshot.key;
        var test = childSnapshot.val();
        
        for (i in test) {
            myURL=(test[i]['url']);
            break;
        }
        var elem = myURL;

      $("#top_tutorials").append("<div class='element'><img src='"+elem+"'><div class='content'>"+childKey+"</div></div>");
      });
    }); 

    
 });