var xhr = new XMLHttpRequest();
var method = "GET";
var url = "https://api.spacexdata.com/v2/launches";

if(!localStorage.getItem('all_launches')) {
    xhr.open(method, url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var all_launches = JSON.parse(this.responseText);
            all_launches.forEach(launch => {
                var patch = launch.links["mission_patch_small"];
                createBadgeDiv(launch, patch);
            });
            localStorage.setItem('all_launches', JSON.stringify(all_launches));
            location.reload();
        }
    };
    xhr.send();
} else {
    var all_launches = JSON.parse(localStorage.getItem('all_launches'));
    all_launches.forEach(launch => {
        var patch = launch.links["mission_patch_small"];
        createBadgeDiv(launch, patch);
    });
}

function createBadgeDiv(launch, patch_src) {
    var badge = document.createElement("div");
    var badge_image = document.createElement("img");

    badge_image.src = patch_src;
    badge_image.classList.add("badge-img");
    
    badge.classList.add("badge");
    badge.dataset.flightNumber = launch.flight_number;

    badge.appendChild(badge_image);

    document.getElementById("badge-container").appendChild(badge);
}