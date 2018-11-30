function Rosource(duration, link, audios,subtitles){
    //audios y subtitulos son arrays no obligatorios, pero los pongo ahí para que se puedan meter en el contructor
    //La función se invoca con el operador new
    if (!(this instanceof Rosource)) 
        throw new InvalidAccessConstructorException();
        
    //Estos parametros son obligatorios, así me aseguro que no están vacios
    if (!duration || duration == '') throw new EmptyValueException("duration");
    if (Number.isNaN(duration)) throw new InvalidValueException("duration", duration); //Esto no me funciona, por qué?
    if (!link || link == '' )  throw new EmptyValueException("link");


    var _duration = duration;
    var _link = link;
    var _audios = audios || [];
    var _subtitles = subtitles || [];
    
    Object.defineProperty(this, 'duration', {
        get: function(){
            return _duration;
        },
        set: function(value){
            if (!value|| value == '') throw new EmptyValueException("duration");
            _duration=value;
        }
    });
    Object.defineProperty(this, 'link', {
        get: function(){
            return _link;
        },
        set: function(value){
            if (!value || value == '') throw new EmptyValueException("link");
            _link=value;
        }
    });
    Object.defineProperty(this, 'audios', {
        get: function(){
            return _audios;
        },
        set: function(value = []){
            _audios=value;
        }
    });

    Object.defineProperty(this, 'subtitles', {
        get: function(){
            return _subtitles;
        },
        set: function(value = []){
            _subtitles=value;
        }
    });
}
Rosource.prototype = {};
Rosource.prototype.constructor = Rosource;
Rosource.prototype.toString = function(){
    var str = this.duration + " " + this.link + " " + this.audios + " " + this.subtitles;
    return str;
}


/*function test(){
    var audios =["caca"," popo"," 1234"];
    var p1= new Rosource(1.35,"www.cacapopo.com",audios);
    console.log(p1.toString());
}
window.onload = test;*/