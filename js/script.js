const usuarios = [
    {
        correo: "choripan@duoc.cl",
        contrasena: "Hola1233#"
    }
];

document.addEventListener('DOMContentLoaded', function () {
    const formLogin = document.getElementById('form-login');
    const inputEmail = document.getElementById('login-email');
    const inputPassword = document.getElementById('login-password');
    const errorEmail = document.getElementById('error-login-email');
    const errorPassword = document.getElementById('error-login-password');

    if (formLogin) {
        formLogin.addEventListener('submit', function (e) {
            e.preventDefault();
            errorEmail.textContent = '';
            errorPassword.textContent = '';

            let esValido = true;

            const emailVal = inputEmail.value.trim();
            const passwordVal = inputPassword.value;
            if (emailVal === '') {
                errorEmail.textContent = 'El correo electronico es obligatorio.';
                esValido = false;
            } else if (emailVal.length > 60) {
                errorEmail.textContent = 'El correo no puede tener mas de 60 caracteres.';
                esValido = false;
            } else if (!emailVal.endsWith('@duoc.cl')) {
                errorEmail.textContent = 'Debe ingresar un correo institucional valido (@duoc.cl).';
                esValido = false;
            }
            if (passwordVal === '') {
                errorPassword.textContent = 'La contrasena es obligatoria.';
                esValido = false;
            } else if (passwordVal.length < 10) {
                errorPassword.textContent = 'La contrasena debe tener al menos 10 caracteres.';
                esValido = false;
            } else {
                const mayusculas = (passwordVal.match(/[A-Z]/g) || []).length;
                const minusculas = (passwordVal.match(/[a-z]/g) || []).length;
                const numeros = (passwordVal.match(/[0-9]/g) || []).length;
                const simbolos = (passwordVal.match(/[!#$%/]/g) || []).length;

                if (mayusculas < 2) {
                    errorPassword.textContent = 'La contrasena debe contener al menos 2 letras mayusculas.';
                    esValido = false;
                } else if (minusculas < 1) {
                    errorPassword.textContent = 'La contrasena debe contener al menos 1 letra minuscula.';
                    esValido = false;
                } else if (numeros < 1) {
                    errorPassword.textContent = 'La contrasena debe contener al menos 1 numero.';
                    esValido = false;
                } else if (simbolos < 1) {
                    errorPassword.textContent = 'La contrasena debe contener al menos 1 simbolo especial (!, #, $, %).';
                    esValido = false;
                }
            }
            if (esValido) {
                const usuarioEncontrado = usuarios.find(user => user.correo === emailVal && user.contrasena === passwordVal);

                if (usuarioEncontrado) {
                    console.log('Inicio de sesion exitoso');
                    window.location.href = 'index.html';
                } else {
                    errorPassword.textContent = 'Correo o contrasena incorrectos.';
                }
            }
        });
    }
});