/**
 * @tag controllers, home
 * Displays a table of todos.	 Lets the user 
 * ["Todo.Controllers.Todo.prototype.form submit" create], 
 * ["Todo.Controllers.Todo.prototype.&#46;edit click" edit],
 * or ["Todo.Controllers.Todo.prototype.&#46;destroy click" destroy] todos.
 */
$.Controller.extend('Todo.Controllers.Todo',
/* @Static */
{
	onDocument: true
},
/* @Prototype */
{
 /**
 * When the page loads, gets all todos to be displayed.
 */
 load: function(){
	if(!$("#todo").length){
	 $('#content_inner').append($('<div/>').attr('id','todo'));
		 Todo.Models.Todo.findAll({}, this.callback('list'));
 	}
 },
 /**
 * Displays a list of todos and the submit form.
 * @param {Array} todos An array of Todo.Models.Todo objects.
 */
 list: function( todos ){
	$('#todo').html(this.view('init', {todos:todos} ));
 },
 /**
 * Responds to the create form being submitted by creating a new Todo.Models.Todo.
 * @param {jQuery} el A jQuery wrapped element.
 * @param {Event} ev A jQuery event whose default action is prevented.
 */
'form submit': function( el, ev ){
	ev.preventDefault();
	new Todo.Models.Todo(el.formParams()).save();
},
/**
 * Listens for todos being created.	 When a todo is created, displays the new todo.
 * @param {String} called The open ajax event that was called.
 * @param {Event} todo The new todo.
 */
'todo.created subscribe': function( called, todo ){
	$("#todo tbody").append( this.view("list", {todos:[todo]}) );
	$("#todo form input[type!=submit]").val(""); //clear old vals
},
 /**
 * Creates and places the edit interface.
 * @param {jQuery} el The todo's edit link element.
 */
'.edit click': function( el ){
	var todo = el.closest('.todo').model();
	todo.elements().html(this.view('edit', todo));
},
 /**
 * Removes the edit interface.
 * @param {jQuery} el The todo's cancel link element.
 */
'.cancel click': function( el ){
	this.show(el.closest('.todo').model());
},
 /**
 * Updates the todo from the edit values.
 */
'.update click': function( el ){
	var $todo = el.closest('.todo'); 
	$todo.model().update($todo.formParams());
},
 /**
 * Listens for updated todos.	 When a todo is updated, 
 * update's its display.
 */
'todo.updated subscribe': function( called, todo ){
	this.show(todo);
},

'.show click': function( el ){
	var todo = el.closest('.todo').model();
	todo.elements().html(this.view('show', todo));
},

 /**
 * Shows a todo's information.
 */
show: function( todo ){
	todo.elements().html(this.view('show',todo));
},
 /**
 *	 Handle's clicking on a todo's destroy link.
 */
'.destroy click': function( el ){
	if(confirm("Are you sure you want to destroy?")){
		el.closest('.todo').model().destroy();
	}
 },
 /**
 *	 Listens for todos being destroyed and removes them from being displayed.
 */
"todo.destroyed subscribe": function(called, todo){
	todo.elements().remove();	 //removes ALL elements
 }
});
