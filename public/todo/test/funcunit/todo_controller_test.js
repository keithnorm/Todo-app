/*global module: true, ok: true, equals: true, S: true, test: true */
module("todo", {
	setup: function () {
		// open the page
		S.open("//todo/todo.html");

		//make sure there's at least one todo on the page before running a test
		S('.todo').exists();
	},
	//a helper function that creates a todo
	create: function () {
		S("[name=name]").type("Ice");
		S("[name=description]").type("Cold Water");
		S("[type=submit]").click();
		S('.todo:nth-child(2)').exists();
	}
});

test("todos present", function () {
	ok(S('.todo').size() >= 1, "There is at least one todo");
});

test("create todos", function () {

	this.create();

	S(function () {
		ok(S('.todo:nth-child(2) td:first').text().match(/Ice/), "Typed Ice");
	});
});

test("edit todos", function () {

	this.create();

	S('.todo:nth-child(2) a.edit').click();
	S(".todo input[name=name]").type(" Water");
	S(".todo input[name=description]").type("\b\b\b\b\bTap Water");
	S(".update").click();
	S('.todo:nth-child(2) .edit').exists(function () {

		ok(S('.todo:nth-child(2) td:first').text().match(/Ice Water/), "Typed Ice Water");

		ok(S('.todo:nth-child(2) td:nth-child(2)').text().match(/Cold Tap Water/), "Typed Cold Tap Water");
	});
});

test("destroy", function () {

	this.create();

	S(".todo:nth-child(2) .destroy").click();

	//makes the next confirmation return true
	S.confirm(true);

	S('.todo:nth-child(2)').missing(function () {
		ok("destroyed");
	});

});