// create a global variable that will be assigned to a value later in a function
let quotesData;

// create two more variables that are assigned to an empty string
// these will represent the quote and its author
let currentQuote = '',
	currentAuthor = '';

// this function grabs the quotes and their authors from an API
// that API is then assigned to quotesData
function getQuotes() {
	return $.ajax({
		headers: {
			Accept: 'applications/json',
		},
		url:
			'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
		success: function (jsonQuotes) {
			if (typeof jsonQuotes === 'string') {
				quotesData = JSON.parse(jsonQuotes);
				console.log('quotesData');
				console.log(quotesData);
			}
		},
	});
}

// this function picks an index at random from the quote API
function getRandomQuote() {
	return quotesData.quotes[
		Math.floor(Math.random() * quotesData.quotes.length)
	];
}

// this function displays said quote randomly onto the page along with other elements
function getQuote() {
	let randomQuote = getRandomQuote();
	currentQuote = randomQuote.quote;
	currentAuthor = randomQuote.author;

	$('#tweet-quote').attr(
		'href',
		'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
			encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
	);
// makes the previous quote and author fade out while the next code displayed fades in
	$('#quote-div').animate(
		{
			opacity: 0,
		},
		500,
		function () {
			$(this).animate({ opacity: 1 }, 500);
			$('#text').text(randomQuote.quote);
		}
	);

	$('.author-div').animate(
		{
			opacity: 0,
		},
		500,
		function () {
			$(this).animate({ opacity: 1 }, 500);
			$('#author').html(randomQuote.author);
		}
	);
// the color change function is called here so that way the background changes whenever the new quote button is clicked
	colorChange();
}

// this function changes the background color randomly
function colorChange() {
	let colors = [`#${(Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6)}`];
console.log(colors);
	for (let color in colors) {
		$('html body').animate(
			{
				backgroundColor: colors[color],
				color: colors[color],
			},
			1000
		);
		$('header').css('color', 'black');
		$('.button').animate(
			{
				backgroundColor: colors[color],
			},
			1000
		);
		$('#footer').css('color', 'black');
		$('#footer').html(`Copyright&copy${new Date().getFullYear()}&nsbp;James Nascimento`);

	}
}

$(document).ready(function () {
	getQuotes().then(() => {
		getQuote();
	});

	$('#new-quote').on('click', getQuote);
});
