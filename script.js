
let quotesData;

let colors = [
	'#2c663e',
	'#9c4f31',
	'#b37279',
	'#e3818c',
	'#e74c3c',
	'#d0a93a',
	'#d8d845',
	'#4f442a',
	'#570e0d',
	'#5b3221',
	'#53c1c4',
	'#36a6bc',
];

let currentQuote = '',
	currentAuthor = '';

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

function getRandomQuote() {
	return quotesData.quotes[
		Math.floor(Math.random() * quotesData.quotes.length)
	];
}

function getQuote() {
	let randomQuote = getRandomQuote();
	currentQuote = randomQuote.quote;
	currentAuthor = randomQuote.author;

	$('#tweet-quote').attr(
		'href',
		'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
			encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
	);

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

	colorChange();
}

function colorChange() {
	let color = Math.floor(Math.random() * colors.length);
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

$(document).ready(function () {
	getQuotes().then(() => {
		getQuote();
	});

	$('#new-quote').on('click', getQuote);
});
