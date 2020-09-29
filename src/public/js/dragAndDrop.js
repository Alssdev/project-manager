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
  filter: '#divider',
  store: {
    set: function (sortable) {
      const sequence = sortable.toArray();
      localStorage.setItem('sequence-toDo', sequence.join(','));
    },

    get: function (sortable) {
      let sequence = localStorage.getItem('sequence-toDo');
      sequence = sequence ? sequence.split(',') : { length: 0 };

      return sequence.length ? sequence : [];
    },
  },

  // save progress
  onAdd: (event) => {
    const id = event.item.attributes['data-id'].nodeValue;

    axios.put(`/tasks/${id}/state/1`);
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
  filter: '#divider',
  store: {
    set: function (sortable) {
      const sequence = sortable.toArray();
      localStorage.setItem('sequence-inProgress', sequence.join(','));
    },

    get: function (sortable) {
      let sequence = localStorage.getItem('sequence-inProgress');
      sequence = sequence ? sequence.split(',') : { length: 0 };

      return sequence.length ? sequence : [];
    },
  },

  // save progress
  onAdd: (event) => {
    const id = event.item.attributes['data-id'].nodeValue;

    axios.put(`/tasks/${id}/state/2`);
  },
});

Sortable.create(completed, {
  group: {
    name: 'tasks',
  },
  animation: 300,
  chosenClass: 'task-selected',
  dragClass: 'task-drag',
  easing: 'cubic-bezier(0.5, 1, 0.89, 1)',
  filter: '#divider',
  store: {
    set: function (sortable) {
      const sequence = sortable.toArray();
      localStorage.setItem('sequence-completed', sequence.join(','));
    },

    get: function (sortable) {
      let sequence = localStorage.getItem('sequence-completed');
      sequence = sequence ? sequence.split(',') : { length: 0 };

      return sequence.length ? sequence : [];
    },
  },

  // save progress
  onAdd: (event) => {
    const id = event.item.attributes['data-id'].nodeValue;

    axios.put(`/tasks/${id}/state/3`);
  },
});
