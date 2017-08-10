function initMap(){/* initMap inicializa el mapa */
  var map = new google.maps.Map(document.getElementById("map"),{/* NOTA: van comas */
    zoom:5,// nivel de profundidad de nuestro mapa. + zoom localizado se ve 
    center: {lat: -9.1191427, lng: -77.0349046},//longitud y latitud en que queremos que se muestre nuestro mapa
    mapTypeControl: false,
    zoomControl:false,
    streetViewControl:false
  });

//Llamar id's de los input de origen y destino
  var inicio = document.getElementById("origen");
  var fin = document.getElementById("destino");

  var autocomplete = new google.maps.places.Autocomplete(inicio);
  autocomplete.bindTo("bounds",map)

  var autocomplete = new google.maps.places.Autocomplete(fin);
  autocomplete.bindTo("bounds",map)

//Funcion que busca ubicacion
  function buscar(){/* va dentro de initMap() */
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(funcionExito,funcionError);
    }
  }
  /*  getCurrentPosition permite saber ubicacion actual del user
    funcionExito se ejecuta solo cuando el user comparte su ubicacion
    funcionError se ejecuta cuando se produce un error en la geolocalizacion
  */


  document.getElementById("encuentrame").addEventListener("click",buscar); //"encuentrame" es el boton en HTML

  document.getElementById("ruta").addEventListener("click",function(){
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(map);

    var inicio = document.getElementById("input-origen").value;
    var fin = document.getElementById("input-destino").value;

    var request = {
      origin: inicio,
      destination: fin,
      travelMode: "DRIVING"
    };

    directionsService.route(request, function(result, status){
      if (status == "OK"){
        directionsDisplay.setDirections(result);
      }
    })
  });

  var latitud,longitud;


  var funcionExito = function(posicion){
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;

    var miUbicacion = new google.maps.Marker({
      position: {lat:latitud, lng:longitud},
      animation: google.maps.Animation.DROP,
      map: map
    });

    map.setZoom(17);
    map.setCenter({lat:latitud, lng:longitud});
  }


  var funcionError = function(error){
    alert("No encontramos tu ubicación");
  }
}
//Libreria GMPS (permite reconocer lugares y autocomplete de datos)
  var inputOrigen =(document.getElementById('inicio'));
  var autocompleteOrigen = new google.maps.places.Autocomplete(inputOrigen);
  autocompleteOrigen.bindTo('bounds', map);

  var inputDestino = document.getElementById("fin");
  var autocompleteDestino = new google.maps.places.Autocomplete(inputDestino);
  autocompleteDestino.bindTo('bounds', map);
