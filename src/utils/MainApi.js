
    
    export const register = ({name, email, password}) => {
        return fetch('https://api.ddtihonov.students.nomoredomains.work/signup', {
            credentials: 'include',
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({ 
                name: name,
                email: email,
                password: password
            }),
        })
        .then((res) => checkError(res));
    };

    export const authorize = ({ email, password }) => {
        return fetch('https://api.ddtihonov.students.nomoredomains.work/signin', {
            credentials: 'include',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            }),
            })

            .then((res) => checkError(res));
    }

    export const deleteAuth = () =>{
        return fetch('https://api.ddtihonov.students.nomoredomains.work/signout', {
            credentials: 'include',
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        })

            .then((res) => checkError(res));
    }
    

    export const getUserInfo = () => {
        return fetch('https://api.ddtihonov.students.nomoredomains.work/users/me', {
            credentials: 'include',
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
            .then((res) => checkError(res));
    }

    export const setUserInfo = ({ name, email }) => {
        return fetch('https://api.ddtihonov.students.nomoredomains.work/users/me', {
            credentials: 'include',
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                email: email,
            })
        })
            .then((res) => checkError(res));
    }

    export const saveFilm = (movie) => {
        return fetch('https://api.ddtihonov.students.nomoredomains.work/movies', {
            method: "POST",
            credentials: "include",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: `https://api.nomoreparties.co${movie.image.url}`,
            trailer: movie.trailerLink,
            thumbnail: movie.trailerLink,
            movieId: movie.id,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
            }),
        })
            .then((res) => checkError(res));
    };
    
    export const getMyMovies = () =>{
        return fetch('https://api.ddtihonov.students.nomoredomains.work/movies', {
            credentials: 'include',
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
            .then((res) => checkError(res));
    }
    
    export const deleteFilm = (movieId) => {
        return fetch(`https://api.ddtihonov.students.nomoredomains.work/movies/${movieId}`, {
            method: "DELETE",
            credentials: "include",
            headers: {'Content-Type': 'application/json'},
        })
            .then((res) => checkError(res));
    };

    const checkError = (res) =>{
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status} : ${res.statusText}`);
    }