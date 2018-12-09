"use strict";
function VideoSystemException() {
	this.name = "VideoSystemException";
	this.message = "Error: Image Manger Generic Exception.";
}
VideoSystemException.prototype = new BaseException(); //Heredamos de BaseException
VideoSystemException.prototype.constructor = VideoSystemException;

function InvalidAccessMethodException() {
	this.name = "InvalidAccessMethodException";
	this.message = "Error: El objeto no puede acceder a este método.";
}
InvalidAccessMethodException.prototype = new VideoSystemException(); //Heredamos de VideoSystem Exception
InvalidAccessMethodException.prototype.constructor = InvalidAccessMethodException;

function RepeatException(elem) {
	this.name = "RepeatException";
	this.message = "Error: El "+ elem +" ya existe.";
}
RepeatException.prototype = new VideoSystemException(); //Heredamos de VideoSystem Exception
RepeatException.prototype.constructor = RepeatException;

function NotExistException(elem) {
	this.name = "NotExistException";
	this.message = "Error: El "+ elem +" no existe.";
}
NotExistException.prototype = new VideoSystemException(); //Heredamos de VideoSystem Exception
NotExistException.prototype.constructor = NotExistException;

var VideoSystem = (function () { //La función anónima devuelve un método getInstance que permite obtener el objeto único
	var instantiated; //Objeto con la instancia única VideoSystem

	function init() { //Inicialización del Singleton

		//Declaración de la función constructora de la instancia VideoSystem
		function VideoSystem(){
			//La función se invoca con el operador new
			if (!(this instanceof VideoSystem)) 
				throw new InvalidAccessConstructorException();
			// Tributo name
			var _name;
			Object.defineProperty(this, 'name', {
				get: function(){
					return _name;
				},
				set: function(value){
					//Name no puede estar vacio
					if (!value|| value == '') throw new EmptyValueException("name");
					_name=value;
				}
			});
			//Definición de users
			var _users = [];
			//Devuelve un iterator de los usuarios del gestor
			Object.defineProperty(this, 'users', {
				get:function(){
				    var nextIndex = 0;		    
				    return {
				       next: function(){
				           return nextIndex < _users.length ?
				               {value: _users[nextIndex++], done: false} :
				               {done: true};
				       }
				    }
				}	
			});
			//Si el username devuelve true
			function userExistUsername(user){
				var e = false;
				for(var i = 0; i<_users.length; i++){
					if(_users[i].username === user.username){
						e = true;
					}
				}
				return e;
			}
			//Si existe Email devuelve true
			function userExistEmail(user){
				var e = false;
				for(var i = 0; i<_users.length; i++){
					if(_users[i].email == user.email){
						e = true;
					}
				}	
				return e;
			}
			//Dado un autor, devuelve la posición de ese autor en el array de autores o -1 si no lo encontramos.
			this.addUser = function(user){
				//user tiene que ser un objeto tipo User.
				if (!(user instanceof User)) { 
					throw new InvalidAccessMethodException();
				}		

				//User no puede estar vacio.
				if (!user|| user === '') throw new EmptyValueException("user");

				//Busco que no exista el username que me han pasado.
				var t = userExistUsername(user);
				if(t){
					throw new RepeatException("username");
				}
				
				//Busco que no exista el email que me han pasado.
				if(userExistEmail(user)){
					throw new RepeatException("email");
				}	
				//Si todo va bien añado el usuario
				_users.push(user);
				//Devuelvo el número de elementos del array _users
				return _users.length;
			}	
			//Borro el usuario que me han pasado por el parametro
			this.removeUser = function(user){
				//user tiene que ser un objeto tipo User.
				if (!(user instanceof User)) { 
					throw new InvalidAccessMethodException();
				}		

				//User no puede estar vacio.
				if (!user|| user == '') throw new EmptyValueException("user");

				//Busco que no exista el username que me han pasado
				if(!userExistUsername(user)){
					throw new NotExistException("user");
				}
				//Si todo va bien añado el usuario
				for(var i = 0; i<_users.length; i++){
					if(_users[i].username === user.username){ //Busco el indice del elemento que me han pasado
						_users.splice(i,1);
					}
				}
				//Devuelvo el número de elementos del array _users.
				return _users.length;
			}	
			//Empezamos con directores.
			var _directores = [];
			//Devuelve un iterator de los directores del gestor.
			Object.defineProperty(this, 'directores', {
				get:function(){
				    var nextIndex = 0;		    
				    return {
				       next: function(){
				           return nextIndex < _directores.length ?
				               {value: _directores[nextIndex++], done: false} :
				               {done: true};
				       }
				    }
				}	
			});
			//Devuelve true si existe el director
			function directorExist(director){
				var e = false;
				for(var i = 0; i<_directores.length; i++){
					//Compruebo que nombre y apellido porque es muy raro que el nombre y el apellido sea el mismo.
					if(_directores[i].name === director.name && _directores[i].lastname1 === director.lastname1){
						e = true;
					}
				}
				return e;
			}
			//Dado un director, devuelve la posición de ese autor en el array de autores o -1 si no lo encontramos.
			this.addDirector = function (director){
				//director tiene que ser un objeto tipo Person.
				if (!(director instanceof Person)) { 
					throw new InvalidAccessMethodException();
				}		
				//director no puede estar vacio.
				if (!director|| director === '') throw new EmptyValueException("director");

				//Busco si existe el director.
				if(directorExist(director)){
					throw new RepeatException("director");
				}
				//Si todo va bien añado el director.
				_directores.push(director);
				//Devuelvo el número de elementos del array _directores.
				return _directores.length;
			}
			this.removeDirector = function (director){
				//director tiene que ser un objeto tipo Person.
				if (!(director instanceof Person)) { 
					throw new InvalidAccessMethodException();
				}		
				//director no puede estar vacio.
				if (!director|| director === '') throw new EmptyValueException("director");

				//Busco que no exista el director que me han pasado.
				if(!directorExist(director)){
					throw new NotExistException("director");
				}
				//Si todo va bien añado el usuario.
				for(var i = 0; i<_directores.length; i++){
					if(_directores[i].name === director.name && _directores[i].lastname1 === director.lastname1){ 
						//Busco el indice del elemento que me han pasado comparando nombre y el primer apellido.
						_directores.splice(i,1);
					}
				}
				//Devuelvo el número de elementos del array de directores.
				return _directores.length;
			}
			
			var _productions = [];
			//Devuelve un iterator de los productions del gestor.
			Object.defineProperty(this, 'productions', {
				get:function(){
				    var nextIndex = 0;		    
				    return {
				       next: function(){
				           return nextIndex < _productions.length ?
				               {value: _productions[nextIndex++], done: false} :
				               {done: true};
				       }
				    }
				}	
			});
			//Devuelve true si existe el production.
			function productionExist(production){
				var e = false;
				for(var i = 0; i<_productions.length; i++){ //Compruebo que no se repite el título.
					if(_productions[i].title === production.title){
						e = true;
					}
				}
				return e;
			}
			//Dado un production, devuelve la posición de ese autor en el array de autores.
			this.addProduction = function (production){
				//El parametro que me pasan tiene que ser un objeto tipo Production.
				if (!(production instanceof Production)) { 
					throw new InvalidAccessMethodException();
				}		
				//production no puede estar vacio.
				if (!production || production === '') throw new EmptyValueException("production");

				//Busco si existe el production.
				if(productionExist(production)){
					throw new RepeatException("production");
				}
				//Si todo va bien añado el production.
				_productions.push(production);
				//Devuelvo el número de elementos que tiene el array _productions.
				return _productions.length;
			}
			//Borrar una producción del array _productions.
			this.removeProduction = function (production){
				//El parametro que me pasan tiene que ser un objeto tipo Production.
				if (!(production instanceof Production)) { 
					throw new InvalidAccessMethodException();
				}		
				//production no puede estar vacio.
				if (!production || production === '') throw new EmptyValueException("production");

				//Busco que no exista el production que me han pasado.
				if(!productionExist(production)){
					throw new NotExistException("production");
				}
				//Si todo va bien añado el usuario.
				for(var i = 0; i<_productions.length; i++){
					if(_productions[i].title === production.title){ 
						//Busco el indice del elemento que me han pasado comparando el título.
						_productions.splice(i,1);
					}
				}
				//Devuelvo el número de elementos del array de producciones.
				return _productions.length;
			}
			
			var _actors = [];
			//Devuelve un iterator de los actors del gestor.
			Object.defineProperty(this, 'actors', {
				get:function(){
				    var nextIndex = 0;		    
				    return {
				       next: function(){
				           return nextIndex < _actors.length ?
				               {value: _actors[nextIndex++], done: false} :
				               {done: true};
				       }
				    }
				}	
			});
			//Devuelve true si existe el actor.
			function actorExist(actor){
				var e = false;
				for(var i = 0; i<_actors.length; i++){ //Compruebo que no se repite el nombre y apellido.
					if(_actors[i].name === actor.name && _actors[i].lastname1 === actor.lastname1){
						e = true;
					}
				}
				return e;
			}
			//Dado un actor, devuelve la posición de ese autor en el array de autores.
			this.addActor = function (actor){
				//El parametro que me pasan tiene que ser un objeto tipo actor.
				if (!(actor instanceof Person)) { 
					throw new InvalidAccessMethodException();
				}		
				//actor no puede estar vacio.
				if (!actor || actor === '') throw new EmptyValueException("actor");

				//Busco si existe el actor.
				if(actorExist(actor)){
					throw new RepeatException("actor");
				}
				//Si todo va bien añado el actor.
				_actors.push(actor);
				//Devuelvo el número de elementos que tiene el array _actors.
				return _actors.length;
			}
			//Borrar una producción del array _actors.
			this.removeActor = function (actor){
				//El parametro que me pasan tiene que ser un objeto tipo Person.
				if (!(actor instanceof Person)) { 
					throw new InvalidAccessMethodException();
				}		
				//actor no puede estar vacio.
				if (!actor || actor === '') throw new EmptyValueException("actor");

				//Busco que no exista el actor que me han pasado.
				if(!actorExist(actor)){
					throw new NotExistException("actor");
				}
				//Si todo va bien añado el usuario.
				for(var i = 0; i<_actors.length; i++){
					if(_actors[i].name === actor.name && _actors[i].lastname1 === actor.lastname1){ 
						//Busco el indice del elemento que me han pasado comparando nombre y el primer apellido.						//Busco el indice del elemento que me han pasado comparando el título.
						_actors.splice(i,1);
					}
				}
				//Devuelvo el número de elementos del array de actores.
				return _actors.length;
			}
			var _categorias = []
        	/*this.assingDirector = function (director, productions){
				//director tiene que ser un objeto tipo Person.
				if (!(director instanceof Person)) { 
					throw new InvalidAccessMethodException();
				}		
				//director no puede estar vacio.
				if (!director|| director === '') throw new EmptyValueException("director");
				//Si el director no existe lo añado.
				if(!directorExist(director)){
					addDirector(director);
				}
				//production no puede estar vacio.
				if (!productions|| productions === '') throw new EmptyValueException("productions");
				//Si no existe se añade.
				if(!productionExist(productions)){
					addProduction(productions);
				}
				Object.assign(director, productions);
				return director.productions.length();
			}*/
        }
        VideoSystem.prototype = {}; 
		VideoSystem.prototype.constructor = VideoSystem;

		var instance = new VideoSystem();//Devolvemos el objeto VideoSystem para que sea una instancia única.
		Object.freeze(instance);
		return instance;
	} //Fin inicialización del Singleton
	return {
		// Devuelve un objeto con el método getInstance
		getInstance: function () { 
			if (!instantiated) { //Si la variable instantiated es undefined, priemera ejecución, ejecuta init.
				instantiated = init(); //instantiated contiene el objeto único
			}
			return instantiated; //Si ya está asignado devuelve la asignación.
		}
	};
})();
