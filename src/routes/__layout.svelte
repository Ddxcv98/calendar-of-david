<script lang="ts">
	import '../app.css';
</script>

<main>
  <slot />
</main>
<footer>
  <a class="external" href="https://www.linkedin.com/in/david-sa-duarte/" target="_blank"rel="noreferrer">
    Author
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z" />
      <path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"/>
    </svg>
  </a>
  <a class="external" href="https://github.com/Ddxcv98/calendar-of-david" target="_blank" rel="noreferrer">
    Source code
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z" />
      <path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"/>
    </svg>
  </a>
  <a href="/donate">Donate</a>
</footer>

<style>
  main {
    max-width: 50em;
    width: 100%;
  }

  footer {
    display: flex;
    align-items: center;
    gap: 1em;
    margin-top: auto;
  }

  .external {
    display: flex;
    align-items: center;
    gap: 0.15em;
  }
</style>
