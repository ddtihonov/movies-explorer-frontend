class MainApi {
    constructor({baseAuthUrl, headers }) {
        this.baseAuthUrl = baseAuthUrl;
        this.headers = headers
    };

    register({ name, password, email, }) {
        return fetch(`${this.baseAuthUrl}/signup`, {
            credentials: 'include',
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                password: password,
                email: email
            }),
        })
        .then(this._checkError);
    }

    authorize({ password, email }) {
        return fetch(`${this.baseAuthUrl}/signin`, {
            credentials: 'include',
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                password: password,
                email: email
            }),
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

const auth = new MainApi({
    baseAuthUrl: 'http://api.ddtihonov.students.nomoredomains.work',
    headers: {'Content-Type': 'application/json'}
});

export default auth