$(document).ready(function(){

    var heading = document.createElement("h1");
    heading.innerHTML = 'Electronic Life Hacks';
    $('#tutorial_table_heading').append(heading);
    

    var rootRef = firebase.database().ref('Images/Electronic Life Hacks/');
    rootRef.on("child_added", snap =>{
        var display_pic = snap.child("url").val();
        var step_title = snap.child("title").val();
        var step_explanation = snap.child("explanation").val();

        //console.log("url: " + display_pic);
        //console.log("Title: " + step_title);
        //console.log("explain: " + step_explanation);

        var elem = document.createElement("img");
        elem.src = display_pic;

        $("#table_body").append(elem);
        $("#table_body").append("<tr><td id='title_td'>"+step_title+"<td></tr>");
        $("#table_body").append("<tr><td id='explanation_td'>"+step_explanation+"</td></tr>");
        $("#table_body").append("<hr></hr>");
        });
});
