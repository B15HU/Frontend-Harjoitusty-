<script>
  import { nykyinenNakyma, kayttaja } from '../store.js';
  import Button from './Button.svelte';

	let nakyma; 	//Storen tila, vastuussa nykyisestä näkymästä
	$: nykyinenNakyma.subscribe(value => {
		nakyma = value; //tallentaa storesta saadun arvon paikalliseen muuttujaan
	});

  let sposti = "" ; //tarvitaan kirjautumiseen
  let salasana = "";

  
   // Kirjautumistoiminto
   function kirjaudu() {
    //poistaa virheilmoituksen että nykyinenKayttaja is possibly undefined
    let nykyinenKayttaja = { sposti: '', salasana: '' };
    kayttaja.subscribe(kayttajaData => nykyinenKayttaja = kayttajaData)(); // Hakee käyttäjän tiedot kayttaja-storesta
  // Tarkistetaan, että sähköposti ja salasana eivät ole tyhjiä
  if (!sposti || !salasana) {
    alert('Täytä kaikki kentät!');
    return;
  }
  // Tarkistetaan, että sähköposti on oikeassa muodossa
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(sposti)) {
    alert('Sähköpostiosoite ei ole oikeassa muodossa!');
    return;
  }
  // Tarkistetaan, onko sähköposti tai salasana väärin
  if (sposti !== nykyinenKayttaja.sposti && salasana !== nykyinenKayttaja.salasana) {
    alert('Virheellinen sähköposti ja salasana!');
  } else if (sposti !== nykyinenKayttaja.sposti) {
    alert('Virheellinen sähköposti!');
  } else if (salasana !== nykyinenKayttaja.salasana) {
    alert('Virheellinen salasana!');
  } else {
    nykyinenNakyma.set('main'); // Kirjautuminen onnistui, siirretään päänäkymään
  }
}

</script>


<form on:submit|preventDefault={kirjaudu}>
  <h1>StudyFlow</h1>

  <h2 class="otsikko">Kirjaudu sisään</h2>
  <h4>Mukava nähdä sinut taas! Kirjaudu sisään ja ole taas osa yhteisöä.</h4>
  
  <div class="sisalto">
    <label>
      Sposti:
      <input type="email" bind:value={sposti} />
    </label>
    
    <label>
      Salasana:
     <input type="password" bind:value={salasana} />
    </label>
  </div>

  <div class="button-group">
    <button class="custom-button" type="submit">Kirjaudu</button>
    <Button text="Takaisin" on:click={() => nykyinenNakyma.set('etusivu')}/>
  </div>
    
  <button class="link" on:click={() => nykyinenNakyma.set('signup')}>Tarvitseko uuden profiini? Luo tunnus</button>

  

</form>

<style>
  
</style>