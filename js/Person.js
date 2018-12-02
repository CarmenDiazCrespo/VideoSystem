function Person(name, lastname1, lastname2 = "", born, picture){ //Aunque no son obligatorios los meto por aquí para 
    //que se puedan meter en el constructor.
    //La función se invoca con el operador new.
    if (!(this instanceof Person)) 
        throw new InvalidAccessConstructorException();
        
    //Estos parametros son obligatorios, así me aseguro que no están vacios.
    if (!name || name == '') throw new EmptyValueException("name");
    if (!lastname1 || lastname1 == '' )  throw new EmptyValueException("lastname1");
    if (!born || born == '' ) throw new EmptyValueException("born");

    var _name = name;
    var _lastname1 = lastname1;
    var _lastname2 = lastname2;
    var _born = new Date(born);
    var _picture = picture || "";
    
    Object.defineProperty(this, 'name', {
        get: function(){
            return _name;
        },
        set: function(value){
            if (!value|| value == '') throw new EmptyValueException("name");
            _name=value;
        }
    });
    Object.defineProperty(this, 'lastname1', {
        get: function(){
            return _lastname1;
        },
        set: function(value){
            if (!value || value == '') throw new EmptyValueException("lastname1");
            _lastname1=value;
        }
    });
    Object.defineProperty(this, 'lastname2', {
        get: function(){
            return _lastname2;
        },
        set: function(value){
            _lastname2=value;
        }
    });
    Object.defineProperty(this, 'born', {
        get: function(){
            return _born;
        },
        set: function(value){
            if (!value || value == '') throw new EmptyValueException("born");
            _born= new Date(value);
        }
    });
    Object.defineProperty(this, 'picture', {
        get: function(){
            return _picture;
        },
        set: function(value){
            _picture=value;
        }
    });
}
Person.prototype = {};
Person.prototype.constructor = Person;
Person.prototype.toString = function(){
    var str = this.name + " " + this.lastname1 + " " + this.lastname2 + " " + this.born + " " + this.picture;
    return str;
}

/*function test(){
    console.log("La fecha tiene que ser AAAA-MM-DD");
    var p1= new Person("Maria","");
    console.log(p1.toString());
}
window.onload = test;*/