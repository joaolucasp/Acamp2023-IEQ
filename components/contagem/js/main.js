var data = '2022/09/30';
var falta = (new Date(data).getTime() - new Date().getTime()) / 1000;
var segundos = Math.round(falta % 60);
var minutos = Math.round(falta / 60 % 60);
var horas = Math.round(falta / 60 / 60 % 24);
var dias = Math.round(falta / 60 / 60 / 24);
var divs = document.querySelectorAll('div');

setInterval(function () {
    if (segundos == 0) {
        segundos = 60;
        minutos--;
    }
    if (minutos == 0) {
        minutos = 60;
        horas--;
    }
    if (horas == 0) {
        horas = 24;
        dias--;
    }
    segundos--;
    var contador = [dias, horas, minutos, segundos].forEach(function (parcela, i) {
        divs[i].innerHTML = parcela;
    });

}, 1000);