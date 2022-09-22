'use strict'

const campo = document.getElementById("cep")

async function buscaCep() {
    const cep = document.getElementById("cep").value

    let url = `https://viacep.com.br/ws/${cep}/json/`
    try {
        const response = await fetch(url)
        const jsonResp = await response.json()

        let campos = document.querySelectorAll("input").length

        for (let i = 1; i < campos; i++) {
            let campo = document.querySelectorAll("input")[i].id

            document.getElementById(campo).value = jsonResp[campo]
                // document.getElementById('bairro').value = jsonResp.bairro
                // document.getElementById('logradouro').value = jsonResp.logradouro
                // document.getElementById('localidade').value = jsonResp.localidade
                // document.getElementById('uf').value = jsonResp.uf

        }

    } catch (e) {
        console.log(`Deu erro ${e}`)
        console.log(response);
    }
}


// window.addEventListener("load", carrega)
window.addEventListener("load", () => {
    document.getElementById("cep").addEventListener("focusout", () => {
        buscaCep()
    })
})