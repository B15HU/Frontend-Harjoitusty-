<script>
  export let naytaModal = false; 
  export let suljeModal = () => {} ;   // Sulkemistoiminto, joka annetaan pääkomponentista
</script>

{#if naytaModal}
 <div class="modal">
  <div class="modal-sisalto">
    <button class="close" on:click={suljeModal}>X</button>
    
    <h3>Tietosuojakäytäntö</h3>
<p>Viimeisin päivitys: [1.1.2030]</p>

<p>Tervetuloa <strong>StudyFlow</strong>-sovelluksen tietosuojakäytäntöön! 
  Me emme oikeasti suojaa yksityisyyttäsi, koska, noh... tämä on 
  harjoitussovellus. Henkilötietosi ovat kuitenkin hyvissä käsissä – 
  tai ehkä eivät ole. Käyttämällä tätä sovellusta 
  hyväksyt kaiken mahdollisen ja mahdottoman.</p>

<p>1. <strong>Kerättävät tiedot</strong></p>
<ul  class="list-style">
    <li><strong>Henkilötiedot:</strong> Nimi ja sähköpostiosoite (jos muistat kirjautua).</li>
    <li><strong>Käyttäjätiedot:</strong> Kuinka monta kertaa unohdit, että tämä on vain testi.</li>
    <li><strong>Laitetiedot:</strong> Puhelimesi merkki, mutta vain jos kehuskelet siitä.</li>
</ul>

<p>2. <strong>Tietojen käyttö</strong></p>
<ul  class="list-style">
    <li><strong>Analyysi:</strong> Selvitämme, kuinka nopeasti kyllästyt.</li>
    <li><strong>Motivointi:</strong> Lähetämme sinulle muistutuksia, joita et pyytänyt.</li>
</ul>

<p>3. <strong>Säilytys</strong></p>
<p>Tietosi säilytetään pilvessä – todennäköisesti pilvessä numero yhdeksän. 
  Jos pyydät poistamista, saattaa se mennä automaattisesti roskakoriin... tai ei.</p>

<p>4. <strong>Kolmannet osapuolet</strong></p>
<p>Emme jaa tietojasi kolmansille osapuolille, paitsi jos joku tarjoaa pizzan. 
  Kaikki rakastavat pizzaa.</p>

<p>5. <strong>Oikeutesi</strong></p>
<ul  class="list-style">
    <li><strong>Tiedon saanti:</strong> Tietosi ovat täsmälleen siellä, missä 
        unohdit ne.</li>
    <li><strong>Korjaukset:</strong> Korjaamme virheet – ainakin oikeinkirjoituksessa.</li>
    <li><strong>Poistaminen:</strong> Voit pyytää tietojesi poistamista, mutta 
        muistamme sinut ikuisesti.</li>
</ul>

<p>6. <strong>Yhteystiedot</strong></p>
<p>Jos haluat ottaa meihin yhteyttä, mieti kaksi kertaa. Sähköposti: 
  <strong>emmevastaa@studyflow.com</strong></p>

  <button class="sulje" on:click={suljeModal}>X</button>

</div>
</div>
{/if}

<style>
  .modal {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto; /* Mahdollistaa vierityksen, jos sisältö ylittää tilan */
}
.modal-sisalto {
  background-color: #cbcbcb;
  padding: 20px;
  border-radius: 8px;
  width: 90%; /* Skaalaa ikkunan koon mukaan */
  max-width: 500px; /* Maksimileveys */
  max-height: 80vh; /* Maksimikorkeus suhteessa näkyvään ikkunaan */
  overflow-y: auto; /* Vieritä sisältöä, jos se ei mahdu */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Tyylikäs varjo */
  position: relative; /* Tarvitaan sulkunapin sijoitteluun */
}
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
  border: none;
  background: none;
  background-color: #FF3E00;
  color: #cbcbcb;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;	
}
.sulje{
  color: #FF3E00;
  background-color: #cbcbcb;
}
.sulje:hover {
		background-color: grey;
    transform: scale(1.05);

	}

  .list-style {
  list-style-type: disc; /*Pisteet luettelon alussa */
  text-align: left;
  list-style-position: inside;
}
button:hover {
		background-color: #be3b10;
    transform: scale(1.05);
	}
</style>


