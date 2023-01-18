const monedaUno = document.getElementById("moneda-uno");
const monedaDos = document.getElementById("moneda-dos");
const cantidadUno = document.getElementById("cantidad-uno");
const cantidadDos = document.getElementById("cantidad-dos");
const cambio = document.getElementById("cambio");
const taza = document.getElementById("taza");

function calculate(){
    const moneda_pri = monedaUno.value;
    const moneda_sec = monedaDos.value;

    fetch(`https://open.er-api.com/v6/latest/${moneda_pri}`)
    .then(res => res.json() )
    .then(data => {
        const taza = data.rates[moneda_sec];

        cambio.innerText = `1 ${moneda_pri} = ${taza} ${moneda_sec}`;

        cantidadDos.value = (cantidadUno.value * taza).toFixed(2);
    });
}


// event listeners
monedaUno.addEventListener("change", calculate);
cantidadUno.addEventListener("input", calculate);
monedaDos.addEventListener("change", calculate);
cantidadDos.addEventListener("input", calculate);

taza.addEventListener("click", () => {
    const temp = monedaUno.value;
    monedaUno.value = monedaDos.value;
    monedaDos.value = temp;
    calculate();
});

calculate();

