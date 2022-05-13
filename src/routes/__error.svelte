<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = ({ error, status }) => {
		return {
			props: { error, status }
		};
	}
</script>

<script lang="ts">
  export let error: Error;
  export let status: number;

  const dev = process.env.NODE_ENV === 'development';
</script>

<svelte:head>
  <title>Oopsie</title>
</svelte:head>

<h1>{status ?? 'Unknown error'}</h1>
{#if error}
  {#if dev && error.stack}
    <pre>{error.stack}</pre>
  {:else}
    <h3>{error.message}</h3>
  {/if}
{/if}
<div>
  <img
    src="/images/{Math.floor(Math.random() * 3)}.webp"
    alt="Error Easter Egg"
  />
</div>

<style> 
  div {
    text-align: center;
  }

  img {
    max-width: 100%;
  }
</style>
