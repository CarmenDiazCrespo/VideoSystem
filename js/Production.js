function Production(title, nationality, publication, synopsis, image){
    //La función se invoca con el operador new
    if (!(this instanceof Production)) 
        throw new InvalidAccessConstructorException();
        
    //Estos parametros son obligatorios, así me aseguro que no están vacios
    if (!title || title == '') throw new EmptyValueException("title");
    if (!nationality || nationality == '' )  throw new EmptyValueException("nationality");
    if (!publication || publication == '' ) throw new EmptyValueException("publication");

    var _title = title;
    var _nationality = nationality;
    var _image = image || "";
    var _publication = publication;
    var _synopsis = synopsis || "";
    
    Object.defineProperty(this, 'title', {
        get: function(){
            return _title;
        },
        set: function(value){
            if (!value|| value == '') throw new EmptyValueException("title");
            _title=value;
        }
    });
    Object.defineProperty(this, 'nationality', {
        get: function(){
            return _nationality;
        },
        set: function(value){
            if (!value || value == '') throw new EmptyValueException("nationality");
            _nationality=value;
        }
    });
    Object.defineProperty(this, 'image', {
        get: function(){
            return _image;
        },
        set: function(value){
            _image=value;
        }
    });
    Object.defineProperty(this, 'publication', {
        get: function(){
            return _publication;
        },
        set: function(value){
            if (!value || value == '') throw new EmptyValueException("publication");
            _publication=value;
        }
    });
    Object.defineProperty(this, 'synopsis', {
        get: function(){
            return _synopsis;
        },
        set: function(value){
            _synopsis=value;
        }
    });
}
Production.prototype = {};
Production.prototype.constructor = Production;
Production.prototype.toString = function(){
    var str = this.title + " " + this.nationality + " " + this.image + " " + this.publication + " " + this.synopsis;
    return str;
}

/*function test(){
    var p1= new Production("Maria","");
    console.log(p1.toString());
}
window.onload = test;*/