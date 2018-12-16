$(document).ready(function(){

    $(function openNav() {
        $("#testt").on('click', function(){
            document.getElementById("myNav").style.width = "100%";
        });
    });


    $(function closeNav() {
        $("#closebtn").on('click', function(){
            document.getElementById("myNav").style.width = "0%";;
        });
    });

 });