<script lang="ts">
  import EditForm from "$lib/components/EditForm.svelte"

  import type { PageData, ActionData } from "./$types"

  export let data: PageData
  export let form: ActionData

  const { note } = data
  const { title, body, description } = note
</script>

<h1>Editing: {title}</h1>

<EditForm {title} {body} {description}/>

{#if form?.error}
  <ul>
    {#each form.errors as error}
      <li>{error.message}</li>
    {/each}
  </ul>
{/if}
