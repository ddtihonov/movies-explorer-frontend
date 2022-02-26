class Api {
    constructor({baseUrl, headers}) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    };

    getInitialCards() {
        return fetch(`${this.baseUrl}/beatfilm-movies`, {
            headers: this.headers
        })
            .then(this._checkError);
    }

    _checkError(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

const api = new Api({
    baseUrl: 'https://api.nomoreparties.co',
headers: {'Content-Type': 'application/json'}
});

export default api 