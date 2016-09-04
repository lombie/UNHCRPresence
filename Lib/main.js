 
    // Load the JSON file(s)
    queue()
        .defer(d3.json, "lib/turkey.json") // Load TotalPoC.json
		.defer(d3.json, "lib/NonSatelliteCities.json") // Load NonSatelliteCities.json
		.defer(d3.json, "lib/SatelliteCities.json") // Load NonSatelliteCities.json
        .await(loadGeom); 
		
    function loadGeom(error, TotalPoC, NonSatelliteCities, SatelliteCities){
       
        var TotalPoC = L.geoJson(TotalPoC.features, {
            style: densityStyle,
            onEachFeature: function (feature, layer) {
                layer.bindPopup("<div id='tipContainer'><div id='tipLocation'><b>"+ feature.properties.name +"</div>"+"<div id='tipKey'>"+"All: "+ feature.properties.TotalPoC+'<br />'+"Afghanistan: "+ feature.properties.Afghan+'<br />'+"Iran: "+ feature.properties.Iranian+'<br />'+"Iraq: "+ feature.properties.Iraqi+'<br />'+"Somali: "+ feature.properties.Somali+'<br />'+"Others: "+ feature.properties.Others +"</div><div class='tipClear'></div></div>");
            }
        });
		
		var NonSatelliteCities = L.geoJson(NonSatelliteCities.features, {
            style: densityStyle,
            onEachFeature: function (feature, layer) {
                layer.bindPopup("<div id='tipContainer'><div id='tipLocation'><b>"+ feature.properties.name +"</div>"+"<div id='tipKey'>"+"All: "+ feature.properties.TotalPoC+'<br />'+"Afghanistan: "+ feature.properties.Afghan+'<br />'+"Iran: "+ feature.properties.Iranian+'<br />'+"Iraq: "+ feature.properties.Iraqi+'<br />'+"Somali: "+ feature.properties.Somali+'<br />'+"Others: "+ feature.properties.Others +"</div><div class='tipClear'></div></div>");
            }
        });
		
		var SatelliteCities = L.geoJson(SatelliteCities.features, {
            style: densityStyle,
            onEachFeature: function (feature, layer) {
                layer.bindPopup("<div id='tipContainer'><div id='tipLocation'><b>"+ feature.properties.name +"</div>"+"<div id='tipKey'>"+"All: "+ feature.properties.TotalPoC+'<br />'+"Afghanistan: "+ feature.properties.Afghan+'<br />'+"Iran: "+ feature.properties.Iranian+'<br />'+"Iraq: "+ feature.properties.Iraqi+'<br />'+"Somali: "+ feature.properties.Somali+'<br />'+"Others: "+ feature.properties.Others +"</div><div class='tipClear'></div></div>");
            }
        });
 
 
        function densityStyle(feature){
            return {
                "fillColor": getColour(feature.properties.TotalPoC), // Call function to get fill colour
                "weight": 2, //
                "opacity": 1, //
                "color": '#000', ///
                "fillOpacity": 0.7 //
            };
        }
 
 

        function getColour(d){
            return d > 12000 ? '#08306b' :
			       d > 10500  ? '#08519c' :
			       d > 9000  ? '#2171b5' :
			       d > 7500  ? '#4292c6' :
			       d > 6000   ? '#6baed6' :
			       d > 4500   ? '#9ecae1' :
			       d > 3000   ? '#c6dbef' :
                   d > 1500   ? '#deebf7' :    
			                  '#f7fbff';
		}
 
 
        // Define a basemap and min/max Zoom
        var map = L.map('map', {zoomControl:false, attributionControl: false } ).setView([39.364, 35.673], 6);
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibG9tYmllIiwiYSI6IlAyVlJfU3MifQ.gMTKJU_NsIvulLTttw4-XA', {
			maxZoom: 12,    pitch: 60, 
            attribution: 'Map: <a href="http://www.unhcr.org.tr">UNHCR Turkey</a> Data: ',
			id: 'lombie.nb901i12'
		}).addTo(map);
        TotalPoC.addTo(map);
		
		// Define the layer controls:
        var control = L.control.layers(
                {
                     "Persons of Concern in Turkey" : TotalPoC
					,"Persons of Concern in Satellite Cities" : SatelliteCities
					,"Persons of Concern in Non-Satellite Cities" : NonSatelliteCities
                }, null , {collapsed:false});
 
        // Add the map controls to the map
        control.addTo(map);
		
		$.getJSON("lib/asam.geojson",function(data){
            var asamIcon = L.icon({
                iconUrl: 'images/asam.png',
                iconSize: [20,50],
                popupAnchor:  [0, -30],
                });
            L.geoJson(data,{
                pointToLayer: function(feature,latlng){
                    var marker = L.marker(latlng,{icon: asamIcon});
                    marker.bindPopup("<div id='tipLocation'><b>"+ feature.properties.title +"</div>");
                    return marker;
                    }
                }).addTo(map);
            });
			
		$.getJSON("lib/hrdf.geojson",function(data){
            var asamIcon = L.icon({
                iconUrl: 'images/hrdf.png',
                iconSize: [20,50],
                popupAnchor:  [0, -30],
                });
            L.geoJson(data,{
                pointToLayer: function(feature,latlng){
                    var marker = L.marker(latlng,{icon: asamIcon});
                    marker.bindPopup("<div id='tipLocation'><b>"+ feature.properties.title +"</div>");
                    return marker;
                    }
                }).addTo(map);
            });	
        
        $.getJSON("lib/legalaid.geojson",function(data){
            var asamIcon = L.icon({
                iconUrl: 'images/ibc.png',
                iconSize: [20,50],
                popupAnchor:  [0, -30],
                });
            L.geoJson(data,{
                pointToLayer: function(feature,latlng){
                    var marker = L.marker(latlng,{icon: asamIcon});
                    marker.bindPopup("<div id='tipLocation'><b>"+ feature.properties.title +"</div>");
                    return marker;
                    }
                }).addTo(map);
            });	
        
        $.getJSON("lib/tihv.geojson",function(data){
            var asamIcon = L.icon({
                iconUrl: 'images/stl.png',
                iconSize: [20,50],
                popupAnchor:  [0, -30],
                });
            L.geoJson(data,{
                pointToLayer: function(feature,latlng){
                    var marker = L.marker(latlng,{icon: asamIcon});
                    marker.bindPopup("<div id='tipLocation'><b>"+ feature.properties.title +"</div>");
                    return marker;
                    }
                }).addTo(map);
            });	
        
        $.getJSON("lib/kader.geojson",function(data){
            var asamIcon = L.icon({
                iconUrl: 'images/TRC.png',
                iconSize: [20,50],
                popupAnchor:  [0, -30],
                });
            L.geoJson(data,{
                pointToLayer: function(feature,latlng){
                    var marker = L.marker(latlng,{icon: asamIcon});
                    marker.bindPopup("<div id='tipLocation'><b>"+ feature.properties.title +"</div>");
                    return marker;
                    }
                }).addTo(map);
            });	
        
        
        //Legend

        var legend = L.control({position: 'bottomleft'}); 
        
		legend.onAdd = function (map) {
            
			var div = L.DomUtil.create('div', 'info legend'),
				labels = ['<strong> LEGEND</strong>', "<img src='images/legend/asam.png' height=20>ASAM", "<img src='images/legend/hrdf.png' height=20>HRDF (IKGV)", "<img src='images/legend/ibc.png' height=20>Legal Aid", "<img src='images/legend/stl.png' height=20>TIHV", "<img src='images/legend/TRC.png' height=20>Kader/ KDD"],
				from, to;

			div.innerHTML = labels.join('<br>');
			return div;
		};

		legend.addTo(map);
        
    }
    
