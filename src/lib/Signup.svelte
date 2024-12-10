<script>
  import { nykyinenNakyma, kayttaja } from '../store.js';
  import Button from './Button.svelte';

	let nakyma; 	//Storen tila, vastuussa nykyisestä näkymästä
	$: nykyinenNakyma.subscribe(value => {
		nakyma = value; //tallentaa storesta saadun arvon paikalliseen muuttujaan
	});

  let nimi = "";
  let sposti = "";
  let salasana = "";

  // Validointilogiikka
  $: nimiValidointi = nimi.length > 2;
  let nimiVierailtu = false;
  $: spostiValidointi = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(sposti);
  let spostiVierailtu = false;
  $: salasanaValidointi = salasana.length >= 6;
  let salasanaVierailtu = false;

  // Funktio uuden käyttäjän luomiseksi
  function luoTunnus() {
  // Tarkistetaan, että kentät eivät ole tyhjiä
  if (!nimi || !sposti || !salasana) {
    alert('Täytä kaikki kentät!');
    return;
  }
  // Tarkistetaan, että sähköposti on oikeassa muodossa
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(sposti)) {
    alert('Sähköpostiosoite ei ole oikeassa muodossa!');
    return;
  }
  // Tarkistetaan, että salasana täyttää vähimmäisvaatimukset (esim. vähintään 6 merkkiä)
  if (salasana.length < 6) {
    alert('Salasanan tulee olla vähintään 6 merkkiä pitkä!');
    return;
  }
  // Tarkistetaan, että kaikki validointisäännöt täyttyvät
  if (!nimiValidointi || !spostiValidointi || !salasanaValidointi) {
  return;
  }

  // Asetetaan käyttäjäobjektiin uudet arvot
  kayttaja.set({ nimi, sposti, salasana });
  alert('Tunnus on luotu!');
  // Tyhjennetään lomakkeen kentät
  nimi = '';
  sposti = '';
  salasana = '';
  // Vaihdetaan näkymää kirjautumiseen
  nykyinenNakyma.set('login');
}

</script>

<form on:submit|preventDefault={luoTunnus}>
  <h1>StudyFlow</h1>

  <h2 class="otsikko">Luo uusi profiili</h2>
  <h4 >Oletko valmis ottamaan opiskelusi hallintaan? 
    Luo tunnus ja astu ajanhallinnan mestariksi! 
  </h4>

 <div class="sisalto">
  
  <label>
    Nimi:
    <input 
    type="text"  
    bind:value= {nimi} 
    on:blur={() => nimiVierailtu = true}/>
  </label>
  {#if !nimiValidointi && nimiVierailtu}
  <p class="virheIlmoitus">Nimessä pitää olla vähintään 3 merkkiä.</p>
{/if}

  <label>
    Sposti:
    <input 
    type="email"  
    bind:value= {sposti} 
    on:blur={() => spostiVierailtu = true}/>
  </label>
  {#if !spostiValidointi && spostiVierailtu}
    <p class="virheIlmoitus">Sähköpostiosoite ei ole oikeassa muodossa.</p>
  {/if}
  
  <label>
    Salasana:
    <input 
    type="password" 
    bind:value={salasana} 
    on:blur={() => salasanaVierailtu = true}/>
  </label>
  </div>
  {#if !salasanaValidointi && salasanaVierailtu}
  <p class="virheIlmoitus">Salasanan tulee olla vähintään 6 merkkiä pitkä.</p>
{/if}

  <div class="button-group">
    <button class="custom-button" type="submit" >Luo tunnus</button>  
    <Button text="Takaisin" on:click={() => nykyinenNakyma.set('etusivu')}/>
  </div>

  <button class="link" on:click={() => nykyinenNakyma.set('login')}>Onko sinulla jo tunnus? Kirjaudu</button>

</form>



<style>
  
</style>