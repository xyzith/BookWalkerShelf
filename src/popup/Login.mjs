class BookWalkerLogin extends HTMLElement {
	connectedCallback() {
		this.textContent = 'Please login first';
		this.style.display = 'block';
		this.style.textAlign = 'center';
		this.style.cursor = 'pointer';
		this.style.weight = '700';
		this.style.color = 'Navy';
		this.addEventListener('click', this.showLoginWindow);
	}

	showLoginWindow() {
		const url = 'https://bookwalker.jp/top/';
		window.open(url, 'BookWalkerReader');
	}
}

window.customElements.define('book-walker-login', BookWalkerLogin);

