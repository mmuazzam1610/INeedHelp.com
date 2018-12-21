var tutorialTitle;
var tutorialStep;
var explain;
var selectedFile;

function submit(){
    localStorage.topic = selectedFile;
    window.location = "DisplayPageTutorials.htm"
}

$(document).ready(function(){
    //upload title picture
    $(document).ready(function(){
        //$("#submit_video_btn").hide();
    
        document.getElementById("inputimage_tag").addEventListener('change', handleFileSelect, false);
        function handleFileSelect(event) {
            selectedFile = event.target.files[0];
            //$("#submit_video_btn").show();
        };
    });

 
 });

var curr_user;

 //insert step
 function confirmUpload() {
    var metadata = {
         contentType: 'image'
     };
    var uploadTask = firebase.storage().ref().child('tutorial_images/' + selectedFile.name).put(selectedFile, metadata);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function(snapshot){
        console.log(snapshot);
        //console.log(snapshot);
        // Observe state change events such as progress, pause, and resume
        // See below for more detail
    }, function(error) {
        console.log(error);
        alert("An error occured.");
    }, function() {
        //get tutorial title
        tutorialTitle = $('#tutorial_title').val();

        //get step
        tutorialStep = $('#tutorial_step').val();

        
        //get instruction
        explain = $('#step_explanation').val();

        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        var postKey = firebase.database().ref('Images/').child(tutorialTitle+'/').push().key;
        curr_user = firebase.auth().currentUser.uid;

        uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
            var postData = {
            title: tutorialStep,
            explanation: explain,
            url: downloadUrl,
            user: curr_user
        };
        console.log(postData);

        var updates = {};
        updates['/Images/'+tutorialTitle+'/'+postKey] = postData;
        console.log(updates);

        return firebase.database().ref().update(updates);
        });
        alert('Step Added');
    });
}