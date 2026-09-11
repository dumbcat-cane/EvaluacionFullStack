const usuario = {
    correo: "usuario@duoc.cl",
    contrasena: "Hola1233#"
};

document.addEventListener('DOMContentLoaded', function () {


    const formLogin = document.getElementById('form-login');

    if (formLogin) {

        const inputEmail = document.getElementById('login-email');
        const inputPassword = document.getElementById('login-password');

        const errorEmail = document.getElementById('error-login-email');
        const errorPassword = document.getElementById('error-login-password');

        formLogin.addEventListener('submit', function (e) {

            e.preventDefault();

            errorEmail.textContent = '';
            errorPassword.textContent = '';

            const emailVal = inputEmail.value.trim();
            const passwordVal = inputPassword.value;

            if (emailVal === '') {
                errorEmail.textContent = 'El correo electronico es obligatorio.';
                return;
            }

            if (passwordVal === '') {
                errorPassword.textContent = 'La contraseña es obligatoria.';
                return;
            }

            if (
                emailVal === usuario.correo &&
                passwordVal === usuario.contrasena
            ) {
                window.location.href = 'index.html';
            } else {
                errorPassword.textContent = 'Correo o contraseña incorrectos.';
            }
        });
    }

    const formRegistro = document.getElementById('formRegistro');

    if (formRegistro) {

        const inputNombre = document.getElementById('nombre');
        const inputCorreo = document.getElementById('correo');
        const inputPassword = document.getElementById('password');
        const inputConfirmPassword = document.getElementById('confirmPassword');

        const errorNombre = document.getElementById('errorNombre');
        const errorCorreo = document.getElementById('errorCorreo');
        const errorPassword = document.getElementById('errorPassword');
        const errorConfirmPassword = document.getElementById('errorConfirmPassword');
        const errorRestricciones = document.getElementById('errorRestricciones');

        const recetasContainer = document.getElementById('recetasContainer');
        const botonAgregarReceta = document.getElementById('agregarReceta');

        let numeroReceta = 1;


        function validarNombre() {

            const nombre = inputNombre.value.trim();

            if (nombre === '') {
                errorNombre.textContent = 'El nombre completo es obligatorio.';
                return false;
            }

            if (nombre.length < 3) {
                errorNombre.textContent = 'El nombre debe tener al menos 3 caracteres.';
                return false;
            }

            if (nombre.length > 70) {
                errorNombre.textContent = 'El nombre no puede tener mas de 70 caracteres.';
                return false;
            }

            if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(nombre)) {
                errorNombre.textContent = 'El nombre solo puede contener letras y espacios.';
                return false;
            }

            errorNombre.textContent = '';
            return true;
        }


        function validarCorreo() {

            const correo = inputCorreo.value.trim();

            if (correo === '') {
                errorCorreo.textContent = 'El correo electronico es obligatorio.';
                return false;
            }

            if (correo.length > 60) {
                errorCorreo.textContent = 'El correo no puede tener mas de 60 caracteres.';
                return false;
            }

            if (!/^[^\s@]+@duoc\.cl$/.test(correo)) {
                errorCorreo.textContent = 'Debe ingresar un correo institucional valido (@duoc.cl).';
                return false;
            }

            errorCorreo.textContent = '';
            return true;
        }


        function validarPassword() {

            const password = inputPassword.value;

            if (password === '') {
                errorPassword.textContent = 'La contraseña es obligatoria.';
                return false;
            }

            if (password.length < 10) {
                errorPassword.textContent = 'La contraseña debe tener al menos 10 caracteres.';
                return false;
            }

            const mayusculas = (password.match(/[A-Z]/g) || []).length;
            const minusculas = (password.match(/[a-z]/g) || []).length;
            const numeros = (password.match(/[0-9]/g) || []).length;
            const simbolos = (password.match(/[!#$%]/g) || []).length;

            if (mayusculas < 2) {
                errorPassword.textContent = 'La contraseña debe contener al menos 2 mayusculas.';
                return false;
            }

            if (minusculas < 1) {
                errorPassword.textContent = 'La contraseña debe contener al menos 1 minuscula.';
                return false;
            }

            if (numeros < 1) {
                errorPassword.textContent = 'La contraseña debe contener al menos 1 numero.';
                return false;
            }

            if (simbolos < 1) {
                errorPassword.textContent = 'La contraseña debe contener al menos 1 simbolo especial (!, #, $, %).';
                return false;
            }

            errorPassword.textContent = '';
            return true;
        }


        function validarConfirmacion() {

            const password = inputPassword.value;
            const confirmPassword = inputConfirmPassword.value;

            if (confirmPassword === '') {
                errorConfirmPassword.textContent = 'Debe confirmar la contraseña.';
                return false;
            }

            if (password !== confirmPassword) {
                errorConfirmPassword.textContent = 'Las contraseñas no coinciden.';
                return false;
            }

            errorConfirmPassword.textContent = '';
            return true;
        }


        function validarRestricciones() {

            const restricciones = document.querySelectorAll(
                'input[name="restricciones"]:checked'
            );

            if (restricciones.length === 0) {
                errorRestricciones.textContent = 'Debe seleccionar al menos una opcion.';
                return false;
            }

            const ninguna = document.querySelector(
                'input[name="restricciones"][value="ninguna"]'
            );

            if (ninguna && ninguna.checked && restricciones.length > 1) {
                errorRestricciones.textContent = 'Si selecciona Ninguna, no puede seleccionar otras restricciones.';
                return false;
            }

            errorRestricciones.textContent = '';
            return true;
        }


        function validarRecetas() {

            const recetas = document.querySelectorAll('.receta');
            let esValido = true;

            recetas.forEach(function (receta) {

                const categoria = receta.querySelector('select');
                const nivel = receta.querySelector('input[type="radio"]:checked');
                const errorReceta = receta.querySelector('.error-receta');

                if (categoria.value === '') {
                    errorReceta.textContent = 'Debe seleccionar una categoria.';
                    esValido = false;
                } else if (!nivel) {
                    errorReceta.textContent = 'Debe seleccionar un nivel de experiencia.';
                    esValido = false;
                } else {
                    errorReceta.textContent = '';
                }
            });

            return esValido;
        }


        botonAgregarReceta.addEventListener('click', function () {

            numeroReceta++;

            const nuevaReceta = document.createElement('div');

            nuevaReceta.classList.add('receta');

            nuevaReceta.innerHTML = `
                <label for="categoria${numeroReceta}">Categoria</label>

                <select id="categoria${numeroReceta}" name="categoria">
                    <option value="">Selecciona una categoria</option>
                    <option value="pasteleria">Pasteleria</option>
                    <option value="italiana">Cocina Italiana</option>
                    <option value="reposteria">Reposteria</option>
                    <option value="oriental">Cocina Oriental</option>
                    <option value="barismo">Barismo</option>
                </select>

                <p>Nivel de experiencia</p>

                <label>
                    <input type="radio" name="nivel${numeroReceta}" value="principiante">
                    Principiante
                </label>

                <label>
                    <input type="radio" name="nivel${numeroReceta}" value="intermedio">
                    Intermedio
                </label>

                <label>
                    <input type="radio" name="nivel${numeroReceta}" value="avanzado">
                    Avanzado
                </label>

                <small class="error-receta"></small>
            `;

            recetasContainer.appendChild(nuevaReceta);
        });


        const restricciones = document.querySelectorAll(
            'input[name="restricciones"]'
        );

        restricciones.forEach(function (checkbox) {

            checkbox.addEventListener('change', function () {

                const ninguna = document.querySelector(
                    'input[name="restricciones"][value="ninguna"]'
                );

                if (checkbox.value === 'ninguna' && checkbox.checked) {

                    restricciones.forEach(function (otra) {
                        if (otra !== checkbox) {
                            otra.checked = false;
                        }
                    });

                } else if (checkbox.value !== 'ninguna' && checkbox.checked) {

                    if (ninguna) {
                        ninguna.checked = false;
                    }
                }

                validarRestricciones();
            });
        });


        inputNombre.addEventListener('input', validarNombre);
        inputCorreo.addEventListener('input', validarCorreo);
        inputPassword.addEventListener('input', validarPassword);
        inputConfirmPassword.addEventListener('input', validarConfirmacion);


        formRegistro.addEventListener('submit', function (e) {

            e.preventDefault();

            const nombreValido = validarNombre();
            const correoValido = validarCorreo();
            const passwordValido = validarPassword();
            const confirmacionValida = validarConfirmacion();
            const restriccionesValidas = validarRestricciones();
            const recetasValidas = validarRecetas();

            if (
                nombreValido &&
                correoValido &&
                passwordValido &&
                confirmacionValida &&
                restriccionesValidas &&
                recetasValidas
            ) {
                alert('Registro realizado correctamente.');
                formRegistro.reset();
                window.location.href = 'login.html';
            }
        });
    }
});