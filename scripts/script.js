window.onload = () => {


    var https = require("https");

    var url = "https://62a1-2001-b011-e004-1ca5-f434-5588-1508-28a3.ngrok.io/smalltest";

    var data = "";
   https.get(url, function (response) 
   {
    
    console.log("start");
    response.on("data", chunk => {
    console.log("on data");
    data += chunk;
   });

    response.on("end", () => 
    {
     data = JSON.parse(data);
     let places = data;
    renderPlaces(places)
     
    });
 
   });
        

};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        //const latitude = place.location.lat; 修改前
        //const longitude = place.location.lng; 修改前
        const latitude = place.lat;  //修改後
        const longitude = place.lon; //修改後

        // add place icon
        const icon = document.createElement('a-image');
        icon.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
        //icon.setAttribute('name', place.name);         修改前
        icon.setAttribute('name', place.building);      //修改後
        //icon.setAttribute('building', place.building);   //修改後
        icon.setAttribute('src','https://dylan1211-hub.github.io/smalltest/assets/r4.png');

        // for debug purposes, just show in a bigger scale, otherwise I have to personally go on places...
        icon.setAttribute('scale','5, 5');

        icon.addEventListener('loaded', () => window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')));

        icon.addEventListener('click', clickListener);

        const clickListener = function (ev) {
            ev.stopPropagation();
            ev.preventDefault();

            const name = ev.target.getAttribute('name');

            const el = ev.detail.intersection && ev.detail.intersection.object.el;

            if (el && el === ev.target) {
                const label = document.createElement('span');
                const container = document.createElement('div');
                container.setAttribute('id', 'place-label');
                label.innerText = name;
                container.appendChild(label);
                document.body.appendChild(container);

                setTimeout(() => {
                    container.parentElement.removeChild(container);
                }, 1500);
            }
        };

    
        scene.appendChild(icon);
    });
}