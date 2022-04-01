class BookWalkerBook extends HTMLElement {
	connectedCallback() {
		console.log(this.dataset);
		const { imageUrl } = this.dataset;
		this.style.backgroundImage = `url(${imageUrl})`;
		this.addEventListener('click', this.showBook.bind(this));
	}

	showBook() {
		const { uuid } = this.dataset;
		const url = new URL('https://member.bookwalker.jp/app/03/webstore/cooperation');
		url.searchParams.append('r', `BROWSER_VIEWER/${uuid}/https://bookwalker.jp/de${uuid}/`);
		window.open(url, 'BookWalkerReader', 'titlebar=no,toolbar=no width=600 height=800');
	}


}

window.customElements.define('book-walker-book', BookWalkerBook);

