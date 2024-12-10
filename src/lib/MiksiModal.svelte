<script>
export let naytaModal = false; 
  export let suljeModal = () => {} ;   // Sulkemistoiminto, joka annetaan pääkomponentista
</script>

{#if naytaModal}
<div class="modal">
  <div class="modal-sisalto">
    <div>
      <button class="close" on:click={suljeModal}>X</button>
    </div>
    <h2>Miksi StudyFlow?</h2>
    <p>
      StudyFlow ei ole vain sovellus, se on <strong> henkilökohtainen  opintoguru!</strong>
      <strong>Suunnittele opinnot </strong> jotta, et päädy istumaan kirjastoon viime hetken paniikissa 
      ja <strong>hallitse viikkotyömääräsi </strong> kun, deadlinet kiitää kohti. StudyFlow <strong>pitää sinut 
      kasassa </strong> , vaikka lopputyö on myöhässä ja koodirivistä löytyy enemmän virheitä kuin haluaisit myöntää.</p>

      <p>Ei enää "<em><strong>Unohdin tehtävän!</strong></em>" -hetkiä, ei enää "<em><strong>Olinpa tyhmä!</strong></em>" -fiiliksiä.</p>
 
    <p> <strong>StudyFlow avulla voit:</strong></p>
    <ul  class="list-style">
      <li>Seuraa opintojasi kuin kunnon Excel-mestari – mutta ilman niitä tylsiä taulukoita.</li>
      <li>Sopia omat "loma-ajat" –  opiskelijakin ansaitsee välillä hengähdystauon (tai kaksi).</li>
      <li>Pysyä aina ajantasalla, jotta deadline ei saa sinua stressaantumaan.</li>
    </ul>
    <p style="color: #FF3E00;" ><em>Kaikki tämä on vain klikkauksen päässä. Mitä odotat?</em></p>
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