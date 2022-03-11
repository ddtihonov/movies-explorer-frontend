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
                email: email,
                password: password
            }),
        })
        .then(this._checkError);
    }

    authorize({ email, password }) {
        return fetch(`${this.baseAuthUrl}/signin`, {
            credentials: 'include',
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                email: email,
                password: password
            }),
            })

        .then(this._checkError);
    }

    deleteAuth () {
        return fetch(`${this.baseAuthUrl}/signout`, {
            credentials: 'include',
            method: 'DELETE',
            headers: this.headers,
        })

        .then(this._checkError);
    }
    

    getUserInfo(token) {
        return fetch(`${this.baseAuthUrl}/users/me`, {
            credentials: 'include',
            method: 'GET',
            headers: this.headers
        })
            .then(this._checkError);
    }

    setUserInfo({ name, email }) {
        return fetch(`${this.baseAuthUrl}/users/me`, {
            credentials: 'include',
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: email
            })
        })
            .then(this._checkError);
    }

    addToMyMoviesList (movie) {
        return fetch(`${this.baseAuthUrl}/movies`, {
            credentials: 'include',
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                trailerLink: movie.trailerLink,
                id: movie.id,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                image: movie.image.url ?
                    `https://api.nomoreparties.co${movie.image.url}`
                    :
                    movie.image,
                thumbnail: movie.thumbnail ?
                    movie.thumbnail
                    :
                    `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
            })
        })
        .then(this._checkError);
    }
    
    getMyMovies () {
        return fetch(`${this.baseAuthUrl}/movies`, {
            credentials: 'include',
            method: 'GET',
            headers: this.headers,
        })
        .then(this._checkError);
    }
    
    deleteFromMyMoviesList (_id) {
        return fetch(`${this.baseAuthUrl}/movies/${_id}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: this.headers,
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
    baseAuthUrl: 'https://api.ddtihonov.students.nomoredomains.work',
    headers: {'Content-Type': 'application/json'}
});

export default auth