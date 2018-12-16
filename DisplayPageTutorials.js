var display_pic;
var step_title;
var step_explanation;

$(document).ready(function(){
    
    display_pic = document.getElementById("display_pic");
    step_title = document.getElementById("step_title");
    step_explanation = document.getElementById("step_explanation");

    // $("#submit_video_btn").hide();

    // document.getElementById("inputvideo_tag").addEventListener('change', handleFileSelect, false);
    // function handleFileSelect(event) {
    //     selectedFile = event.target.files[0];
    //     $("#submit_video_btn").show();
    // };
});

var firbasetitle = firebase.database().ref('Images/').child()