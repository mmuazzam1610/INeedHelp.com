var myTopic = localStorage.topic;

$(document).ready(function(){

    var heading = document.createElement("h1");
    heading.innerHTML = myTopic;
    $('#tutorial_table_heading').append(heading);
    

    var rootRef = firebase.database().ref('Images/'+myTopic+'/')

    var myName;

    rootRef.limitToFirst(1).once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var user = (childSnapshot.child("user").val());
        firebase.database().ref('users/'+user+'/').once('value', function(snapshot) {
            var author = document.createElement("h4");
             myName = snapshot.child("username").val();
             author.innerHTML = "by: "+ myName;
            $('#tutorial_table_heading').append(author);
             return null;
         })
        
            return null;
        })
        return null;
    });

    rootRef.on("child_added", snap =>{
        if(snap.hasChild("url")){
            var display_pic = snap.child("url").val();
            var step_title = snap.child("title").val();
            var step_explanation = snap.child("explanation").val();

            console.log("url: " + display_pic);
            console.log("Title: " + step_title);
            console.log("explain: " + step_explanation);

            var elem = document.createElement("img");
            elem.src = display_pic;

            $("#table_body").append(elem);
            $("#table_body").append("<tr><td id='title_td'>"+step_title+"<td></tr>");
            $("#table_body").append("<tr><td id='explanation_td'>"+step_explanation+"</td></tr>");
            $("#table_body").append("<hr></hr>");
        }
    });
});
