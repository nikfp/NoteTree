<script lang="ts">
  import { Breadcrumb } from "sveltestrap"
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

<Breadcrumb>
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
</Breadcrumb>
