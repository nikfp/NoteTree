<script lang="ts">
  import type { ActionData } from "./$types"
  import EditForm from "$lib/components/EditForm.svelte"
  export let form: ActionData
</script>

<svelte:head>
  <title>Add new note</title>
</svelte:head>

<h1>Add New Note</h1>

<EditForm />

{#if form?.error}
  <ul>
    {#each form.errors as error}
      <li>{error.message}</li>
    {/each}
  </ul>
{/if}
