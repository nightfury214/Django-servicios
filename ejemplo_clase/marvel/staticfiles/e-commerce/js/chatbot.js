/* Meme */

var welcomeMessage = '¡Bienvenido!';

var welcome = document.querySelector("#welcome");

welcome.innerHTML = welcomeMessage;

/* Time */

var deviceTime = document.querySelector(".status-bar .time");
var messageTime = document.querySelectorAll(".message .time");

deviceTime.innerHTML = moment().format("h:mm");

setInterval(function () {
  deviceTime.innerHTML = moment().format("h:mm");
}, 1000);

for (var i = 0; i < messageTime.length; i++) {
  messageTime[i].innerHTML = moment().format("h:mm A");
}

/* Message */

var form = document.querySelector(".conversation-compose");
var conversation = document.querySelector(".conversation-container");

form.addEventListener("submit", newMessage);

// Esta función maneja los mensajes recibidos por el cliente y hace el request al chatbot
function newMessage(e) {
  var input = e.target.input;

  if (input.value) {
    //   input.value es el string que envió el cliente
    var message = buildMessage(input.value);
    conversation.appendChild(message);
    animateMessage(message);
    // Acá hay que hacer el request
    var url = "/e-commerce/chatbot/test?message="+input.value;
    fetch(url)
      .then((response) => response.json())
      .then((data)=> responseMessage(data.message));
  }

  input.value = "";
  conversation.scrollTop = conversation.scrollHeight;

  e.preventDefault();
}

function responseMessage(text){
    message = buildResponse(text);
    conversation.appendChild(message);
    animateMessage(message);
    conversation.scrollTop = conversation.scrollHeight;
}

// Esta función construye el mensaje del cliente en la pantalla
function buildMessage(text) {
  var element = document.createElement("div");

  element.classList.add("message", "sent");

  element.innerHTML =
    text +
    '<span class="metadata">' +
    '<span class="time">' +
    moment().format("h:mm A") +
    "</span>" +
    '<span class="tick tick-animation">' +
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck" x="2047" y="2061"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#92a58c"/></svg>' +
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7"/></svg>' +
    "</span>" +
    "</span>";

  return element;
}

function animateMessage(message) {
  setTimeout(function () {
    var tick = message.querySelector(".tick");
    tick.classList.remove("tick-animation");
  }, 500);
}

// Esta función construye la respuesta recibiendo como parámetro el texto.
function buildResponse(text) {
  var element = document.createElement("div");

  element.classList.add("message", "received");
  element.innerHTML =
    text +
    '<span class="metadata">' +
    '<span class="time">' +
    moment().format("h:mm A");

  return element;
}
