<script>
	import { nykyinenNakyma, kayttaja } from './store.js';
	import Signup from './lib/Signup.svelte'; // Rekisteröitymiskomponentti
  import Login from './lib/Login.svelte'; // Kirjautumiskomponentti
	import Main from './lib/Main.svelte'; //Pääkompponentti
	import Button from './lib/Button.svelte';
	import Modal from './lib/TietoModal.svelte';
	import MiksiModal from './lib/MiksiModal.svelte'

	let nakyma; 	//Storen tila, vastuussa nykyisestä näkymästä
	$: nykyinenNakyma.subscribe(value => {
		nakyma = value; //tallentaa storesta saadun arvon paikalliseen muuttujaan
	});

	// Modalin näkyvyyden hallinta
	let naytaMiksiModal = false;
	let naytaTietoModal = false;

// Funktiot modaalien avaamiseksi ja sulkemiseksi
	function avaaMiksiModal() {
		naytaMiksiModal = true;
	}
	function suljeMiksiModal() {
		naytaMiksiModal = false;
	}

	function avaaTietoModal() {
		naytaTietoModal = true;
	}
	function suljeTietoModal() {
		naytaTietoModal = false;
	}

</script>
{#if nakyma === 'etusivu'}

<form>
	<h1>StudyFlow</h1>

	<h3>Tervetuloa <br> StudyFlow-sovellukseen!</h3>
	<p class="intro-teksti">
		Suunnittele opinnot <br> Seuraa opintopisteitä ja <br>
		hallitse viikkotyömääräsi <br> vaivattomasti
	</p>

	<div class="button-group">
		<button class="custom-button"on:click={() =>
		 nykyinenNakyma.set('signup')}>Luo profiili</button>
		<Button text="Kirjaudu" on:click={() =>
		 nykyinenNakyma.set('login')}/>
  </div>

	<!-- Modalin avaus -->
	<button class="link" on:click|preventDefault={avaaMiksiModal}>Miksi StudyFlow?</button>
	<button class="link" on:click|preventDefault={avaaTietoModal}>Tietosuojakäytäntö</button>
</form>
{/if}

<!-- MiksiModal -->
{#if naytaMiksiModal}
	<MiksiModal naytaModal={naytaMiksiModal} suljeModal={suljeMiksiModal} />
{/if}

<!-- TietoModal -->
{#if naytaTietoModal}
	<Modal naytaModal={naytaTietoModal} suljeModal={suljeTietoModal} />
{/if}

{#if nakyma === 'signup'}
	<Signup/>
{:else if nakyma === "login"}
	<Login />
{:else if nakyma === "main"}
    <Main/>
{/if}



<style>

</style> 
