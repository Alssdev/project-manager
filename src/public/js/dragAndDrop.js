const toDo = document.getElementById('toDo');
const inProgress = document.getElementById('inProgress');
const completed = document.getElementById('completed');

Sortable.create(toDo, {
	group: {
		name: 'tasks',
	},
	animation: 300,
	chosenClass: 'task-selected',
	dragClass: 'task-drag',
	easing: 'cubic-bezier(0.5, 1, 0.89, 1)',
	store: {
		set: function () {},
	},
});

Sortable.create(inProgress, {
	group: {
		name: 'tasks',
	},
	animation: 300,
	chosenClass: 'task-selected',
	dragClass: 'task-drag',
	easing: 'cubic-bezier(0.5, 1, 0.89, 1)',
});

Sortable.create(completed, {
	group: {
		name: 'tasks',
	},
	animation: 300,
	chosenClass: 'task-selected',
	dragClass: 'task-drag',
	easing: 'cubic-bezier(0.5, 1, 0.89, 1)',
});
