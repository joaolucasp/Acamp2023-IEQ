// function sendEmail() {
//     Email.send({
//     Host: "smtp.gmail.com",
//     Username: "contato.regionalgmj513",
//     Password: "ieqgmj513",
//     To: 'wmarcondesbr@gmail.com',
//     From: "contato.regionalgmj513@gmail.com",
//     Subject: "Sending Email using javascript",
//     Body: "Well that was easy!!",
//     })
//     .then(function (message) {
//         alert("mail sent successfully")
//     });
// }
function enviarEmail() {
    var email = "exemplo@email.com";
    var assunto = "Olá!";
    var corpo = "Este é um email de teste enviado usando JavaScript.";
    window.open("mailto:" + email + "?subject=" + assunto + "&body=" + corpo);
  }