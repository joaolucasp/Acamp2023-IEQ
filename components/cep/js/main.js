'use strict'

const field = document.getElementById("zip")

async function zipSearch() {
    const cep = document.getElementById("zip").value

    let url = `https://viacep.com.br/ws/${cep}/json/`
    try {
        const response = await fetch(url)
        const jsonResp = await response.json()

        //let fields = document.querySelectorAll("input").length

        //for (let i = 1; i < fields; i++) {
            //let field = document.querySelectorAll("input")[i].id

            //document.getElementById(field).value = jsonResp[field]
            //}     
            
            //document.getElementById('number').value = ''
            document.getElementById('bairro').value = jsonResp.bairro
            document.getElementById('logradouro').value = jsonResp.logradouro
            document.getElementById('localidade').value = jsonResp.localidade
            document.getElementById('uf').value = jsonResp.uf
            document.getElementById('number').focus()
    } catch (e) {
        console.log(`Error ${e}`)
        console.log(response);
    }
}


// window.addEventListener("load", carrega)
window.addEventListener("load", () => {
    document.getElementById("zip").addEventListener("keyup", () => {
        zipSearch()
    })
})