var myTopic = localStorage.topic;

function toggleStar() {
    alert("function called");
  }

$(document).ready(function(){

    var testTitle="Coffee Break Challenge";

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

            // if((snap.child("like").val())=="liked"){
            //     $(".options-wrapper").append("<div class='options-holder left' id='star'><button class='fa fa-thumbs-up'></button></div>");
            // }else
            // {
            //     $(".options-wrapper").append("<div class='options-holder left'  id='star'><button class='fa fa-thumbs-o-up'></button></div>");
            // }

            if((snap.child("star").val())=="starred"){
                $(".options-wrapper").append("<div class='options-holder left'><button class='fa fa-star'></button></div>");
            }else
            {
                $(".options-wrapper").append("<div class='options-holder left'><button class='fa fa-star-o onclick()='javascript:toggleStar()''></button></div>");
            }
            return;
        }
       
        });
});