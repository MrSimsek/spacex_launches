var launches = JSON.parse(localStorage.getItem('all_launches'));
var badge_container = document.querySelector("#badge-container");

var modal = document.getElementById('badge-details');
var modalHeaderTitle = document.getElementById('modal-header-title');
var modalHeaderDate = document.getElementById('modal-header-date');
var modalBodyDetails = document.getElementById('modal-body-details');
var modalLaunchSite = document.getElementById('launch-location');
var reusable_components = document.getElementById('reusable-components');
var launchVideo = document.getElementById('launch-video');

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

        var launch_mission_name = launch.mission_name;
        var launch_date = launch.launch_date_utc;
        var launch_details = launch.details;
        var launch_site = launch.launch_site.site_name_long;
        var launch_video_link = launch.links.video_link;
        
        reusable_components.innerHTML = '';

        Object.keys(launch.reuse).forEach(key => {
            var component = document.createElement('li');
            component.classList.add('reusable-component');
            component.innerHTML = '<b>' + key + '</b>' + ' : ' + launch.reuse[key];
            reusable_components.appendChild(component);
        });

        modalHeaderTitle.innerHTML = launch_mission_name;
        modalHeaderDate.innerHTML = moment(launch_date).format('LL');
        modalBodyDetails.innerHTML = launch_details;
        modalLaunchSite.innerHTML = launch_site;
        launchVideo.src = launch_video_link;

        console.log(launch);
        modal.style.display = "block";
    }
}