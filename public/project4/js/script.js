let mymap = L.map('mapid').setView([-7.770658, 110.377403], 14);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
{
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC - BY - SA</a>, Imagery© <a href ="https://www.mapbox.com/"> Mapbox </a>',
maxZoom: 20,
id: 'mapbox.streets',
accessToken: 'pk.eyJ1IjoiaGFyZHphbCIsImEiOiJjam1oNzVrYm0xMDljM3Fyc3ZhbWFzbmY2In0.0qPCkp2Jo9bxfiB71vjZ9w'
}).addTo(mymap);

let ugm = [-7.770658, 110.377403];

let ugmMarker = L.marker(ugm).addTo(mymap);
ugmMarker.bindPopup("<b>Universitas Gadjah Mada</b>").openPopup();
ugmMarker.on("click", () => {
    let view = document.querySelector(".view-map");
    view.style.backgroundImage = "url('images/Universitas-Gadjah-Mada.jpg')";
    let reviews = document.querySelector('.review');
    let review = "<h1>Universitas terbaik Indonesia</h1>";
    reviews.innerHTML = review;
    let ratings = document.querySelector(".rating");
    let rating = "<h3>Rating<br>4.7</h3>";
    ratings.innerHTML = rating;
});

let places = [
    {
        "lokasi": [-7.779682, 110.377981], "coworking-space": "Jogja Digital Valley",
        "rating": 4.5,
        "review": "Coworking tempat disini",
        "image": "jdv.jpg"
    },
    {
        "lokasi": [-7.779404, 110.388635], "coworking-space": "Sinergi Coworking space",
        "rating": 4.5,
        "review": "Coworking tempat disini",
        "image": "sinergi.jpg"
    },
    {
        "lokasi": [-7.758085, 110.391981], "coworking-space": "Ekologi Coworking space",
        "rating": 4.5,
        "review": "Coworking tempat disini",
        "image": "ekolog.jpeg"
    },
    {
        "lokasi": [-7.764048, 110.383139], "coworking-space": "Antologi Coworking space",
        "rating": 4.5,
        "review": "Coworking tempat disini",
        "image": "jdv.jpg"
    },
    {
        "lokasi": [-7.768009, 110.402138], "coworking-space": "The Hype Culture",
        "rating": 4.5,
        "review": "Coworking tempat disini",
        "image": "jdv.jpg"
    },
    {
        "lokasi": [-7.780410, 110.361102], "coworking-space": "Genius Idea",
        "rating": 4.5,
        "review": "Coworking tempat disini",
        "image": "jdv.jpg"
    },
    {
        "lokasi": [-7.759673, 110.376294], "coworking-space": "Lantai Bumi Coffe and Space",
        "rating": 4.5,
        "review": "Coworking tempat disini",
        "image": "jdv.jpg"
    },
    {
        "lokasi": [-7.779294, 110.389249], "coworking-space": "Lagani Coffe",
        "rating": 4.5,
        "review": "Coworking tempat disini",
        "image": "jdv.jpg"
    },
    {
        "lokasi": [-7.759932, 110.383278],"coworking-space": "Blackbone Coffe",
        "rating": 4.5,
        "review": "Coworking tempat disini",
        "image": "jdv.jpg"
    },
    {
        "lokasi": [-7.769899, 110.390703], "coworking-space": "Dixie",
        "rating": 4.5,
        "review": "Coworking tempat disini",
        "image": "jdv.jpg"
    }
];

for(let place of places) {
    let marker = L.marker(place.lokasi).addTo(mymap).bindPopup(place["coworking-space"]);
    marker.on("click", () => {
    let view = document.querySelector(".view-map");
    view.style.backgroundImage = "url('images/" + place.image +"')";
    let reviews = document.querySelector('.review');
    let review = "<h1>" + place.review +"</h1>";
    reviews.innerHTML = review;
    let ratings = document.querySelector(".rating");
    let rating = "<h3>Rating<br>" + place.rating +"</h3>";
    ratings.innerHTML = rating;
    });
}

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Kamu menunjuk tempat ke " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);