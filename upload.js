let selectedFile;
var download_URL;
var videotitle;

$(document).ready(function(){
    $("#submit_video_btn").hide();
    $(".title_video").hide();

    document.getElementById("inputvideo_tag").addEventListener('change', handleFileSelect, false);
    function handleFileSelect(event) {
        selectedFile = event.target.files[0];
        $("#submit_video_btn").show();
        $(".title_video").show();
    };

    
});

function confirmUpload() {
    var metadata = {
         contentType: 'video'
     };
    var uploadTask = firebase.storage().ref().child('videos/' + selectedFile.name).put(selectedFile, metadata);
    
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function(snapshot){
        console.log(snapshot);
          // Observe state change events such as progress, pause, and resume
          // See below for more detail
    }, function(error) {
          console.log(error);
          alert("An error occured.");
    }, function() {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        videotitle = $('#title_vid').val();
		var postKey = firebase.database().ref('Videos/').push().key;
        
        // uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        //     download_URL=downloadURL;
        //     console.log('File available at', downloadURL);
        //   });
        // console.log(download_URL);

        curr_user = firebase.auth().currentUser.uid;

        uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
            var postData = {
              url: downloadUrl,
              user: curr_user,
              title: videotitle
            };
        
            var updates = {};
            updates['/Videos/'+postKey] = postData;
            
        
            return firebase.database().ref().update(updates);
          }); 
        //  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        //      console.log(downloadURL);
        //   })
        // curr_user = firebase.auth().currentUser.uid;
        // console.log(download_URL);
		// var updates = {};
		// var postData= {
        //     url: download_URL
        // };
        // console.log(postData);
        // updates['/Videos/'+postKey] = postData;
        // console.log(updates);
        // firebase.database().ref().child(curr_user).set(postData);
		// //firebase.database().ref().update(updates);

    });
}