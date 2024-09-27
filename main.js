/* ELEMENTOS LLAMADOS DESDE HTML */
const radios=document.querySelectorAll(".inrad")
const form=document.querySelector("#mortgageForm")

/* primeros input spam */
const span1=document.querySelector("#addon-wrapping")
const inp1=document.querySelector("#inp1")
const emer1=document.querySelector("#emer1")
const emer11=document.querySelector("#emer11")
/* segundos */
const span2=document.querySelector("#basic-addon2")
const inp2=document.querySelector("#inp2")
const emer2=document.querySelector("#emer2")
const emer22=document.querySelector("#emer22")
/* terceros */
const span3=document.querySelector("#basic-addon3")
const inp3=document.querySelector("#inp3")
const emer3=document.querySelector("#emer3")
const emer33=document.querySelector("#emer33")
/* cuartos */
const emer4=document.querySelector("#emer44")
/* ELEMENTOS QUE TIENEN SU ESCUCHADOR DE EVENTOS */
for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener('change', function() {

        const allContainers = document.querySelectorAll('.con1');

        for (let j = 0; j < allContainers.length; j++) {
            allContainers[j].classList.remove('active');
        }
        const con1 = this.closest('.con1');
        if (this.checked) {
            con1.classList.add('active');
        }
    });
}


form.addEventListener("submit", (e) => {
    e.preventDefault();
    
 
    clearErrors();

    const formdata = new FormData(form);


    let mon_prest = formdata.get("prestamo");
    let tas_int = formdata.get("interes");
    let plazo = formdata.get("años");
  
    

    let isValid = true;

    // Validar que los campos no estén vacíos
    if (isEmpty(mon_prest)) {
        isValid = false;
        span1.classList.add("errores_locos")
        inp1.classList.add("errores_locos2")
        emer1.classList.remove("hidden")
    }else{
        span1.classList.remove("errores_locos")
       inp1.classList.remove("errores_locos2")
       emer1.classList.add("hidden")
    }

    if (isEmpty(tas_int)) {
        isValid = false;
        span3.classList.add("errores_locos")
       inp3.classList.add("errores_locos2")
       emer3.classList.remove("hidden")
    }else{
        span3.classList.remove("errores_locos")
        inp3.classList.remove("errores_locos2")
        emer3.classList.add("hidden")
    }

    if (isEmpty(plazo)) {
        isValid = false;
        span2.classList.add("errores_locos")
       inp2.classList.add("errores_locos2")
       emer2.classList.remove("hidden")
    }else{
        span2.classList.remove("errores_locos")
        inp2.classList.remove("errores_locos2")
        emer2.classList.add("hidden")
    }

  
    if (!isEmpty(mon_prest) && !isPositiveNumber(mon_prest)) {
        isValid = false;
        span1.classList.add("errores_locos")
        inp1.classList.add("errores_locos2")
        emer11.classList.remove("hidden")
    }else{
        emer11.classList.add("hidden")
    }
  
    if (!isEmpty(tas_int) && !isPositiveFloat(tas_int)) {
        isValid = false;
        span3.classList.add("errores_locos")
       inp3.classList.add("errores_locos2")
       emer33.classList.remove("hidden")
    }else{
        emer33.classList.add("hidden")
    }

   
    if (!isEmpty(plazo) && !isPositiveInteger(plazo)) {
        isValid = false;
        span2.classList.add("errores_locos")
        inp2.classList.add("errores_locos2")
        emer22.classList.remove("hidden")
    }else{
        emer22.classList.add("hidden")
    }

    const mortgageType = formdata.get("mortgageType");
    if (!mortgageType) {
        isValid = false;
        emer4.classList.remove("hidden")
    }else{
        emer4.classList.add("hidden")
    }

    if (isValid) {
        console.log("Valid form data");
 

        if (mortgageType === "repayment") {
            let pagoMensual=calcularPagoMensual(mon_prest,tas_int,plazo)

        let totalPago = (pagoMensual * plazo * 12).toFixed(2);

        document.querySelector(".titulo_mensual").textContent="Your monthly repayments"
        document.querySelector(".pago_mensual").textContent = `Bs${parseFloat(pagoMensual).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        document.querySelector(".pago_total").textContent = `Bs${parseFloat(totalPago).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;


        document.querySelector(".activa").classList.remove("d-none");
        document.querySelector(".pasiva").classList.add("d-none");
        }else{
            let pagoMensual=calcularPagoMensual(mon_prest,tas_int,plazo)

           let totalPago = (pagoMensual * plazo * 12).toFixed(2);
            let interes = calcularInteres(totalPago,mon_prest);
            document.querySelector(".titulo_mensual").textContent="interes"
            document.querySelector(".pago_mensual").textContent =  `Bs${parseFloat(interes).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`;
            document.querySelector(".pago_total").textContent = `Bs${parseFloat(totalPago).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`;
            document.querySelector(".activa").classList.remove("d-none");
            document.querySelector(".pasiva").classList.add("d-none");
        }

        
    }
});


function isEmpty(value) {
    return value === "" || value === null;
}

function isPositiveNumber(value) {
    return !isNaN(value) && Number(value) > 0;
}


function isPositiveFloat(value) {
    const floatRegex = /^[+]?\d+(\.\d+)?$/;
    return floatRegex.test(value) && Number(value) > 0;
}

function isPositiveInteger(value) {
    const intRegex = /^[+]?\d+$/;
    return intRegex.test(value) && Number(value) > 0;
}


// Función para limpiar los errores anteriores
function clearErrors() {
   
    span1.classList.remove("errores_locos");
    inp1.classList.remove("errores_locos2");
    emer1.classList.add("hidden");
    emer11.classList.add("hidden");

    span2.classList.remove("errores_locos");
    inp2.classList.remove("errores_locos2");
    emer2.classList.add("hidden");
    emer22.classList.add("hidden");

    span3.classList.remove("errores_locos");
    inp3.classList.remove("errores_locos2");
    emer3.classList.add("hidden");
    emer33.classList.add("hidden");

    emer4.classList.add("hidden");
}




/* FUNCIONES */
function calcularPagoMensual(P, int_anual, n_años) {
    let int_mensual = int_anual / 12 / 100;
    let n_total = n_años * 12;
    let M = (P * int_mensual * Math.pow(1 + int_mensual, n_total)) / (Math.pow(1 + int_mensual, n_total) - 1);

    return M.toFixed(2);  
}
function calcularInteres(p_total,capital) {
   
    return (p_total-capital).toFixed(2);  
}


document.querySelector('.limpiar').addEventListener('click', function() {
    form.reset(); 
    clearErrors(); 
    document.querySelector(".pago_mensual").textContent = '';
    document.querySelector(".pago_total").textContent = '';

    document.querySelector(".activa").classList.add("d-none"); 
    document.querySelector(".pasiva").classList.remove("d-none")
    const allContainers = document.querySelectorAll('.con1');

    for (let j = 0; j < allContainers.length; j++) {
        allContainers[j].classList.remove('active');
    }
});
