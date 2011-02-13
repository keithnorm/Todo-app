module("Model: Todo.Models.Todo")

test("findAll", function(){
	stop(2000);
	Todo.Models.Todo.findAll({}, function(todos){
		start()
		ok(todos)
        ok(todos.length)
        ok(todos[0].name)
        ok(todos[0].description)
	});
	
})

test("create", function(){
	stop(2000);
	new Todo.Models.Todo({name: "dry cleaning", description: "take to street corner"}).save(function(todo){
		start();
		ok(todo);
        ok(todo.id);
        equals(todo.name,"dry cleaning")
        todo.destroy()
	})
})
test("update" , function(){
	stop();
	new Todo.Models.Todo({name: "cook dinner", description: "chicken"}).
            save(function(todo){
            	equals(todo.description,"chicken");
        		todo.update({description: "steak"},function(todo){
        			start()
        			equals(todo.description,"steak");
        			todo.destroy();
        		})
            })

});
test("destroy", function(){
	stop(2000);
	new Todo.Models.Todo({name: "mow grass", description: "use riding mower"}).
            destroy(function(todo){
            	start();
            	ok( true ,"Destroy called" )
            })
})