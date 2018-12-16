$(document).ready(function(){
    
    // display_pic = document.getElementById("display_pic");
    // step_title = document.getElementById("step_title");
    // step_explanation = document.getElementById("step_explanation");

    // $("#submit_video_btn").hide();

    // document.getElementById("inputvideo_tag").addEventListener('change', handleFileSelect, false);
    // function handleFileSelect(event) {
    //     selectedFile = event.target.files[0];
    //     $("#submit_video_btn").show();
    // };
    // var firbasetitle = firebase.database().ref('Images/').child('Electronic Life Hacks');
    //     firbasetitle.once("value")
    //     .then(function(snapshot) {
    //         snapshot.forEach(function(childSnapshot) {
    //             var key = childSnapshot.key;
    //             var childData = childSnapshot.val();              // childData will be the actual contents of the child

    //             var title = childSnapshot.val().title;
    //             var explanation = childSnapshot.val().explanation;
    //             step_title.innerHTML = title;
    //             step_explanation.innerHTML = explanation;
    // });


    // })
    
    var rootRef = firebase.database().ref('Images/Electronic Life Hacks/');
    rootRef.on("child_added", snap =>{
        var display_pic = snap.child("url").val();
        var step_title = snap.child("title").val();
        var step_explanation = snap.child("explanation").val();
        content="";

        console.log("url: " + display_pic);
        console.log("Title: " + step_title);
        console.log("explain: " + step_explanation);

        content+= "<tr>";
        content+= "<td>" + step_title + "</td>";
        content+= "</tr>";

  

  $("#table_body").append(content);

        // $("#table_body").append("<tr><td><img scr="+
        // display_pic+"/></td><td><tr>"+
        // step_title+"</tr><tr>"+
        // step_explanation+"</tr></td></tr>");

    });



});

