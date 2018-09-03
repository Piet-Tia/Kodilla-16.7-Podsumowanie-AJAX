
const baseUrl = 'https://kodilla.com/pl/bootcamp-api';
const myHeaders = {
	'X-Client-Id': '3448',
	'X-Auth-Token': 'b8672e1f5fadd0f14fefa31321fbd186'
};

$.ajaxSetup({
	headers: myHeaders
});

$.ajax({
	url: baseUrl + '/board',
	method: 'GET',
	success: function(response) {
	  setupColumns(response.columns);
	}
});

function setupColumns(columns) {
	columns.forEach(function (column) {
		const col = new Column(column.id, column.name);
		board.createColumn(col);
		setupCards(col, column.cards);
		function setupCards(col, cards) {
			cards.forEach(function (card) {
				const cardObj = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
				col.createCard(cardObj);
			});
		};
	});
};