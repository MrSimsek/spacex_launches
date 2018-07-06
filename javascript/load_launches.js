var xmlhttp = new XMLHttpRequest();
var url = "https://api.spacexdata.com/v2/launches";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var all_launches = JSON.parse(this.responseText);
        all_launches.forEach(launch => {
            var patch = launch.links["mission_patch_small"];
            createBadgeDiv(launch, patch);
        });
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

var badge_container = document.querySelector("#badge-container");
badge_container.addEventListener("click", doSomething, false);

function doSomething(e) {
    if(e.target !== e.currentTarget) {
        var clickedItem = e.target;
        console.log(clickedItem.parentNode.dataset.flightNumber);
    }
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

function showDetails(animal) {
    var animalType = animal.getAttribute("data-animal-type");
    alert("The " + animal.innerHTML + " is a " + animalType + ".");
}