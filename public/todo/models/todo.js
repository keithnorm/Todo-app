/**
 * @tag models, home
 * Wraps backend todo services.  Enables 
 * [Todo.Models.Todo.static.findAll retrieving],
 * [Todo.Models.Todo.static.update updating],
 * [Todo.Models.Todo.static.destroy destroying], and
 * [Todo.Models.Todo.static.create creating] todos.
 */
$.Model.extend('Todo.Models.Todo',
/* @Static */
{
	/**
 	 * Retrieves todos data from your backend services.
 	 * @param {Object} params params that might refine your results.
 	 * @param {Function} success a callback function that returns wrapped todo objects.
 	 * @param {Function} error a callback function for an error in the ajax request.
 	 */
	findAll: function( params, success, error ){
		$.ajax({
			url: '/todos.json',
			type: 'get',
			dataType: 'json',
			data: params,
			success: this.callback(['wrapMany',success]),
			error: error
		});
	},
	/**
	 * Updates a todo's data.
	 * @param {String} id A unique id representing your todo.
	 * @param {Object} attrs Data to update your todo with.
	 * @param {Function} success a callback function that indicates a successful update.
 	 * @param {Function} error a callback that should be called with an object of errors.
     */
	update: function( id, attrs, success, error ){
		$.ajax({
			url: '/todos/'+id,
			type: 'put',
			dataType: 'json',
			data: attrs,
			success: success,
			error: error
		});
	},
	/**
 	 * Destroys a todo's data.
 	 * @param {String} id A unique id representing your todo.
	 * @param {Function} success a callback function that indicates a successful destroy.
 	 * @param {Function} error a callback that should be called with an object of errors.
	 */
	destroy: function( id, success, error ){
		$.ajax({
			url: '/todos/'+id,
			type: 'delete',
			dataType: 'json',
			success: success,
			error: error
		});
	},
	/**
	 * Creates a todo.
	 * @param {Object} attrs A todo's attributes.
	 * @param {Function} success a callback function that indicates a successful create.  The data that comes back must have an ID property.
	 * @param {Function} error a callback that should be called with an object of errors.
	 */
	create: function( attrs, success, error ){
		$.ajax({
			url: '/todos',
			type: 'post',
			dataType: 'json',
			success: success,
			error: error,
			data: attrs
		});
	}
},
/* @Prototype */
{});
