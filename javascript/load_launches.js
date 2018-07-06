var xmlhttp = new XMLHttpRequest();
var url = "https://api.spacexdata.com/v2/launches";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var all_launches = JSON.parse(this.responseText);
        all_launches.forEach(launch => {
            var patch = launch.links["mission_patch_small"];
            createBadgeDiv(launch, patch);
        });
        if(!localStorage.getItem('all_launches')) {
            localStorage.setItem('all_launches', JSON.stringify(all_launches));
        } else {
            console.log("Item exist.")
        }
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

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