"use strict";

//Testeo de VideoSystem.

function testVideoSystem(){
    //Creo los objetos que voy a utilizar.
    //Objeto VideoSystem
    var vs = VideoSystem.getInstance();
    //Objetos usuarios
    var u1 = new User("kheiss","montoya@hotmail.com","Montoya123!");
    var u2 = new User("kheiss22","montoya.diaz@hotmail.com","MontoyaDiaz123*");
    //objetos director = persona
    var dir1= new Person("Pepe","Perez","","2005-2-2");
    var dir2= new Person("Monolo","Lopez","","1995-2-5");
    //Objetos de production
    var pro1= new Movie("Red2","USA","2025-02-25");
    var pro2= new Movie("Caza Fantasma","USA","1984-12-5");
    //objetos actor = persona
    var ac1= new Person("John","Cusack","","1970-8-28");
    var ac2= new Person("Monolo","Lopez","","1993-12-16");
    //objetos category
    var cat1= new Category("Terror","Las películas que más miedo dan");
    var cat2= new Category("Drama");
    //prueba de la propiedad name (get y set).
    function testName(){
        console.log("--> Prueba de Name <--");
        vs.name="carflix";
        console.log("El nombre del sistema es: "+vs.name);
        console.log("");
    }
    function showUsers(){
		//Recorremos los usuarios.
		console.log ("Recorremos los usuarios.");
		var users = vs.users;
		var user = users.next();
		while (user.done !== true){
			console.log ("Username: " + user.value.username);
			user = users.next();
		}
	}
    //Pruebo todas las funciones de user.
    function testUser(){
        console.log("--> Prueba de User <--");
        console.log("La longitud del array de usuarios es: "+vs.addUser(u1));
        console.log("La longitud del array de usuarios es: "+vs.addUser(u2));
        showUsers();
        console.log("La longitud del array de usuarios es: "+vs.removeUser(u1));
        showUsers();
        console.log("");
    }    
    function showDirectores(){
		//Recorremos los usuarios.
		console.log ("Recorremos los usuarios.");
		var directores = vs.directores;
		var director = directores.next();
		while (director.done !== true){
			console.log ("Name: " + director.value.name+", Lastname1: "+director.value.lastname1);
			director = directores.next();
		}
	}
    //Prueba de Director
    function testDirector(){
        console.log("--> Prueba de Director <--");
        console.log("La longitud del array de directores es: "+vs.addDirector(dir1));
        console.log("La longitud del array de directores es: "+vs.addDirector(dir2));
        showDirectores();
        console.log("La longitud del array de directores es: "+vs.removeDirector(dir2));
        showDirectores();
        console.log("");
    }
    //Prueba de Production
    function testProduction(){
        console.log("--> Prueba de Production <--");
        console.log("La longitud del array de production es: "+vs.addProduction(pro1));
        console.log("La longitud del array de production es: "+vs.addProduction(pro2));
        console.log("La longitud del array de production es: "+vs.removeProduction(pro1));
        console.log("");
        
    }
    //Prueba de Actores
    function testActor(){
        console.log("--> Prueba de Actor <--");
        console.log("La longitud del array de actor es: "+vs.addActor(ac1));
        console.log("La longitud del array de actor es: "+vs.addActor(ac2));
        console.log("La longitud del array de actor es: "+vs.removeActor(ac2));
        console.log("");
        
    }
    function showCategory(){
		//Recorremos los usuarios.
		console.log ("Recorremos las categorias.");
		var categorias = vs.categorias;
		var categoria = categorias.next();
		while (categoria.done !== true){
			console.log ("Name: " + categoria.value.name+", Descripción: "+categoria.value.description);
			categoria = categorias.next();
		}
	}
    //Prueba de Category
    function testCategory(){
        console.log("--> Prueba de Category <--");
        console.log("La longitud del array de categoria es: "+vs.addCategory(cat1));
        console.log("La longitud del array de categoria es: "+vs.addCategory(cat2));
        showCategory();
        console.log("La longitud del array de categoria es: "+vs.removeCategory(cat2));
        showCategory();
        console.log("");
        
    }
    //Prueba AssingDirector
    function testAssingDirector(){
        console.log("--> Prueba de AssingDirector <--");
        console.log("La longitud del array de producciones en el director "+dir1.name +" es: "+vs.assingDirector(dir1,pro1));
        console.log("La longitud del array de producciones en el director "+dir2.name+" es: "+vs.assingDirector(dir2,pro2));
        //console.log("La longitud del array de producciones en el director "+dir2.name+" es: "+vs.deassingDirector(dir1,pro1));
        console.log("");
    }
    function testAssingCategory(){
        console.log("--> Prueba de AssingCategory <--");
        console.log("La longitud del array de producciones en la categoria"+cat1.name +" es: "+vs.assingCategory(cat1,pro1));
        console.log("La longitud del array de producciones en la categoria "+cat2.name+" es: "+vs.assingCategory(cat2,pro2));
        console.log("");
    }
    //llamamos a los métodos.
    testName();
    testUser();
    testDirector();
    testProduction();
    testActor();
    testCategory();
    testAssingDirector();
    testAssingCategory();
}
window.onload = testVideoSystem;