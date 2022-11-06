let home = document.getElementById("Home");
let form = document.getElementById("Form");
let loading = document.getElementById("Loading");
let carousel = document.getElementById("carousel");
let modal = document.getElementById("modal");
let verResultados = document.getElementById("listaResultados");
let volverAJugar = document.getElementById("volverAJugar");
let error = document.getElementById("error");
let imagenes = document.querySelector('#carousel-inner');
let resultadosText = document.getElementById("resultadosText")
let resultadosInner = document.getElementById("resultadosInner")
let resultados = document.getElementById('resultados')
let guardarPartida = document.getElementById('btnGuardar') 
let inicio = document.getElementById('btnIsAlInicio')
let partidasGuardadas = document.getElementById('juegos-guardados')
let verMas= document.getElementById("verMas")
let description = document.querySelector('#description')

let player1 = "";
let player2 = "";
let tempCards = [];
let guardada = false;
let active = "";
let match = false;
let suma = 0
let newCards = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  player1 = e.target.Player1.value;
  player2 = e.target.Player2.value;

  error.innerHTML = "";
  if (player1 && player2) {
    let time = setTimeout(() => startGame(), 3000);
    loading.style.display = "block";
    home.style.display = "none"; 
    lista1.style.display = "none"
  } else {
    loading.style.display = "none";
    error.innerHTML = "Por favor completa ambos nombres";
  }
});

const startGame = () => {
  carousel.style.display = "flex";
  while (newCards.length < 6) {
    random = Math.floor(Math.random() * cards.length);
    if (newCards.indexOf(cards[random]) == -1) {
      newCards.push(cards[random]);
      loading.style.display = "none";
      //resultadosText= ''
     // partidasGuardadas.style.display = "none";
    }
  } 
  iterarCartas(newCards);
  tempCards.push(newCards) 
};


  const iterarCartas = (cards) => {
    cards.forEach((card, index) => {
      if (index === 0) active = "active";
      else active = "";
      //partidasGuardadas.style.display = "none";

      if (index < 3) {
        imagenes.innerHTML += `<div class="carousel-item ${active} card-${index}">
            <h1><span>🃏</span> Carta 
            ${index +1}/3 de ${player1} <span></span></h1>
                    <img src="${card.images}" class="d-block w-100" alt="...">
                    <div class="carousel-caption d-block d-md-block">
                    <h5>${card.fullname}</h5>
                    <p>${card.description}</p>
                    </div>`;
      } else {
        imagenes.innerHTML += `<div class="carousel-item ${active} card-${index}">
            <h1><span>🃏</span> Carta 
            ${index - 2}/3 de ${player2} <span></span></h1>
                    <img src="${card.images}" class="d-block w-100" alt="...">
                    <div class="carousel-caption d-block d-md-block">
                    <h5>${card.fullname}</h5>
                    <p>${card.description}</p>
                    </div>`;
      }

      suma = suma + cards.id
      if (suma % 2 == 0) {
        match = true
      } else {
        match= false
      }
      console.log(suma)
    });

    loading.style.display = "none";

    //localStorage.setItem('newCards', JSON.stringify(newCards));
   // console.log(JSON.parse(localStorage.getItem('newCards')));
  }

  const vaciarTodo = () => {
    imagenes = ''
    player1 = ''
    player2 = ''
    tempCards = []
    resultadosText = ''
  }

resultados.addEventListener('click', ()=> {
  //let backDrop = document.querySelector('.modal-backdrop')
  console.log(tempCards)
  verResultados.classList.remove("display-none")
  verResultados.classList.add("display-block")
  //modal.style.display ="none";
  carousel.style.display ="none";
 // backDrop.classList.remove('show')
  home.classList.display ="none";
  //home.classList.remove("display-flex")
  //guardarPartida.classList.display = "none";

 resultadosText.innerHTML += `<p>Este es el resultado de la partida entre ${player1} y ${player2}</p>
 <h3 class="cartas-player1">Cartas de ${player1}</h3>
 <div class="resultados-img">
     <img src="${tempCards[0][0].images}" class="imagenResultado" style= "width:125px; height:200px" alt="carta de player1">
     <img src="${tempCards[0][1].images}" class="imagenResultado" style= "width:125px; height:200px" alt="carta de player1">
     <img src="${tempCards[0][2].images}" class="imagenResultado" style= "width:125px; height:200px" alt="carta de player1">
 </div>
 <h3 class="cartas-player2">Cartas de ${player2}</h3>
 <div class="resultados-img">
     <img src="${tempCards[0][3].images}" class="imagenResultado" style= "width:125px; height:200px" alt="carta de player2">
     <img src="${tempCards[0][4].images}" class="imagenResultado" style= "width:125px; height:200px" alt="carta de player2">
     <img src="${tempCards[0][5].images}" class="imagenResultado" style= "width:125px; height:200px" alt="carta de player2">
 </div>`
})

modal.addEventListener('click', (e)=> {
//  let backDrop = document.querySelector('.modal-backdrop')
//  //home.style.display = "block";
//  modal.style.display ="none";
//  backDrop.classList.remove('modal-backdrop')
  form.reset()
  //resultadosText.innerHTML = ''
})
console.log(tempCards)

volverAJugar.addEventListener('click', ()=> {
 // modal.style.display ="none";
  carousel.style.display ="none";
  home.style.display = "flex";
  form.reset()
  imagenes.innerHTML=''
  newCards = ''
  resultadosText.innerHTML = ''
  tempCards = []
})

let lista1= document.querySelector('#lista1')

guardarPartida.addEventListener('click', function(){
  let partidaAGuardar = [{player1: player1, player2: player2, match: true,
    partida: tempCards}]
  //partidasGuardadas.classList.remove("display-none")
  //partidasGuardadas.classList.add("display-flex")
  let description = document.getElementById("description")
  description.classList.remove("display-none");
  form.reset()
  home.style.display = "block";
  verResultados.style.display = "none";
  imagenes.innerHTML=''
  console.log(partidaAGuardar)

  partidasGuardadas.innerHTML += `<div><h2>Este es el resultado entre ${player1} y ${player2}</h2>
  </div>`
})

const partidaGuardada = () => {
  let partidaAguardar = [{player1: player1, player2: player2, match: true,
  partida: tempCards}]
  
  imagenes.innerHTML=''
  home.style.display = "flex";
  carousel.style.display = "none";

  //console.log(partidaAGuardar)
  partidasGuardadas.push(partidaAguardar)
  partidasGuardadasList()
  console.log(partidasGuardadasList)
}

const partidasGuardadasList = () => {

}

inicio.addEventListener('click', ()=>{
  home.style.display = "flex";
  verResultados.style.display ="none";
  //tempCards.innerHTML='';
  //newCards.innerHTML='';
  imagenes.innerHTML=''
  resultadosText.innerHTML=''
})




/*verMas.addEventListener('click', (e)=>{
  if (e.target.getAttribute('data-pos')) {

    player1 = e.target.getAttribute('data-player1')
    player2 = e.target.getAttribute('data-player2')
    match = e.target.getAttribute('data-match')
    pos = e.target.getAttribute('data-pos')
    guardada = true
    partidasGuardadas.style.add("display-flex")
  }
})
*/




