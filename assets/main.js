,funcionError);
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
