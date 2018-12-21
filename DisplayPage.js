var myTopic = localStorage.topic;

$(document).ready(function(){

    var testTitle=myTopic;

    var heading = document.createElement("h1");
    heading.innerHTML = testTitle;
    $('#video-holder').append(heading);

    var rootRef = firebase.database().ref('Videos/');
    rootRef.on("child_added", snap =>{
        var video_title = snap.child("title").val();
        if(video_title==testTitle){
            var video_url = snap.child("url").val();
    
            console.log("url: " + video_url);
            console.log("Title: " + video_title);
    
            $("#video-holder").append("<video controls><source src="+video_url+" type='video/mp4'></source></video>");

            return;
        }
       
        });
});