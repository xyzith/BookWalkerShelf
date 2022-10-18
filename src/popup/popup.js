function fetchBookshelfSet() {
	return fetch('https://bookwalker.jp/prx/bookshelf-api/bookshelf-sets/');
}

function fetchBookshelf(bookshelfSetId) {
	const url =  new URL('https://bookwalker.jp/prx/bookshelf-api/bookshelves/');
	url.searchParams.append('bookshelfSetId', bookshelfSetId);
	return fetch(url);
}

function fetchBooks(bookshelfId) {
	const url =  new URL('https://bookwalker.jp/prx/bookshelf-api/bookshelf-books/');
	url.searchParams.append('bookshelfId', bookshelfId);
	return fetch(url);
}

async function getBookshelfSetId() {
	const response = await fetchBookshelfSet();
	const { status } = response;
	if (status === 200) {
		const data = await response.json();
		const bookshelfSetId = data?.bookshelfSets?.[0]?.bookshelfSetId; // get first book shelf set id
		return bookshelfSetId;
	} else if (status === 401){
		renderLogin();
		throw new Error('Unauthorized');
	} else {
		throw new Error('Unknow Error');
	}
}

async function getBooKShelfId() {
	const bookshelfSetId = await getBookshelfSetId();
	if (!bookshelfSetId) {
		throw new Error('No bookshelf');
	}
	const response = await fetchBookshelf(bookshelfSetId);
	const data = await response.json();
	const bookshelfId = data?.[0]?.bookshelfId;
	return bookshelfId;
}


async function getBooks() {
	const bookshelfId = await getBooKShelfId();
	if (!bookshelfId) {
		throw new Error('No bookshelf');
	}
	const response = await fetchBooks(bookshelfId);
	const data = await response.json();
	return data.entities;
}

async function tryGetBooks() {
	try {
		const books = await getBooks();
		return books;
	} catch(e) {
		return [];
	}
}

async function renderBooks() {
	const books = await tryGetBooks();
	const main = document.querySelector('.book-walker-shelf');
	books.forEach(({ uuid, title, imageUrl }) => {
		const book = document.createElement('book-walker-book');
		book.dataset.uuid = uuid;
		book.dataset.title = title;
		book.dataset.imageUrl = imageUrl;
		main.appendChild(book);
	});
}

async function renderLogin() {
	const main = document.querySelector('.book-walker-shelf');
	const login = document.createElement('book-walker-login');
	main.replaceWith(login);
}

renderBooks();
