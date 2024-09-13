/*
Játék szabályok:

- Ha egy játékos kétszer 6 ost dob egymás után, akkor az összes eddigi pontját elveszíti és a dobás joga a másik játékosra száll.
- Adjunk a programhoz egy olyan lehetőséget, hogy a felhasználói felületen meg lehessen
  adni, hogy a győztesnek hány pontot keljen elérni.
- Legyen még egy kocaka és ha az egyik kockával egyest dob akkor veszítse el a körbe elért pontszámát.

*/

var pontszamok, korPontszam, aktivJatekos, jatekFolyamatban, elozoDobas;


init();

// dobás gomb kezelője
document.querySelector('.btn-roll').addEventListener('click', function(){

      if (jatekFolyamatban) {
        // kell egy veletlen szam
      var kocka1 = Math.floor(Math.random() * 6) + 1;
      var kocka2 = Math.floor(Math.random() * 6) + 1;

      // eredmeny megjelenitese
    
      document.getElementById('dice-1').src = 'img/dice-' + kocka1 + '.png';
      document.getElementById('dice-2').src = 'img/dice-' + kocka2 + '.png';

      kockaKiBeKapcsolas('be');

      if (kocka1 !== 1 && kocka2 !== 2) { // korben elért pontszám frissítése, ha nem 1-et dobunk
        // itt adjuk hozzá az akt. ponthoz
        korPontszam += kocka1 + kocka2;
        document.querySelector('#current-' + aktivJatekos).textContent = korPontszam;
  
      } else {
        // következő játékos
        kovetkezoJatekos();
        }
      
      /*
      if (kocka === 6 && elozoDobas === 6) {
        // A játékos elveszíti az összes pontszámát
        pontszamok[aktivJatekos] = 0;

        // összes pontszám frissítése a felületen(UI)
        document.querySelector('#score-' + aktivJatekos).textContent = 0;

        // következő játékos
        kovetkezoJatekos();

      }else 
    elozoDobas = kocka;*/
    }
});

// megtartom gomb esemény kezelője
document.querySelector('.btn-hold').addEventListener('click', function() {

  if (jatekFolyamatban) {
     // összes pontszám frissítése a kódban
  pontszamok[aktivJatekos] += korPontszam;

  // összes pontszám frissítése a felületen(UI)
  document.querySelector('#score-' + aktivJatekos).textContent = pontszamok[aktivJatekos];

  var elerendoPontszam = document.querySelector('.elerendo-pontszam').value;
  console.log(elerendoPontszam);

  // hamis: 0, "", null, undefined,
  // igaz: minden más

  /*if (!elerendoPontszam || isNaN(elerendoPontszam)) {
    elerendoPontszam = 15;
  }*/

  if (elerendoPontszam && !isNaN(elerendoPontszam)) {
    elerendoPontszam = elerendoPontszam;
  } else {
    elerendoPontszam = 15;
  }

  // nyert a játékos?

    if (pontszamok[aktivJatekos] >= elerendoPontszam) {
      document.querySelector('#name-' + aktivJatekos).textContent = 'Győztes';
      document.querySelector('.player-' + aktivJatekos + '-panel').classList.add('winner');
      document.querySelector('.player-' + aktivJatekos + '-panel').classList.remove('active');
      jatekFolyamatban = false;
    } else {
      // következő játékos
      kovetkezoJatekos();
    }
  }
});

// következő játékos
function kovetkezoJatekos() {
  aktivJatekos === 0 ? aktivJatekos = 1 : aktivJatekos = 0;
  korPontszam = 0;

  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  kockaKiBeKapcsolas('ki');
}

//új játék indítása

document.querySelector('.btn-new').addEventListener('click', init);

// init függvény

function init() {
  pontszamok = [0, 0];
  aktivJatekos = 0;
  korPontszam = 0;
  jatekFolyamatban = true;
  elozoDobas = 0;

  kockaKiBeKapcsolas('ki');
  document.getElementById('score-0').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0'; 

  document.getElementById('name-0').textContent = 'Frodó';
  document.getElementById('name-1').textContent = 'Samu';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

function kockaKiBeKapcsolas (funkcio) {
  // funkcio = 'ki', 'be'

  if (funkcio === 'ki') {
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
  } else if (funkcio === 'be') {
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
  }
}


















