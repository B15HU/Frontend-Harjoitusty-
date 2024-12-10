<script>
// @ts-nocheck

  //Tuodaan kompponentit käytettäväksi tässä tiedostossa
  import { nykyinenNakyma, kayttaja } from '../store.js';
  import Button from "./Button.svelte";
  // import { flip } from 'svelte/animate';
  import { fly } from 'svelte/transition';



	// Tämä tarkistaa nykyisen näkymän ja asettaa sen arvon 'nakyma' muuttujaan.
  let nakyma; 	
	$: nykyinenNakyma.subscribe(value => {
		nakyma = value; //tallentaa storesta saadun arvon paikalliseen muuttujaan
	});

  // Käyttäjän tietojen (nimi ja sähköposti) hakeminen storesta
  let nimi ; 
  let sposti; 
  $: kayttaja.subscribe(kayttajaData => {
    nimi = kayttajaData?.nimi;
    sposti = kayttajaData?.sposti; 
  });

  // Alustetaan kaikki kurssiin ja opiskelupäiviin liittyvät muuttujat.
  $: kurssinNimi = '';
  $: opintoPisteet = '';
  let aineet = []; // Tähän tallennetaan kurssit ja niiden opintopisteet
  let valittuPvä = '';  // Tallennetaan käyttäjän syöttämä määräaika
  let valittuPväMrä = ''; //uusiks muotoiltu pvä.kk.vuosi
  let jäljelläAikaa = 0; //nykyinen ajankohta miinus valittu määräpäivä
  let jäljelläTunteja = 0;
  let jäljelläPäiviä = 0;
  let jäljelläViikkoja = 0;
  let kurssiLisätty = false;   // Hallitaan, onko ensimmäinen kurssi lisätty
  let päivittäisetTunnit = 0;  // Lasketaan opiskeltavat tunnit per päivä
  let työTunnit = 0  //opintopisteet*27

  // Viikonpäivien lista, jota käytetään opiskelupäivien valintaan
  const viikonpäivät = ['Maanantai', 
  'Tiistai', 'Keskiviikko', 
  'Torstai', 'Perjantai', 
  'Lauantai', 'Sunnuntai'];
  let showDays = false; // Hallitaan näkyykö opiskelupäivien valintalista
  let opiskelupäivät = [];  // Tallentaa valitut opiskelupäivät

  // Funktio opiskelupäivien valintaan (näyttää tai piilottaa valintalistan)
  function valitseOpiskelupäivät() {
    showDays = !showDays; // Vaihdetaan näkyvyys
  }
  // Lasketaan yhteen kurssien yhteiset työtunnit 
  $: kokonaisTunnit = aineet.reduce((sum, aine) => sum + aine.tunnit, 0);

  $: {   // Lasketaan päivittäiset opiskelutunni
    if (opiskelupäivät.length > 0 && jäljelläViikkoja > 0) {
      // Lasketaan opiskeltavat tunnit per viikko
      const tunnitPerViikko = kokonaisTunnit / jäljelläViikkoja;
      // Jaetaan tunnit valituille opiskelupäiville
      päivittäisetTunnit = tunnitPerViikko / opiskelupäivät.length;
    } else {
      päivittäisetTunnit = 0;
    }
  }
  
  // Funktio, joka laskee jäljellä olevan ajan määrän (päivinä ja tunteina)
  //muuntaa käyttäjän syöttämä pvä date -olioksi
  //luo pvän joka edustaa kuluvan pvän
  // Lasketaan ero nykyhetkestä määräaikaan
  function laskeJaljellaAika() { 
   const valittuPäivämäärä = new Date(valittuPvä); 
   const nykyinenPäivämäärä = new Date(); 
    jäljelläAikaa = valittuPäivämäärä.getTime() - nykyinenPäivämäärä.getTime(); 
    if (jäljelläAikaa > 0) {
      jäljelläPäiviä = Math.floor(jäljelläAikaa / (1000 * 60 * 60 * 24));     // Päivien laskeminen
      jäljelläViikkoja = Math.floor(jäljelläPäiviä / 7);     // Viikkojen laskeminen
      jäljelläTunteja = Math.floor((jäljelläAikaa % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));    // Jäljellä olevat tunnit
    } else {
      jäljelläPäiviä = jäljelläViikkoja = jäljelläTunteja = 0;
    }
  }

  let lisaaKurssiValidointi = false;
  //muuttuja joka seuraa validointin toimivuutta.
  let kurssiLahetetty = false;

  // Kurssin lisäämiseen ja työaikojen laskemiseen
    function lisaaKurssi() {
      //tarkistaa syöttökentissä on tietoa
      if (!kurssinNimi || !opintoPisteet) {
	    lisaaKurssiValidointi = true; //Näyttää virheen
      kurssiLähetetty = false; //Ei onnistunut lisäys
	    return;
      }

      työTunnit = Number(opintoPisteet) * 27; 
      aineet = [...aineet, { 
        nimi: kurssinNimi, 
        pisteet: opintoPisteet, 
        tunnit: työTunnit ,
      }];

      // Nollaa syötekentät seuraavan kurssin lisäämisessä
      kurssinNimi = '';
      opintoPisteet = '';
      // Päivitetään jäljellä oleva aika heti kurssin lisäyksen jälkeen
      laskeJaljellaAika(); 

      lisaaKurssiValidointi = false;
      kurssiLahetetty = true;
    }
  
  
  // Poistetaan viimeinen lisätty kurssi
  function poistaViimeisin() {
    if (aineet.length > 0){
    aineet = aineet.slice(0,-1); //poistaa viimesen alkion listasta
  }}

  // Formatoi päivämäärä helposti luettavaan muotoon
  $: valittuPväMrä = valittuPvä ? new Date(valittuPvä).toLocaleDateString('fi-FI') : '';
  // Lasketaan opiskelupäivien määrä jäljellä olevien päivien perusteella
  // Lasketaan kokonaiset viikot
  // Ja ylimääräiset päivät
  function laskeOpiskelupaivat(jäljelläPäiviä, opiskelupäivätViikossa) {
    const kokonaisetViikot = Math.floor(jäljelläPäiviä / 7); 
    const ylimääräisetPäivät = jäljelläPäiviä % 7; 
   // Kokonaisopiskelupäivien määrä viikoista
    let opiskelupaivat = kokonaisetViikot * opiskelupäivätViikossa;
   // Lisätään ylimääräiset päivät
   opiskelupaivat += Math.min(ylimääräisetPäivät, opiskelupäivätViikossa);
   return opiskelupaivat;
  }
  // Reaktiivinen laskenta opiskelupäivien yhteismäärälle
  $: opiskelupaivatYhtJajella = laskeOpiskelupaivat(jäljelläPäiviä, opiskelupäivät.length);
  let päivittäinenAika = kokonaisTunnit / opiskelupaivatYhtJajella;
  // Lasketaan päivittäinen opiskeluaika tunteina ja minuutteina
  $: {
    if (opiskelupaivatYhtJajella > 0) {
      päivittäinenAika = kokonaisTunnit / opiskelupaivatYhtJajella;
    } else {
      päivittäinenAika = 0;
    }
  }

  // Formatoi päivittäinen opiskeluaika tunteiksi ja minuutteiksi
  function formatoiTunnitMinuutit(tunnitDesimaaleina) {
    const tunnit = Math.floor(tunnitDesimaaleina); // Kokonaiset tunnit
    const minuutit = Math.round((tunnitDesimaaleina - tunnit) * 60); // Jäljelle jäävät minuutit
    if (tunnit === 0) {
      return `${minuutit}`;
    } else {
      return `${tunnit}h ${minuutit}min`;
    }
  }

  // Ulos kirjautumisen ja kirjautumisnäkymään siirtyminen.
  function kirjauduUlos() {
    nykyinenNakyma.set('login'); 
  }
  // Päivittäisen maksimi opiskeluajan tarkistus
  const maxPaivittainenTyoaika = 9;
  
  // Tarkista, ylittääkö aika sallitun
  $:yliMaksimiAika = päivittäinenAika > maxPaivittainenTyoaika;

  // Lasketaan opiskeluaika per kurssi kurssi 
  $: opiskeluPerKurssi = aineet.map(kurssi => {
    const tunnitPerKurssi = kurssi.tunnit ;// Kurssin kokonaisopiskeluajat
    const opiskeluPerPäivä = (tunnitPerKurssi / opiskelupaivatYhtJajella); //tulostaa desimaaliluvun
    
    const tunteja = Math.floor(opiskeluPerPäivä) //otetaan kokonaistunnit tunteina
    const minuutteja =Math.round((opiskeluPerPäivä - tunteja)*60) //ottaa loput minuutit
    
    return {
    nimi: kurssi.nimi,
    kokonaistunnit: tunnitPerKurssi,
    tunnitPerPäivä: tunteja,
    minuutitPerPäivä: minuutteja
    }
  })
</script>

<form on:submit|preventDefault={lisaaKurssi}>
  
  <h1 class="otsikko">Tervetuloa, {nimi}</h1>
  <h2>Katsotaan, miten aikataulusi järjestyy</h2>

  <!--------- Ensimmäinen asia sovelluksessa. Määräajan valinta!  -------------------------------------------------------------------------------------------->
    <h4 class="otsikko">Mikä on tehtävien määräaika?</h4>
    <input type="date" bind:value={valittuPvä} on:input={laskeJaljellaAika} required />  
    <!-- Näytä viesti vain, jos päivä on valittu -->
     {#if valittuPvä}
      <p>Sinulla on <strong>{jäljelläPäiviä}</strong> päivää aikaa järjestää opiskelusi ja saavuttaa tavoitteesi.</p>
    {/if}
  
  <!--------- Opiskelupäivien määrä viikossa valikointi! ---------------------------------------------------------------------------------------------------->
    <h4 class="otsikko">Mitkä päivät viikossa sitoudut opiskelemaan?</h4>
    <!-- Painike, joka paljastaa viikonpäivät -->
    <div class="button-group">
      <button type="button" on:click={valitseOpiskelupäivät}>
      {showDays ? 'Sulje' : 'Näytä'} </button>
    </div>
      <!-- Viikonpäivät valittavaksi -->
      {#if showDays}
      <select bind:value={opiskelupäivät} multiple size="7"  class="opiskelupäivä-valinta">
        {#each viikonpäivät as päivä}
        <option value={päivä}>{päivä.charAt(0).toUpperCase() + päivä.slice(1)}</option>
        {/each}
      </select>
      {/if}
        <!-- Näytetään valitut opiskelupäivät -->
        {#if opiskelupäivät.length > 0}
          {#if opiskelupäivät.length === 1}
            <p>Vau, <strong>{opiskelupäivät.length}</strong> opiskelupäivä viikossa! Eikö tämä ole vähän liian "rentoa" opiskelua? 🤔 </p>
          {:else if opiskelupäivät.length === 2}
            <p>Voisi olla huonommin! <strong>{opiskelupäivät.length}</strong> päivää on parempi kuin yksi. Ottamalla pari päivää lisää, voit ehkä oppia jotain ennen kuin pääset eläkkeelle! 😅</p>
          {:else if opiskelupäivät.length === 3}
            <p>Oletko mielestäsi hyvässä vauhdissa? Pystyt parempaan kuin <strong>{opiskelupäivät.length}</strong> päivään. Mitä jos, kokeiltaisi vähän enemmän "täysillä" -meininkiä? 😉</p>
          {:else if opiskelupäivät.length === 4}
            <p>Ihan "OK" tasapainoa opiskelulle ja elämälle! <strong>{opiskelupäivät.length}</strong> päivää viikossa on hyvä alku, alisuoriutujalle 💪</p>
          {:else if opiskelupäivät.length === 5}
            <p>Olet asettanut itsellesi sopivan tavoitteen! <strong>{opiskelupäivät.length}</strong> päivää viikossa on juuri sopiva määrä, jatka näin ja tulet onnistumaan 😎</p>
          {:else if opiskelupäivät.length === 6}
            <p>Olet todella ottamassa opiskelua vakavasti! <strong>{opiskelupäivät.length}</strong> päivää? Ei riittänyt, että olet hyvällä tiellä! Halusit moottoritielle kohti menestystä! 🚀</p>
          {:else if opiskelupäivät.length === 7}
            <p>Oletko varma, että et ole robotti? <strong>{opiskelupäivät.length}</strong> päivää viikossa? On todellakin omistautunut! Onnea matkaan tuleva pääministeri! 😆</p>
          {/if}
        {/if}
    
  <!---------- Kurssien lisäys taulukkoon ja laskutoimitukset ----------------------------------------------------------------------------------------------->
    <h4 class="otsikko">Mitä kursseja sinulla on edessä?</h4>
      <input bind:value={kurssinNimi} type="text" placeholder="Kurssin nimi" />
      <input bind:value={opintoPisteet} type="number" placeholder="Opintopisteet" />
      <!--varmistetaan ettei tyhjiä kursseja lissääny listaan-->
      {#if lisaaKurssiValidointi && !kurssiLahetetty}
      <p class="virheIlmoitus">Täytä kentät ennen lisäämistä</p>
      {/if}
      <!-- Kurssin lisäys ja poisto napit-->
      <div class="button-group">
        <button on:click={lisaaKurssi} class="custom-button">Lisää</button>
        <button on:click={poistaViimeisin}>Poista X</button>
      </div>
      <!-- Varoitus, jos päivittäinen aika ylittää rajan -->
        {#if yliMaksimiAika}
          <p class="virheIlmoitus">Päivittäinen opiskeluaika on liian pitkä 
            (yli 9 tuntia). Vähennä työmäärää tai pidennä opiskeluaikaa.
          </p>
        {/if}

  <!-- Taulukko lisätyistä kursseista. 
       Näytetään vasta kun ensimmäinen kurssi on lisätty ----------------------------------------------------------------------------------------------------->  
    {#if aineet.length > 0}
    <table in:fly= {{duration: 750, x: -500, y: 0}}>
      <thead>
      <tr>
        <th>Kurssi</th>
        <th>Op</th>
        <th>Tunnit</th>
      </tr>
      </thead>
      <tbody>
      {#each aineet as aine}
      <tr>
        <td>{aine.nimi}</td>
        <td>{aine.pisteet} op</td>
        <td>{aine.tunnit} h</td>
      </tr>
      {/each}
      </tbody>
    </table>
    <!-- Taulukon yhteen lasketut arvot -->
        <p><strong>Yhteensä:</strong> <strong class="otsikko">
        {aineet.reduce((sum, aine)=> sum + parseInt(aine.pisteet), 0)}</strong> 
        Opintopistettä ja <strong class="otsikko">{kokonaisTunnit}</strong> työtuntia.
        </p>
        <hr>
      {/if}
    <br>

  <!--Uusi taulukko päivittäisten opiskelutuntien laskusta. 
      Näytetään jos opiskelupäivät viikottain on valittuna ----------------------------------------------------------------------------------------------------->
      {#if opiskelupäivät.length === 0 && aineet.length > 0}
      <hr>
      <h4 class="virheIlmoitus">Valitse viikonpäivät</h4>
      <hr>
      {/if}
      {#if opiskelupäivät.length > 0 && aineet.length > 0}
        <table in:fly= {{duration: 750, x: 500, y:0}}>
          <thead>
            <tr>
              <th>Kurssi</th>
              <th>Tunnit</th>
              <th>Minuuutit</th>
            </tr>
          </thead>
          <tbody>
            {#each opiskeluPerKurssi as kurssi}
              <tr>
                <td>{kurssi.nimi}</td>
                <td>{kurssi.tunnitPerPäivä} h </td>
                <td>{kurssi.minuutitPerPäivä} min</td>
              </tr>
            {/each}
          </tbody>
        </table>
        <div class="tulostus">
          <p><strong>Yhteensä:</strong> <strong class="otsikko">{formatoiTunnitMinuutit(päivittäinenAika)}</strong> (kun opiskelet <strong class="otsikko">{opiskelupäivät.length}</strong> päivää viikossa).</p>
        </div>
        <hr>
        {/if}
        <br>

  <!-- jäljellä olevan ajan ja työnmäärän näyttö -->
  <!-- näytetään vasta kun tähtävien määräaika valittu -->
  {#if valittuPvä }
  <div class="tulostus">
	  <ul class="list-style">
	    <h4 class="otsikko">Opiskeluaikasi</h4>
  		  <li>📅 <strong>Määräaikasi:</strong> <strong>{valittuPväMrä}</strong></li>
  		  <li>🕒 <strong>Aikaa jäljellä:</strong> <strong>{jäljelläPäiviä}</strong> päivää</li>
 		    <li>📚 <strong>Opiskeluaikaa jäljellä:</strong> <strong>{jäljelläViikkoja}</strong> viikkoa, <strong>{jäljelläPäiviä % 7}</strong> päivää</li>
	  </ul>
  </div>
  {/if}


  {#if aineet.length > 0}
  <div class="tulostus">
    <ul class="list-style">
      <!-- Käydään läpi aineet ja opintoPisteet -taulukot -->
      {#each aineet as aine}
        <h4 class="otsikko">{aine.nimi}</h4> 
          <p>- <strong>Opintopisteet:</strong> {aine.pisteet} op<br>
             - <strong>Vaatii:</strong> {aine.tunnit} tuntia opiskelua.
          </p>
      {/each}
    </ul>
  </div>
  {/if}

  {#if aineet.length > 0 }
  <div class="tulostus">
    <p>Opiskeltavaa on yhteensä <strong>{kokonaisTunnit}</strong> tuntia.</p>
    <!-- <h4 class="otsikko">Opiskelupäivät:</h4> -->
    <p>Valitsit <strong>{opiskelupäivät.length}</strong> päivää viikossa: {opiskelupäivät.join(', ')}</p>
  </div>
  <p><strong>Jatka näin, ja tulet onnistumaan!</strong></p>
  {/if}

<button class="close" on:click={kirjauduUlos}>Log out</button>
</form>

<style>
  .opiskelupäivä-valinta {
    width: 70%; /* Valikko vie 70% leveydestä */
    height: auto; /* Korkeus mukautuu sisällön mukaan */
    font-family: 'Roboto', sans-serif; /* Käytetään modernia Roboto-kirjasintyyppiä */
    font-size: 1em; /* Kirjasinkoko on yhden em:n */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); /* Luo pehmeän varjostuksen valikon ympärille */
    padding: 10px; /* Lisää sisäistä tilaa valikon ympärille */
    border-radius: 10px; /* Kulmat pyöristetään */
    border: 1px solid #888; /* Harmaa reunus */
    background-color: #f4f6f8; /* Vaaleanharmaa tausta */
    cursor: pointer; /* Hiiren osoitin muuttuu osoittimeksi */
    transition: background-color 0.3s; /* Pehmeä taustavärin muutos, kun osoitin liikkuu */
  }
  .opiskelupäivä-valinta:hover {
      background-color: #e9ecef; /* Muuttaa taustavärin hieman tummemmaksi hover-tilassa */
  }
  .opiskelupäivä-valinta:focus {
      border-color: #5a9bd3; /* Fokuskorostus sinisellä kehällä */
      outline: none; /* Poistaa oletuskehys */
  }
  .opiskelupäivä-valinta option {
      padding: 10px; /* Lisää sisäistä tilaa */
      font-size: 16px; /* Tekstikoko valikoissa */
      background-color: #ffffff; /* Valkoinen tausta valikoille */
      color: #333; /* Tumma tekstiväri paremman luettavuuden takaamiseksi */
  }
  .opiskelupäivä-valinta option:hover {
      background-color: #dfe7ef; /* Hover-tilassa vaaleansininen tausta */
  }
  .opiskelupäivä-valinta option:checked {
      background-color: #fc7b50; /* oranssi tausta valitulle vaihtoehdolle */
      color: #fff; /* Valkoinen teksti valitulle vaihtoehdolle */
  }

  table {
    width: 100%; /* Taulukko vie koko käytettävissä olevan leveyden */
    border-radius: 10px; /* Pyöristetyt kulmat */
    margin-top: 1rem; /* Yläreunaan pieni tyhjä tila */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); /* Pehmeä varjostus taulukon ympärille */
    transform: translateY(-10px); /* Nostaa taulukkoa hieman ylöspäin */
    border: 1px solid #888; /* Harmaa reunus */
    background-color: #ffffff; /* Valkoinen taustaväri */
    padding: 3px; /* Lisää sisäistä tilaa valikon ympärille */
  }
  th, td {
    border: 1px solid #ddd; /* Soluille ohut harmaa reunus */
    padding: 10px; /* Lisää sisäistä tilaa */
    text-align: left; /* Kohdistetaan teksti vasemmalle */
    font-weight: bold; /* Lihavoitu teksti */
    color: #333; /* Tumma tekstiväri */
    border-radius: 5px; /* Pyöristetyt kulmat */
  }
  th {
    background-color: #fc7b50; /* oranssi tausta otsikoille */
    color: #fff; /* Valkoinen teksti otsikoissa */
    font-size: 1.1rem; /* Hieman suurempi fontti otsikoille */
    font-weight: bolder; /* Korostetaan otsikoiden lihavuutta */
  }
  tr:nth-child(even) {
    background-color: #f4f6f8; /* Parillisille riveille vaaleanharmaa tausta */
  }
  tr:nth-child(odd) {
    background-color: #ffffff; /* Parittomille riveille valkoinen tausta */
  }
  tr:hover {
    background-color: #e9ecef; /* Hover-tilassa vaaleansininen tausta */
    cursor: pointer; /* Korostaa, että rivi on vuorovaikutteinen */
  }

  .tulostus {
      text-align: left; /* Tekstit alkavat vasemmalta reunalta */
      line-height: 1.3; /* Lisää tilaa rivien välille */
    }
    .tulostus .otsikko {
      margin: 0px 0 0px 0; /* Pieni marginaali otsikon ympärille */
      margin-bottom: 0em; /* Pienentää otsikoiden ja listan sisältöjen väliä */
    }

    .tulostus .list-style {
      padding-left: 0; /* Poistaa luettelon oletusväli vasemmalta reunalta */
      list-style-position: inside; /* Luettelomerkit sisään tekstin alkuun */
      margin-bottom: 0.5em; /* Pienentää listan ja seuraavan elementin väliä */
    }

    .tulostus .list-style p {
      margin-bottom: 0.5em; /* Pienentää listan sisältöjen väliä */
      margin: 2px 0 10px 20px; /* Pieni väli aineen tiedoille, hieman sisennetty */

    }
</style>