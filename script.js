//esto se guarda en localstorage
var tokenls

email = document.getElementById('Email1')
contrasena = document.getElementById('Password1')
recuerdame = document.getElementById('Check1')
enviar = document.getElementById('login')
alerta = document.getElementById('alert')
user = document.getElementById('user')
token = document.getElementById('token')
expira = document.getElementById('expira')
rol = document.getElementById('rol')
id = document.getElementById('id')
rol2 = document.getElementById('rol2')
nombre = document.getElementById('nombre')
mail2 = document.getElementById('mail2')
usuario = document.getElementById('us')
usuarios = document.getElementById('users')
usuarioslist = document.getElementById('userslist')
logout = document.getElementById('logout')
logouttext = document.getElementById('logout-text')

enviar.addEventListener('submit', (e) => {
    e.preventDefault()
    let url = 'http://127.0.0.1:8000/api/login'
    let data = {
        "email": email.value,
        "password": contrasena.value,
        "remember_me": recuerdame.checked
    }

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    }).then(res => res.json())
        .catch(error => console.log(error))
        .then((response) => {
            tokenls = response.access_token;
            alerta.style.display = 'unset';
            token.innerText = response.access_token;
            expira.innerText = response.expires_at;
            rol.innerText = response.rol;
        })

    console.log(data)
})

usuario.addEventListener('click', (e) => {
    e.preventDefault()
    let url = 'http://127.0.0.1:8000/api/user'
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + tokenls,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        }
    }).then(res => res.json())
        .catch(error => console.log(error))
        .then((response) => {
            console.log(response)
            user.style.display = 'unset';
            id.innerText = response.id
            rol2.innerText = response.rol
            nombre.innerText = response.name
            mail2.innerText = response.email
    })
})

usuarios.addEventListener('click', (e) => {
    e.preventDefault()
    let url = 'http://127.0.0.1:8000/api/users'
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + tokenls,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        }
    }).then(res => res.json())
        .catch(error => console.log(error))
        .then((response) => {
            for (const user of response) {
                usuarioslist.innerHTML += '<p>' + 'id: ' + user.id + '  email: ' + user.email + '  nombre: ' + user.name + '</p>'
            }
        })
})

logout.addEventListener('click', (e) => {
    e.preventDefault()
    let url = 'http://127.0.0.1:8000/api/logout'
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + tokenls,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        }
    }).then(res => res.json())
        .catch(error => console.log(error))
        .then((response) => {
            logouttext.innerText = 'a salido con éxito.'
        })
})