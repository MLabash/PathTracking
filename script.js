/*
 1-start and stop tracking
 2-store current position every 10 seconds using google API 
 3-preview the stored positions
 4-delete history of previous stored positions
*/
var trackingMode = true;
var trackingResult = [];
var trackingResultText = '[]';
var resultIndex = 0;
var map;
var trackingInterval;

// Start tracking position or stop tracking.
// get the position every 10 seconds.
function startTracking() {
    if (trackingMode){
        document.getElementById("start-tracking").textContent = "Stop tracking";
        trackingInterval = setInterval(getPosition, 10000);
    }
    else{
        document.getElementById("start-tracking").textContent = "Start tracking";
        clearInterval(trackingInterval);
    }
    trackingMode = !trackingMode;
}

// Show tracking information.
// print the information stored in the JSON object
function previewTracking() {
    var trackingResult = JSON.parse(trackingResultText);
    var table = document.getElementById("track-info-table"); 
    
    if (trackingResult.length > 0) {    
        var tableRows = '';
        var index = 0;

        tableRows += '<th>Time</th><th>Latitude</th><th>Longitude</th>';
        for (index = 0; index < trackingResult.length;index++){

            tableRows += '<tr> <td>'; 
            tableRows += (new Date(trackingResult[index].time).toLocaleString()); 
            tableRows += ' </td><td>';
            tableRows += trackingResult[index].lat;
            tableRows += ' </td><td>';
            tableRows += trackingResult[index].lng;
            tableRows += '</td> </tr> ';
        }
        table.innerHTML = tableRows;
    }
    else {
       table.innerHTML = ''; 
    }
}
     
// delete tracking information
function clearHistory() {
 trackingResultText = '[]';
 resultIndex = 0;
 previewTracking();    
}

// show map 
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 52.377504, lng: 4.901979},
      zoom: 1
    });
    var marker = new google.maps.Marker({
          position: {lat: 52.377504, lng: 4.901979},
          map: map
        });
}

// store my position in the JSON object(trackingResultText)
function storePosition(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      time: new Date()    
    };
    resultIndex++;
    
    var myString = (resultIndex == 1 ? '{':',{') + '"time":"' + pos.time + '",'+ '"lat":"' + pos.lat + '",' + '"lng":"' + pos.lng + '"}';
    trackingResultText = trackingResultText.slice(0,trackingResultText.length-1) + myString + trackingResultText.slice(trackingResultText.length-1);
}

// Get position using google API
function getPosition() {
    navigator.geolocation.getCurrentPosition(storePosition)
}
