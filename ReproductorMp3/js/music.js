/*-----------------------------------------------------------------*/
						/**/
/*-----------------------------------------------------------------*/
$(document).ready(function(){
	iniciarCanciones();
	obtenerCanciones();

});

var audio = document.getElementById('player');
var music;
/*-----------------------------------------------------------------*/
						/*FUNCION PARA INICIALIZAR EL Aleatorio*/
/*-----------------------------------------------------------------*/
function iniciarCanciones(){

	$('#Aleatorio').click(function(){

		$('#playlist').empty();

		Aleatorio(music.songs);
		
		generarLista(music);

		PlayCanciones(0);

	});
}
/*-----------------------------------------------------------------*/
		 /*FUNCION PARA OBTENER LA LISTA DE CANCIONES */
/*-----------------------------------------------------------------*/
function obtenerCanciones(){

	$.getJSON("./json/list.json", function( data ) {
    
    	music=data;
       generarLista(music);
	});

}

/*-----------------------------------------------------------------*/
			/*FUCNION PARA REPRODUCIR LAS CANCIONES*/
/*-----------------------------------------------------------------*/
function PlayCanciones(id){
	var long = music.songs;

	if(id >=long.length){

		console.log('se acabo');
		audio.pause();

	}else{

	$('#img-album').attr('src',music.songs[id].image);
	$('#bg-album').attr('src',music.songs[id].image);
	$('#player').attr('src',music.songs[id].song);
	escribir = document.getElementById("name");
		escribir.innerHTML = music.songs[id].nombre;
	audio.play();
	console.log('hay mas canciones');
	scheduleSong(id);
	}
	
}
/*-----------------------------------------------------------------*/
		/*FUNCION PARA GENERAR LA LISTA DE CANCIONES*/
/*-----------------------------------------------------------------*/
function generarLista(music){
	$.each(music.songs,function(i,song){
		$('#playlist').append('<li class="list-group-item" id="'+i+'">'+song.nombre+'</li>');
	});
	$('#playlist li').click(function(){
		var selectedsong = $(this).attr('id');
		
		PlayCanciones(selectedsong);
	});
}
/*-----------------------------------------------------------------*/
	/*FUNCION PARA PAUSAR LA CANCION SI HA TEMINADO LA LISTA*/
/*-----------------------------------------------------------------*/
function scheduleSong(id){

	audio.onended = function(){

		PlayCanciones(parseInt(id)+1);
	}
}
/*-----------------------------------------------------------------*/
		/*FUNCION PARA HACER UN RANDOM DE LAS CANCIONES*/
/*-----------------------------------------------------------------*/
function Aleatorio(array){
	for(var random, temp, position = array.length;
		position; 
		random = Math.floor(Math.random()*position),
		temp = array[--position],
		array[position] = array[random], 
		array[random]=temp);

		return array;
}