$(document).ready(function () 
{
	var mapa = document.querySelector("#mapa")
		, names
		, map
		, beachs
		, beach = []
		, drawBeach
		, socket = io.connect("http://localhost:8080");
	// nos permite obtener la ruta para los distintos medios de transporte
	var directionsService = new google.maps.DirectionsService()
	// muestra el resultado de la ruta
	, directionsDisplay;

	function obtenerPosicion() 
	{
		if ("geolocation" in navigator)
		{
			navigator.geolocation.getCurrentPosition(function (posicion) 
			{
				var latitud = posicion.coords.latitude;
				var longitud = posicion.coords.longitude;
				var myLatLng = new google.maps.LatLng(latitud, longitud);
				googleMaps(myLatLng);
			}, googleMaps(new google.maps.LatLng(38.90895099999999, 1.4281149999999343)));
		}else
		{
			googleMaps(new google.maps.LatLng(38.90895099999999, 1.4281149999999343));
		}
	};

	function googleMaps(posicion) 
	{
		directionsDisplay = new google.maps.DirectionsRenderer();
		var style = [{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#165c64"},{"saturation":34},{"lightness":-69},{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"hue":"#b7caaa"},{"saturation":-14},{"lightness":-18},{"visibility":"on"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"hue":"#cbdac1"},{"saturation":-6},{"lightness":-9},{"visibility":"on"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#8d9b83"},{"saturation":-89},{"lightness":-12},{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#d4dad0"},{"saturation":-88},{"lightness":54},{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#bdc5b6"},{"saturation":-89},{"lightness":-3},{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"hue":"#bdc5b6"},{"saturation":-89},{"lightness":-26},{"visibility":"on"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"hue":"#c17118"},{"saturation":61},{"lightness":-45},{"visibility":"on"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"hue":"#8ba975"},{"saturation":-46},{"lightness":-28},{"visibility":"on"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"hue":"#a43218"},{"saturation":74},{"lightness":-51},{"visibility":"simplified"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":0},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"administrative.neighborhood","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":0},{"lightness":100},{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"hue":"#ffffff"},{"saturation":0},{"lightness":100},{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":0},{"lightness":100},{"visibility":"off"}]},{"featureType":"administrative","elementType":"all","stylers":[{"hue":"#3a3935"},{"saturation":5},{"lightness":-57},{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"hue":"#cba923"},{"saturation":50},{"lightness":-46},{"visibility":"on"}]}];
		// opciones del mapa
		var opciones = {
			zoom : 14,
			center : posicion,
			disableDefaultUI : true,
			styles:style,
			mapTypeIde : google.maps.MapTypeId.ROADMAP
		}
		// creamos el mapa
		map = new google.maps.Map(mapa, opciones);
		// mi posicior en el mapa
		var miMarca = new google.maps.Marker(
	 		{
	 			position : posicion,
	 			color : "blue",
	 			map : map,
	 			title : "Yo"
	 		});

		// mostramos todas las playas
		drawBeach = function () {
			names = [];
			for (i in beachs)
			{
				var nameBeach = beachs[i].name;
				if(!(nameBeach in names)){
					names.push(nameBeach);
				}
				var positionBeach = new google.maps.LatLng(beachs[i].latitud, beachs[i].longitud);
				if(beach[i]){
					beach[i].setMap(null);
				}
				addBeach(nameBeach, positionBeach, i);
			}
			function addBeach (name, posicion, id) 
			{
				beach[id] = new google.maps.Marker(
				{
					position: positionBeach,
					map: map,
					icon:beachs[i].icon,
					title: beachs[i].name.toString(),
					id:id
				});
				beach[id].setMap(map);
				google.maps.event.addListener(beach[id], "click", function (e)
				{
					socket.emit("changeBeach", beach[id].id);
				});
			}
		}
		
		
		// al cambiar el zoom se centra en mi posicion
		google.maps.event.addListener(map, 'zoom_changed', function() 
		{
		    var zoomLevel = map.getZoom();
		    //map.setCenter(posicion);
		});

		$("#searchBeach").submit(function (event)
		{
			event.preventDefault();
			var address = document.querySelector("#addressBeach").value;
			address.trim();
			if(address){
				obtenerDireccion(address);
			}
			$(".navbar-collapse").removeClass("in");
			$(".navbar-collapse").addClass("collapse");
		});
		function obtenerDireccion(address) 
		{

			// realizar busquedas a partir de lo que introducimos
			var geocoder = new google.maps.Geocoder() 
				, destino
				, esta = false;
			for (i in beachs)
			{
				if(beachs[i].name.toLowerCase() == address.toLowerCase())
				{
					if(beach[i].addr){
						address = beach[i].addr;
					}else{
						esta = true;
					}
					break;
				}
			}
			if(esta)
			{
				destino = new google.maps.LatLng(beachs[i].latitud, beachs[i].longitud);
				obtenerRuta(destino);
			}else
			{
				address += ", baleares";
				geocoder.geocode({"address" : address}, function (resultados, status) 
				{
					if (status == google.maps.GeocoderStatus.OK)
					{
						destino = resultados[0].geometry.location;
						obtenerRuta(destino);
					}
				});
			}
		}
		function obtenerRuta(destino)
		{
			directionsDisplay.setMap(map);
			var request = {
				origin:posicion,
				destination:destino,
				travelMode: google.maps.TravelMode.DRIVING
			};
			directionsService.route(request, function(result, status) 
			{
				if (status == google.maps.DirectionsStatus.OK) 
				{
					directionsDisplay.setDirections(result);
				}
			});
			map.setCenter(destino);
			$("#addressBeach").val("");
		}
		// capa de clima
		$("#aWeather").click(function (){
			map.setZoom(12);
			var weatherLayer = new google.maps.weather.WeatherLayer({
		    	temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
			});
			weatherLayer.setMap(map);
			var cloudLayer = new google.maps.weather.CloudLayer();
			cloudLayer.setMap(map);
			$("#aWeather").addClass("disabled");
			$("#dWeather").removeClass("disabled");
			$("#dWeather").click(function (){
				weatherLayer.setMap(null);
				$("#dWeather").addClass("disabled");
				$("#aWeather").removeClass("disabled");
			});
		});
		// capa panoramio
		$("#aPanoramio").click(function (){
			var panoramioLayer = new google.maps.panoramio.PanoramioLayer();
			panoramioLayer.setMap(map);
			panoramioLayer.setTag("beach");
			$("#aPanoramio").addClass("disabled");
			$("#dPanoramio").removeClass("disabled");
			$("#dPanoramio").click(function (){
				panoramioLayer.setMap(null);
				$("#dPanoramio").addClass("disabled");
				$("#aPanoramio").removeClass("disabled");
			});
		});
	}
	
	obtenerPosicion();
    socket.on("beaches", function (playas) {
		beachs = playas;
		drawBeach();
		$( "#addressBeach" ).autocomplete({
			source: names
		});
	});
});