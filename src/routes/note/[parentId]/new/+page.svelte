<script lang="ts">
  import type { PageData, ActionData } from "./$types"
  import EditForm from "$lib/components/EditForm.svelte"
  export let form: ActionData
  export let data: PageData

</script>

<h1>Add note to: {data.parent.title}</h1>
<EditForm />
{#if form?.error}
  <ul>
    {#each form.errors as error}
      <li>{error.message}</li>
    {/each}
  </ul>
{/if}
