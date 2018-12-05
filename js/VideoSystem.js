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
			//Dado un autor, devuelve la posición de ese autor en el array de autores o -1 si no lo encontramos.
			
			this.addUser = function(user){
				//user tiene que ser un objeto tipo User.
				if (!(user instanceof User)) { 
					throw new InvalidAccessMethodException();
				}		

				//User no puede estar vacio.
				if (!user|| user === '') throw new EmptyValueException("user");

				//Busco que no exista el username que me han pasado.
				for(var i = 0; i<_users.length; i++){
					if(_users[i].username === user.username){
						throw new RepeatException("username");
					}
				} 
				//Busco que no exista el email que me han pasado.
				for(var i = 0; i<_users.length; i++){
					if(_users[i].email == user.email){
						throw new RepeatException("email");
					}
				}	
				//Si todo va bien añado el usuario
				_users.push(user);
				//Devuelvo el número de elementos del array _users
				return _users.length;
			}	
			this.removeUser = function(user){
				//user tiene que ser un objeto tipo User.
				if (!(user instanceof User)) { 
					throw new InvalidAccessMethodException();
				}		

				//User no puede estar vacio.
				if (!user|| user == '') throw new EmptyValueException("user");

				//Busco que no exista el username que me han pasado
				for(var i = 0; i<_users.length; i++){
					if(_users[i].username != user.username){
						throw new NotExistException("user");
					}
				} 
				//Si todo va bien añado el usuario
				for(var i = 0; i<_users.length; i++){
					if(_users[i].username === user.username){ //Busco el indice del elemento que me han pasado
						_users.splice(i,1);
					}
				}
				//Devuelvo el número de elementos del array _users
				return _users.length;
			}	
			var _directores = [];
			var _productions = [];
			var _actores = [];
			var _categorias = []
                
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
