<script>
  export let text = 'Click Me';

  </script>

  <button on:click>{text}</button>

  <style>
    button {
  background-color: #6f6f6f; /* Viimeisin määritelty taustaväri */
  color: white; /* Viimeisin määritelty väri */
  padding: 10px 20px;
  width: 125px;
  border-radius: 8px; /* Viimeisin määritelty border-radius */
  border: 1px solid transparent; /* Viimeisin määritelty border */
  font-size: 1em;
  font-weight: bold; /* Viimeisin määritelty font-weight */
  font-family: inherit;
  cursor: pointer;
  transform: scale(1); /* Viimeisin määritelty transform */
  transition: background-color 0.3s ease, transform 0.2s ease,
    border-color 0.25s;
}

button:hover {
  background-color: #555; /* Viimeisin määritelty hover-taustaväri */
  cursor: pointer;
  transform: scale(1.05);
  /*border-color: #646cff;  Viimeisin määritelty hover-border-color */
}

button:active {
  background-color: silver;
}

button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

  </style>