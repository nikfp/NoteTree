<script lang="ts">
  import type { BreadCrumb as Crumb } from "../../routes/api/breadcrumbs/+server"

  export let id: string

  $: crumbs = (async function (id: string) {
    try {
      const response = await fetch(`/api/breadcrumbs?id=${id}`, {
        method: "GET",
        credentials: "same-origin",
      })
      const data = (await response.json()) as { breadcrumbs: Crumb[] }
      return data
    } catch (err) {
      console.log(err)
      return null
    }
  })(id)
</script>

<ol class="breadcrumbs">
  <a href="/">Home</a>
  {#await crumbs}
    .... loading ....
  {:then result}
    {#if result}
      {#each result.breadcrumbs as crumb (crumb.id)}
        {#if crumb.id === id}
          /{crumb.title}
        {:else}
          <a href={`/note/${crumb.id}`}>/{crumb.title}</a>
        {/if}
      {/each}
    {/if}
  {/await}
</ol>

<style>
  .breadcrumbs {
    display: flex;
    flex-wrap: wrap;
    padding: 0.75rem 1rem;
    margin-bottom: 1rem;
    list-style: none;
    background-color: var(--clr-secondary);
    color: var(--clr-link);
    border-radius: var(--brd-radius);
    font-size: 1.125rem;
    font-weight: 600;
  }
  
  .breadcrumbs a {
    font-weight: inherit;
    text-decoration: underline;
  }

  .breadcrumbs a:active, .breadcrumbs a:hover {
    color: var(--clr-active);
  }
</style>
