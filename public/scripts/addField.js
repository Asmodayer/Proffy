//procurar o botao
document.querySelector("#id-time")
.addEventListener('click', cloneField)
//quando clicar no bota


//executar uma ação
function cloneField() {
    //duplicar os comandos, que campos?
    const newFieldConteiner = document.querySelector('.schedule-item').cloneNode(true) //Quando vamos usar algo de HTML utilizamos Node

    //pegar os campos
    const fields = newFieldConteiner.querySelectorAll('input')

   //para cada campo, limpar
    fields.forEach(function(field) {
        //pegar o field do momento e limpa ele
        field.value = ""
    })

    //colocar na pagina, onde?
    document.querySelector('#schedule-items').appendChild(newFieldConteiner)
}
    

