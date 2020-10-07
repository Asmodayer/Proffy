//Dados 
const proffys = [
    {
        name: "Diego Fernandes", 
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsapp: "89987654534",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject: "Química", 
        cost: "20", 
        weekday: [
            0
        ],
        time_from: [720], 
        time_to: [1220]
    },
    {
        name: "Daniele Evangelista", 
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsapp: "89987654534",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject: "Química", 
        cost: "20", 
        weekday: [
            1
        ],
        time_from: [720], 
        time_to: [1220]
    },
    {
        name: "Mayk Brito", 
        avatar: "https://avatars2.githubusercontent.com/u/6643122?s=460&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4", 
        whatsapp: "89987654534",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject: "Química", 
        cost: "20", 
        weekday: [
            1
        ],
        time_from: [720], 
        time_to: [1220]
    }
]
const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]  
const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]



//Funcionalidades

function getSubject(subjectNumber) {
    const position = +subjectNumber -1
    return subjects[position]
}

function pageLanding(req, res) {
    return res.render("index.html")
}

function pageStudy(req, res) {
    const filters = req.query
    return res.render("study.html", { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res) {
    const data = req.query
    
    //Se tiver data
    const IsNotEmpty = Object.keys(data).length > 0
    if (IsNotEmpty) {

        data.subject = getSubject(data.subject)
        //Adicionar data a lista de Proffys
     proffys.push(data)

     return res.redirect("/study")
    }
    //Se não tiver, Mostrar a pagina

    return res.render("give-classes.html", {subjects, weekdays})
}

//Servidor
const express = require('express') /* O segundo () informa a função está retornando um valor mesmo que vazio. É obrigatório o segundo ()  */
/* node src/server.js no terminal roda o servidor */
const server = express ()


//Configurar Nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

//Inicio e configuração do Servidor
server
//Configurar arquivos estárticos (css, scripts, imagens)
.use(express.static("public")) /* rotas da aplicação / Sempre que usar .use quer dizer que estamos fazendo uma configuração para o nosso servidor */
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
//Start do Servidor
.listen(5500)

