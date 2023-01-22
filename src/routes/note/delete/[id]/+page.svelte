<script lang="ts">
  import type { ActionData, PageData } from "./$types"
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
  <a href={`/note/${id}`} class="btnn btnn-outline-secondary">Go to Note page</a>
{:else}
  <div class="alert alert-danger">
    <h2>Delete this note? This cannot be undone!</h2>
    <form method="post">
      <input name="id" id="id" type="text" hidden value={id} />
      <button type="submit" class="btnn btnn-danger">Delete</button>
    </form>
  </div>
{/if}

{#if form?.error}
  <ul>
    {#each form.errors as error}
      <li>{error.message}</li>
    {/each}
  </ul>
{/if}

<style>
  .alert {
    position: relative;
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
  }

  .alert-danger {
    color: var(--clr-alert);
    background-color: var(--clr-alert-background);
    border-color: var(--clr-alert-border);
  }
</style>
