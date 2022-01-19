function el(e){
    return document.getElementById(e)
}

// function alteraPag(ref){

//     pages = document.querySelectorAll('[id^=sec__]')

//     for(i=0; i<pages.length; i++){

//   if(pages[i].id.replace('sec__', 'nav__') == ref){
//       el(pages[i].id.replace('sec__', 'nav__')).classList.add('nav__active')
//   }else{
//       el(pages[i].id.replace('sec__', 'nav__')).classList.remove('nav__active')
//   }

//     }

    
// }

function elin(e, d, add){
    if(add == true){
        el(e).innerHTML += d
    }else{
        el(e).innerHTML = d
    }
}

function mudaTech(ref, post){
    
    techIcons = document.querySelectorAll(`[id^=icon${post}__]`)

    for(i=0; i<techIcons.length; i++){

    if(techIcons[i].id == ref){
        el(techIcons[i].id).classList.add('techIconsActive')
    }else{

            el(techIcons[i].id).classList.remove('techIconsActive')
        }
    }

    techDesc(ref, post)
}

function techDesc(ref, post){
    ref = ref.replace(`icon${post}__`, `desc${post}__`)

    tecnologias = document.querySelectorAll(`[id^=desc${post}__]`)

    for(i=0; i<tecnologias.length; i++){

        if(tecnologias[i].id == ref){
            el(tecnologias[i].id).classList.add('demoTechDescActive')
        }else{
            el(tecnologias[i].id).classList.remove('demoTechDescActive')
        }

    }
}

function enviaWhats(obj){

    final = `*Nome:*%0A${obj.nome}%0A%0A*E-mail:*%0A${obj.email}%0A%0A*Assunto:*%0A${obj.assunto}%0A%0A*Mensagem:*%0A${obj.mensagem}%0A%0A*Powered By: Henrique Higa:*%0A`

    final.replace(' ', '%20')

    window.open(
        `https://api.whatsapp.com/send?phone=5511950821717&text=${final}`)

    apagaCampos()

    alert('Mensagem enviada! Retornarei em breve. Obrigado pelo contato! :)')
}

function enviaEmail(obj){

    el('buttonsDiv').innerHTML = '<div class="loader">Enviando...</div>'

    db.collection('email').add({
        obj
    }).then(()=>{
        
        apagaCampos()

        el('buttonsDiv').innerHTML = `

        <button onclick="enviaEmail()">Via E-mail <i class="far fa-envelope"></i></button>
        <button onclick="enviaWhats()">Via Whats <i style="color: green;" class="fab fa-whatsapp"></i></button>
        `

        alert('E-mail enviado! Retornarei em breve. Obrigado pelo contato! :)')

        document.location.reload(true);
    })
}


function verificaCampos(type){

    conteudo = {
        nome : el('form__nome').value,
        email : el('form__email').value,
        telefone : el('form__tel').value,
        assunto : el('form__assunto').value,
        mensagem : el('form__msg').value,
        timestamp : Date.now()
    }

    if(conteudo.nome == ''){
        alert('Por favor informe um nome!')
    }else if(conteudo.email == ''){
        alert('Por favor informe um meio de contato!')
    }else if(conteudo.assunto == ''){
        alert('Por favor informe um assunto!')
    }else if(conteudo.assunto == ''){
        alert('Por favor informe um assunto!')
    }else if(conteudo.mensagem == ''){
        alert('Por favor informe a sua mensagem!')
    }else{

        if(type == 'whats'){
            enviaWhats(conteudo)
        }else if(type == 'email'){
            enviaEmail(conteudo)
        }

    }

}

function apagaCampos(){

    campos = document.querySelectorAll('[id^=form__]')

    for(i=0; i<campos.length; i++){
        el(campos[i].id).value = ''
    }
    
}

funcoes = {
    criarCards : function(cards) {
        for(i=0; i<cards.length; i++){
    
            el('cardsPlaceholder').innerHTML += `
            
                <div style="
                max-width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 37px 10px;
                position: relative;
                overflow: hidden;
                box-shadow: 0px 4px 13px -4px rgba(0, 0, 0, 0.49);
                border-radius: 20px;
                border: solid 0.5px ${cards[i].cor}; 
                " class="roadmap__card cardMob">
    
                    <div style="width: 100%;
                    height: 40px
                    
                    ;display: flex
                    ;justify-content: center
                    ;align-items: center
                    ;background: ${cards[i].cor} 
                    
                    ;position: absolute
                    ;top: 0
                    ;left: 0
                    " class="cardroadmap__header">
                        <h1>${cards[i].titulo}</h1>
                    </div>
    
                    <div class="cardroadmap__content">
    
    
                        <div id="linguagens__${(i+1)}" class="linguagens">
    
                        </div>
    
                        <div class="cardroadmap__descCard" style="min-height: 200px; max-height: 50px; overflow: auto; display: flex; justify-content: flex-end; flex-direction: column;">
                        <b>Observação:</b>
                            <p style="max-height: 160px; overflow: auto">${cards[i].descricao}</p>
                        </div>
    
                    </div>
    
                    <div style="width: 64px
                    ;height: 64px
                    ;position: absolute
                    ;bottom: -32px
                    ;left: calc( 50% - 32px )
                    ;border-radius: 50%
                    ;display: flex
                    ;justify-content: center
                    ;align-items: flex-start
                    ;background: linear-gradient(289.17deg, ${cards[i].cor} -12.91%, rgba(196, 196, 196, 0) 123.98%)
                    " class="roadmap__ball">
                        <h2>${(i+1)}</h2>
                    </div>
    
                </div>
    
            `
    
            for(a=0; a<(cards[i].tecnologiasEstudo).length; a++){
                    el('linguagens__'+(i+1)).innerHTML += `
                    <div class="cardroadmap__tech" style="display: flex; flex-direction: column; width: 100%; height: auto; margin: 15px 0">
                        <div style="display: flex; width: 100%;margin-bottom: 5px; align-items: center;">
                            <b>${cards[i].tecnologiasEstudo[a].nome} <i class="${cards[i].tecnologiasEstudo[a].type}  fa-${cards[i].tecnologiasEstudo[a].id} "></i></b>  
                        </div>
    
                        <div style="width: 100%; background-color: ${cards[i].cor}; height: 9px;border-radius: 31px;">
                            <span style="width: ${cards[i].tecnologiasEstudo[a].porcentagem}%; background-color: #506a89; height: 100%; display: block;border-radius: 31px;"></span>
                        </div>
                    </div>
                    `
            }
        }
    
    },

    criarProjetos : function (obj) {
        for(i=0; i<obj.length; i++){

            if(i == 0){
                el('main__proj').innerHTML += `

                <div class="cardProj">
    
                <div class="infoProj">
    
                    <span class="infoTitle">
                        <h1>${obj[i].titulo}</h1>
    
                        <div class="tituloIcons">
                            <i class="fas fa-circle"></i>
                            <i style="color: #506a89;" class="fas fa-circle"></i>
                            <i style="color: #132949;" class="fas fa-circle"></i>
                        </div>
                    </span>
    
                    <div class="projContent">
                        
                        <div>
    
                            <p>${obj[i].desc} </p>
    
                        </div>
                        
                    </div>
    
                    <div class="projTec">
                        <h3>Tecnologias utilizadas:</h3>
    
                        <div id="tecIcons__${obj[i].id}" class="tecIcons">
    
                        </div>
    
                        <div id="tecDesc__${obj[i].id}" class="demoTech">
    
                        </div>
                    </div>
                </div>

                <div class="demoProj">
    
                    <div class="demoImg">
                    <img src="${obj[i].preview}" alt="">
                    </div>
    
                    <div class="demoDesc">
                        <a href="${obj[i].referencias[0].github}" target="__blank"><i class="fab fa-github"></i></a>
                        <a href="${obj[i].referencias[0].link}" target="__blank"><i class="fas fa-external-link-alt"></i></a>
                    </div>
    
                </div>
    
            </div>
            `

            elin('mobilePosition', `<div class="demoProjMobile">

            <div class="demoImg">
                <img src="${obj[i].preview}" alt="">

                <div id="refIcon__${obj[i].id}" class="demoDesc">
                <a href="${obj[i].referencias[0].github}" target="__blank"><i class="fab fa-github"></i></a>
                <a href="${obj[i].referencias[0].github}" target="__blank"><i class="fas fa-external-link-alt"></i></a>
                </div>
            </div>

            

        </div>`, false)
    
            for(a=0; a<(obj[i].tecnologias).length; a++){
    
                el(`tecIcons__${obj[i].id}`).innerHTML += `
    
                    <i onclick="mudaTech(this.id, '${obj[i].id}')" id="icon${obj[i].id}__${obj[i].tecnologias[a].id}" class="${obj[i].tecnologias[a].icontype} fa-${obj[i].tecnologias[a].id} ${obj[i].tecnologias[a].active}"></i>
                
                `
    
                el(`tecDesc__${obj[i].id}`).innerHTML += `
                
                    <div class="demoTechDesc ${obj[i].tecnologias[a].activeTxt}" id="desc${obj[i].id}__${obj[i].tecnologias[a].id}">
                        <h1>${obj[i].tecnologias[a].nome}</h1>
                        <p>${obj[i].tecnologias[a].desc}</p>
                    </div>
    
                `
            }
            }else{
                el('small__proj').innerHTML += `
                    <div onclick="mostraInfo(this.id, '${i}')" id="smallProj__${i}" onmouseout="removeClass(this.id, '${i}')" onmouseover="growupTitle(this.id, '${i}')" class="smallProj__square">

                        <img src="${obj[i].preview}" alt="">

                        <div id="smallProjTitle__${i}" class="smallProj__title">
                            <b>${obj[i].titulo}</b>
                        </div>

                        
                        
                    </div>
                `
            }

        }
    }
}

function growupTitle(e, index){

    el(e).classList.add('squareOp')
    el('smallProjTitle__'+index).classList.add('titleGrowUp')

}

function removeClass(e, index){
    el(e).classList.remove('squareOp')
    el('smallProjTitle__'+index).classList.remove('titleGrowUp')
}

function mostraInfo(e, index){
    el(e).classList.add('')
}

function navMobile(e){

    if((el(e).classList).contains('nav-mobile-on')){
        el(e).classList.remove('nav-mobile-on')
        el('footer-content').style.marginBottom = '0'
    }else{
        el(e).classList.add('nav-mobile-on')
        el('footer-content').style.marginBottom = '30px'
    }
    
}

function navMobileClose(e){
    el(e).classList.remove('nav-mobile-on')
    el('footer-content').style.marginBottom = '0'
}

VMasker(el('form__tel')).maskPattern('(99) 9 9999-9999')