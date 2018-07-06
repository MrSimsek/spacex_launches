var launches = JSON.parse(localStorage.getItem('all_launches'));
var badge_container = document.querySelector("#badge-container");

var modal = document.getElementById('badge-details');

var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

badge_container.addEventListener("click", setLaunchDetails, false);

function setLaunchDetails(e) {
    if(e.target !== e.currentTarget) {
        var clickedItem = e.target;
        var launch = launches.find(launch => launch.flight_number === parseInt(clickedItem.parentNode.dataset.flightNumber));
        modal.style.display = "block";
    }
}