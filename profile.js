document.getElementsByClassName('photo')[0]..addEventListener('change', handleFileSelect, false);
function handleFileSelect(event) {
	selectedFile = event.target.files[0];
    //$("#submit_video_btn").show();
}



