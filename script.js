document.addEventListener('mousedown', function(event) {
  event.preventDefault();
});

document.addEventListener('touchstart', function(event) {
  event.preventDefault();
});

const imagesPath = [
  "./imgs/cards/6_of_clubs.png",
  "./imgs/cards/7_of_clubs.png",
  "./imgs/cards/8_of_clubs.png",
  "./imgs/cards/9_of_clubs.png",
  "./imgs/cards/10_of_clubs.png",
  "./imgs/cards/jack_of_clubs2.png",
  "./imgs/cards/queen_of_clubs2.png",
  "./imgs/cards/king_of_clubs2.png",
  "./imgs/cards/ace_of_clubs.png",

  "./imgs/cards/6_of_diamonds.png",
  "./imgs/cards/7_of_diamonds.png",
  "./imgs/cards/8_of_diamonds.png",
  "./imgs/cards/9_of_diamonds.png",
  "./imgs/cards/10_of_diamonds.png",
  "./imgs/cards/jack_of_diamonds2.png",
  "./imgs/cards/queen_of_diamonds2.png",
  "./imgs/cards/king_of_diamonds2.png",
  "./imgs/cards/ace_of_diamonds.png",

  "./imgs/cards/6_of_hearts.png",
  "./imgs/cards/7_of_hearts.png",
  "./imgs/cards/8_of_hearts.png",
  "./imgs/cards/9_of_hearts.png",
  "./imgs/cards/10_of_hearts.png",
  "./imgs/cards/jack_of_hearts2.png",
  "./imgs/cards/queen_of_hearts2.png",
  "./imgs/cards/king_of_hearts2.png",
  "./imgs/cards/ace_of_hearts.png",
  
  "./imgs/cards/6_of_spades.png",
  "./imgs/cards/7_of_spades.png",
  "./imgs/cards/8_of_spades.png",
  "./imgs/cards/9_of_spades.png",
  "./imgs/cards/10_of_spades.png",
  "./imgs/cards/jack_of_spades2.png",
  "./imgs/cards/queen_of_spades2.png",
  "./imgs/cards/king_of_spades2.png",
  "./imgs/cards/ace_of_spades2.png",
];

let timeoutId
let selectedCards = []
let myCards = []
let enCards = []
let dismissCards = []

const containerEl = document.querySelector(".container");

function addImagesToPage() {

  imagesPath.forEach((image) => {
    const div = document.createElement("div");
    const img = document.createElement("img");

    img.classList.add("cardImage");
    div.classList.add("cardDiv")

    img.src = image;

    div.appendChild(img);
    containerEl.appendChild(div);

    statusAnimation("Нажмите на карту")
  });
}

addImagesToPage();

function selectCards() {

  const cardImages = document.querySelectorAll(".cardImage")

  cardImages.forEach(cardImage => {
    cardImage.addEventListener("click", () => {
      if (cardImage.classList.contains("cardImageSelected")) {
        cardImage.classList.remove("cardImageSelected")
        statusAnimation("Карта убрана")

        let index = selectedCards.indexOf(cardImage)
        if (index > -1) {
          selectedCards.splice(index, 1)
        }
      } else {
        if(!cardImage.src.endsWith("back-side.jpg")){
          cardImage.classList.add("cardImageSelected")

          selectedCards.push(cardImage)
          
          statusAnimation("Выбрана Карта")
          if(selectedCards.length > 1) {
            statusAnimation("Выбраны Карты")
          }
        }
      }
    })
  })
}

selectCards()

function removeSelected() {
  const cardImages = document.querySelectorAll(".cardImageSelected")
  
  cardImages.forEach(el => {
    el.classList.remove("cardImageSelected")
  })

  selectedCards = []
}

function removeElementsBeforeDismiss(el) {
  const existingMyDiv = el.parentElement.querySelector(".myCard");
  const existingEnDiv = el.parentElement.querySelector(".enCard");
  if (existingMyDiv && existingEnDiv) {
    existingMyDiv.remove();
    existingEnDiv.remove();
  } else if (existingMyDiv) {
    existingMyDiv.remove();
  } else if (existingEnDiv) {
    existingEnDiv.remove();
  }
}

function removeElementsAfterSelecting() {
  const cardDivs = document.querySelectorAll(".cardDiv")

  cardDivs.forEach(el => {

    el.addEventListener("click", () => {
      if (el.querySelector(".myCard")) {
        let index = selectedCards.indexOf(el.querySelector(".cardImage"))
        selectedCards.splice(index, 1)
        el.removeChild(el.querySelector(".myCard"))
        el.querySelector(".cardImage").classList.remove("cardImageSelected")

        statusAnimation("Ваша Карта Удалена")
      } 
      else if (el.querySelector(".enCard")) {
        let index = selectedCards.indexOf(el.querySelector(".cardImage"))
        selectedCards.splice(index, 1)
        el.removeChild(el.querySelector(".enCard"))
        el.querySelector(".cardImage").classList.remove("cardImageSelected")

        statusAnimation("Карта Противника Удалена")
      }
    })
  })
}

removeElementsAfterSelecting()

function statusAnimation(statusText, err) {
  const statusEl = document.querySelector(".status")
  const statusDisplay = document.querySelector(".status-display")

  statusDisplay.textContent = statusText

  if (timeoutId) {
    clearTimeout(timeoutId)
  }

  statusEl.style.bottom = "20px"
  timeoutId = setTimeout(() => {
    statusEl.style.bottom = "-200px"
  }, 4500)

  if(err) {
    statusEl.classList.add("error");
    setTimeout(() => {
      statusEl.classList.remove("error");
    }, 500);
  }
}

document.querySelector(".newGameBtn").addEventListener("click", newGame);
document.querySelector(".myCardBtn").addEventListener("click", showMyCard);
document.querySelector(".enCardBtn").addEventListener("click", showEnCard);
document.querySelector(".dismissBtn").addEventListener("click", showDismissCard);

function showDismissCard() {

  if (selectedCards.length === 0) {
    statusAnimation("Выберите Карту", 'err')
  } else {
    selectedCards.forEach(el => {
      const existingDiv = el.parentElement.querySelector(".myCard");
      if (existingDiv) {
        existingDiv.remove();
      }
  
      el.src = "imgs/back-side.jpg"
      statusAnimation("Отбой")
  
      if (el.parentElement.querySelector(".myCard")) {
        el.parentElement.removeChild(el.parentElement.querySelector(".myCard"))
      } 
      else if (el.parentElement.querySelector(".enCard")) {
        el.parentElement.removeChild(el.parentElement.querySelector(".enCard"))
      }
    })
  
    removeSelected()
  }
}

function showMyCard() {

  if(selectedCards.length === 0) {
    statusAnimation("Выберите Карту", 'err')
  } else {
    selectedCards.forEach(el => {
      removeElementsBeforeDismiss(el)
  
      const div = document.createElement("div")
      div.classList.add("myCard")
      div.textContent = 'Моя'
      
      if(!el.src.endsWith("back-side.jpg")) {
        el.parentElement.appendChild(div)
      }
      
      statusAnimation("Добавили Вашу Карту")
    })
  
    removeSelected()
  }
}

function showEnCard() {

  if (selectedCards.length === 0) {
    statusAnimation("Выберите Карту", 'err')
  } else {
    selectedCards.forEach(el => {
      removeElementsBeforeDismiss(el)
  
      const div = document.createElement("div")
      div.classList.add("enCard")
      div.textContent = 'Противника'
  
      if(!el.src.endsWith("back-side.jpg")) {
        el.parentElement.appendChild(div)
      }
  
      statusAnimation("Добавили Карту Противника")
    })
    
    removeSelected()
  }
}

function newGame() {

  const cardImages = document.querySelectorAll(".cardImage")
  const myCardDiv = document.querySelectorAll(".myCard")
  const enCardDiv = document.querySelectorAll(".enCard")

  myCardDiv.forEach(el => {
    el.parentElement.removeChild(el)
  })

  enCardDiv.forEach(el => {
    el.parentElement.removeChild(el)
  })

  cardImages.forEach((el, idx) => {
    el.src = imagesPath[idx]
  })

  removeSelected()
  statusAnimation("Новая Игра")
}