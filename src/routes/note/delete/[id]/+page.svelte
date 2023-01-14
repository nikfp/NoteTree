<script lang="ts">
  import type { ActionData, PageData } from "./$types"
  import { Alert } from "sveltestrap"
  export let data: PageData
  export let form: ActionData
  const { id, title } = data.note

  $: childCount = data.note.children.length
</script>

<h1>Delete: {title}</h1>

<hr />
{#if childCount > 0}
  <h2>Warning: Note has leaf notes!!</h2>
  <p>You must delete or move the leaf notes before deleting this note!</p>
  <a href={`/note/${id}`} class="btn btn-outline-primary">Go to Note page</a>
{:else}
  <Alert color="danger">
    <h2>Delete this note? This cannot be undone!</h2>
    <form method="post">
      <input name="id" id="id" type="text" hidden value={id} />
      <button type="submit" class="btn btn-danger">Delete</button>
    </form>
  </Alert>
{/if}

{#if form?.error}
  <ul>
    {#each form.errors as error}
      <li>{error.message}</li>
    {/each}
  </ul>
{/if}
