function randomString() {
	const chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
	let str = '';
	for (let i = 0; i < 10; i++) {
		str += chars[Math.floor(Math.random() * chars.length)];
	}
	return str;
}

function Column(name) {
	const self = this; // useful for nested functions

	this.id = randomString();
	this.name = name;
	this.$element = createColumn();

	function createColumn() {
		// CREATING COMPONENTS OF COLUMNS
		const $column = $('<div>').addClass('column');
		const $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		const $columnCardList = $('<ul>').addClass('column-card-list');
		const $columnDelete = $('<button>').addClass('btn-delete').text('x');
		const $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

		// ADDING EVENTS
		$columnDelete.click(function () {
			self.removeColumn();
		});
		$columnAddCard.click(function (event) {
			self.addCard(new Card(prompt("Enter the name of the card")));
		});

		// CONSTRUCTION COLUMN ELEMENT
		$column.append($columnTitle)
			.append($columnDelete)
			.append($columnAddCard)
			.append($columnCardList);

		// RETURN OF CREATED COLUMN
		return $column;
	}
}

Column.prototype = {
	addCard: function (card) {
		this.$element.children('ul').append(card.$element);
	},
	removeColumn: function () {
		this.$element.remove();
	}
};

function Card(description) {
	const self = this;

	this.id = randomString();
	this.description = description;
	this.$element = createCard();

	function createCard() {
		// CREATING THE BLOCKS
		const $card = $('<li>').addClass('card');
		const $cardDescription = $('<p>').addClass('card-description').text(self.description);
		const $cardDelete = $('<button>').addClass('btn-delete').text('x');

		// BINDING TO CLICK EVENT
		$cardDelete.click(function () {
			self.removeCard();
		});

		// COMBINING BLOCKS AND RETURNING THE CARD
		$card.append($cardDelete)
			.append($cardDescription);

		return $card;
	}
}

Card.prototype = {
	removeCard: function () {
		this.$element.remove();
	}
}

const board = {
	name: 'Kanban Board',
	addColumn: function (column) {
		this.$element.append(column.$element);
		initSortable();
	},
	$element: $('#board .column-container')
};

function initSortable() {
	$('.column-card-list').sortable({
		connectWith: '.column-card-list',
		placeholder: 'card-placeholder'
	}).disableSelection();
}

$('.create-column').click(function () {
	board.addColumn(new Column(prompt('Enter a column name')));
});

// CREATING COLUMNS
const todoColumn = new Column('To do');
const doingColumn = new Column('Doing');
const doneColumn = new Column('Done');

// ADDING COLUMNS TO THE BOARD
board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);

// CREATING CARDS
const card1 = new Card('New task');
const card2 = new Card('Create kanban boards');

// ADDING CARDS TO COLUMNS
todoColumn.addCard(card1);
doingColumn.addCard(card2);