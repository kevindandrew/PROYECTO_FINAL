// ELEMENTOS LLAMADOS DESDE HTML
const botonesRadio = document.querySelectorAll(".inrad");
const formulario = document.querySelector("#mortgageForm");

// Primeros inputs
const etiqueta1 = document.querySelector("#addon-wrapping");
const entrada1 = document.querySelector("#inp1");
const error1 = document.querySelector("#emer1");
const errorExtra1 = document.querySelector("#emer11");

// Segundos
const etiqueta2 = document.querySelector("#basic-addon2");
const entrada2 = document.querySelector("#inp2");
const error2 = document.querySelector("#emer2");
const errorExtra2 = document.querySelector("#emer22");

// Terceros
const etiqueta3 = document.querySelector("#basic-addon3");
const entrada3 = document.querySelector("#inp3");
const error3 = document.querySelector("#emer3");
const errorExtra3 = document.querySelector("#emer33");

// Cuartos
const error4 = document.querySelector("#emer44");

// ELEMENTOS CON ESCUCHADORES DE EVENTOS
botonesRadio.forEach(boton => {
    boton.addEventListener('change', function () {
        const todosLosContenedores = document.querySelectorAll('.con1');

        todosLosContenedores.forEach(contenedor => {
            contenedor.classList.remove('active');
        });

        const contenedorActual = this.closest('.con1');
        if (this.checked) {
            contenedorActual.classList.add('active');
        }
    });
});

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    limpiarErrores();

    const datosFormulario = new FormData(formulario);

    let montoPrestamo = datosFormulario.get("prestamo");
    let tasaInteres = datosFormulario.get("interes");
    let plazo = datosFormulario.get("años");

    let esValido = true;

    // Validar que los campos no estén vacíos
    if (estaVacio(montoPrestamo)) {
        esValido = false;
        etiqueta1.classList.add("errores_locos");
        entrada1.classList.add("errores_locos2");
        error1.classList.remove("hidden");
    } else {
        etiqueta1.classList.remove("errores_locos");
        entrada1.classList.remove("errores_locos2");
        error1.classList.add("hidden");
    }

    if (estaVacio(tasaInteres)) {
        esValido = false;
        etiqueta3.classList.add("errores_locos");
        entrada3.classList.add("errores_locos2");
        error3.classList.remove("hidden");
    } else {
        etiqueta3.classList.remove("errores_locos");
        entrada3.classList.remove("errores_locos2");
        error3.classList.add("hidden");
    }

    if (estaVacio(plazo)) {
        esValido = false;
        etiqueta2.classList.add("errores_locos");
        entrada2.classList.add("errores_locos2");
        error2.classList.remove("hidden");
    } else {
        etiqueta2.classList.remove("errores_locos");
        entrada2.classList.remove("errores_locos2");
        error2.classList.add("hidden");
    }

    if (!estaVacio(montoPrestamo) && !esNumeroPositivo(montoPrestamo)) {
        esValido = false;
        etiqueta1.classList.add("errores_locos");
        entrada1.classList.add("errores_locos2");
        errorExtra1.classList.remove("hidden");
    } else {
        errorExtra1.classList.add("hidden");
    }

    if (!estaVacio(tasaInteres) && !esFlotantePositivo(tasaInteres)) {
        esValido = false;
        etiqueta3.classList.add("errores_locos");
        entrada3.classList.add("errores_locos2");
        errorExtra3.classList.remove("hidden");
    } else {
        errorExtra3.classList.add("hidden");
    }

    if (!estaVacio(plazo) && !esEnteroPositivo(plazo)) {
        esValido = false;
        etiqueta2.classList.add("errores_locos");
        entrada2.classList.add("errores_locos2");
        errorExtra2.classList.remove("hidden");
    } else {
        errorExtra2.classList.add("hidden");
    }

    const tipoHipoteca = datosFormulario.get("mortgageType");
    if (!tipoHipoteca) {
        esValido = false;
        error4.classList.remove("hidden");
    } else {
        error4.classList.add("hidden");
    }

    if (esValido) {
        console.log("Datos del formulario válidos");

        if (tipoHipoteca === "repayment") {
            let pagoMensual = calcularPagoMensual(montoPrestamo, tasaInteres, plazo);
            let totalPago = (pagoMensual * plazo * 12).toFixed(2);

            document.querySelector(".titulo_mensual").textContent = "Sus pagos mensuales";
            document.querySelector(".pago_mensual").textContent = `Bs${parseFloat(pagoMensual).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            document.querySelector(".pago_total").textContent = `Bs${parseFloat(totalPago).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

            document.querySelector(".activa").classList.remove("d-none");
            document.querySelector(".pasiva").classList.add("d-none");
        } else {
            let pagoMensual = calcularPagoMensual(montoPrestamo, tasaInteres, plazo);
            let totalPago = (pagoMensual * plazo * 12).toFixed(2);
            let interes = calcularInteres(totalPago, montoPrestamo);
            let interesTotal = calcularIntTotal(interes, plazo);
            document.querySelector(".titulo_mensual").textContent = "Interés";
            document.querySelector(".pago_mensual").textContent = `Bs${parseFloat(interesTotal).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`;
            document.querySelector(".pago_total").textContent = `Bs${parseFloat(interes).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`;
            document.querySelector(".activa").classList.remove("d-none");
            document.querySelector(".pasiva").classList.add("d-none");
        }
    }
});

function estaVacio(valor) {
    return valor === "" || valor === null;
}

function esNumeroPositivo(valor) {
    return !isNaN(valor) && Number(valor) > 0;
}

function esFlotantePositivo(valor) {
    const regexFlotante = /^[+]?\d+(\.\d+)?$/;
    return regexFlotante.test(valor) && Number(valor) > 0;
}

function esEnteroPositivo(valor) {
    const regexEntero = /^[+]?\d+$/;
    return regexEntero.test(valor) && Number(valor) > 0;
}

// Función para limpiar los errores anteriores
function limpiarErrores() {
    etiqueta1.classList.remove("errores_locos");
    entrada1.classList.remove("errores_locos2");
    error1.classList.add("hidden");
    errorExtra1.classList.add("hidden");

    etiqueta2.classList.remove("errores_locos");
    entrada2.classList.remove("errores_locos2");
    error2.classList.add("hidden");
    errorExtra2.classList.add("hidden");

    etiqueta3.classList.remove("errores_locos");
    entrada3.classList.remove("errores_locos2");
    error3.classList.add("hidden");
    errorExtra3.classList.add("hidden");

    error4.classList.add("hidden");
}

// FUNCIONES
function calcularPagoMensual(prestamo, interesAnual, años) {
    let interesMensual = interesAnual / 12 / 100;
    let totalMeses = años * 12;
    let M = (prestamo * interesMensual * Math.pow(1 + interesMensual, totalMeses)) / (Math.pow(1 + interesMensual, totalMeses) - 1);
    return M.toFixed(2);
}

function calcularInteres(pagoTotal, capital) {
    return (pagoTotal - capital).toFixed(2);
}

function calcularIntTotal(interes, años) {
    let totalMeses = años * 12;
    return (interes / totalMeses);
}

document.querySelector('.limpiar').addEventListener('click', function() {
    formulario.reset();
    limpiarErrores();
    document.querySelector(".pago_mensual").textContent = '';
    document.querySelector(".pago_total").textContent = '';

    document.querySelector(".activa").classList.add("d-none");
    document.querySelector(".pasiva").classList.remove("d-none");

    const todosLosContenedores = document.querySelectorAll('.con1');
    todosLosContenedores.forEach(contenedor => {
        contenedor.classList.remove('active');
    });
});
