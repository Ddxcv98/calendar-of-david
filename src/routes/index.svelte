<script lang="ts">
  import { days, months } from '$lib/data.json';
  import { onMount } from 'svelte';

  export let year: {
    dayOfMonth: number;
    dayOfWeek: number;
    isHoliday: boolean;
    isAnnualLeave: boolean;
    readonly isWeekend: boolean;
    readonly isWorkday: boolean;
  }[][];

  let curr = new Date().getMonth();
  let touches = 0;
  let x1 = 0;
  let y1 = 0;
  let isTouch: boolean;

  function floorMod(n: number, m: number) {
    return ((n % m) + m) % m;
  }

  function handleKeyup(e: any) {
    if (e.key == 'ArrowLeft') {
      curr = prev;
    } else if (e.key == 'ArrowRight') {
      curr = next;
    }
  }

  function handleTouchstart(e: any) {
    touches = e.touches.length;
    x1 = e.touches.item(0).clientX;
    y1 = e.touches.item(0).clientY;
  }

  function handleTouchend(e: any) {
    if (touches != 1) return;
    const x2 = e.changedTouches.item(0).clientX;
    const y2 = e.changedTouches.item(0).clientY;
    const slope = (y2 - y1) / (x2 - x1);
    const length = Math.abs(x1 - x2);
    if (slope < -1 || slope > 1 || length < 50) return;

    if (x1 < x2) {
      curr = prev;
    } else {
      curr = next;
    }
  }

  onMount(() => {
    isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  });

  $: workDays = year[curr].filter(d => d.isWorkday).length;
  $: workHours = workDays * 8;
  $: prefix = floorMod(year[curr][0].dayOfWeek - 1, 7) + 1;
  $: suffix = 42 - days[curr] - prefix;
  $: prev = floorMod(curr - 1, 12);
  $: next = floorMod(curr + 1, 12);
</script>

<svelte:head>
  <title>Calendar of David</title>
</svelte:head>

<svelte:window
  on:keyup={handleKeyup}
  on:touchstart={handleTouchstart}
  on:touchend={handleTouchend}
/>

<h3>2022</h3>
<h1>{months[curr]}</h1>
<div id="cal" class="cal">
  <span class="day-name">Sun</span>
  <span class="day-name">Mon</span>
  <span class="day-name">Tue</span>
  <span class="day-name">Wen</span>
  <span class="day-name">Thu</span>
  <span class="day-name">Fri</span>
  <span class="day-name">Sat</span>
  {#each year[prev].slice(-prefix) as day}
    {#if day.isHoliday}
      <span class="day holiday out-of-context">{day.dayOfMonth}</span>
    {:else if curr != 0 && day.isAnnualLeave}
      <span class="day annual-leave out-of-context">{day.dayOfMonth}</span>
    {:else}
      <span class="day regular out-of-context">{day.dayOfMonth}</span>
    {/if}
  {/each}
  {#each year[curr] as day}
    {#if day.isHoliday}
      <span class="day holiday">{day.dayOfMonth}</span>
    {:else if day.isAnnualLeave}
      <span class="day annual-leave">{day.dayOfMonth}</span>
    {:else}
      <span class="day regular">{day.dayOfMonth}</span>
    {/if}
  {/each}
  {#each year[next].slice(0, suffix) as day}
    {#if day.isHoliday}
      <span class="day holiday out-of-context">{day.dayOfMonth}</span>
    {:else if curr != 11 && day.isAnnualLeave}
      <span class="day annual-leave out-of-context">{day.dayOfMonth}</span>
    {:else}
      <span class="day regular out-of-context">{day.dayOfMonth}</span>
    {/if}
  {/each}
</div>
<div class="info">
  <div>
    <div class="legend">
      <span class="legend-dot holiday" />
      <span>Holiday</span>
    </div>
    <div class="legend">
      <span class="legend-dot annual-leave" />
      <span>Annual leave</span>
    </div>
  </div>
  <div>
    <div><span class="label">Work days: </span>{workDays}</div>
    <div><span class="label">Work hours: </span>{workHours}</div>
  </div>
</div>
{#if isTouch != null}
  <div class="nav">
    <button class="key" on:click={() => (curr = prev)}>&#8592;</button>
    {isTouch? 'Swipe ' : 'Use arrows '}to navigate
    <button class="key" on:click={() => (curr = next)}>&#8594;</button>
  </div>
{/if}

<style>
  .cal {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 0.25em;
    margin-bottom: 1em;
  }

  .day-name {
    display: none;
  }

  .day {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    font-weight: 300;
    border-radius: 5px;
  }

  .info {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 3em;
  }

  .legend {
    display: flex;
    align-items: center;
    gap: 0.25em;
  }

  .legend-dot {
    padding: 0.5em;
    border-radius: 5px;
  }

  .label {
    font-weight: bold;
  }

  .nav {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    font-weight: bold;
    margin-bottom: 1em;
  }

  .key {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2em;
    font-family: Cantarell;
    font-weight: inherit;
    font-size: 1em;
    border-style: none;
    box-shadow: 3px 3px black;
    background-color: lightskyblue;
    cursor: pointer;
    aspect-ratio: 1;
  }

  .regular {
    background-color: lightgray;
  }

  .holiday {
    background-color: crimson;
  }

  .annual-leave {
    background-color: dodgerblue;
  }

  .out-of-context {
    filter: brightness(0.75);
  }

  @media (prefers-color-scheme: dark) {
    .key {
      box-shadow: 3px 3px dimgray;
    }

    .regular {
      background-color: lightslategray;
    }
  }

  @media (min-width: 360px) {
    .cal {
      grid-template-columns: repeat(7, 1fr);
    }

    .day-name {
      display: initial;
      text-align: center;
      font-size: 1.25em;
    }

    .day {
      aspect-ratio: 1;
    }
  }
</style>
