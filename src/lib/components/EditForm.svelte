<script lang="ts">
  import { page } from "$app/stores"
  import { enhance } from "$app/forms"
  import { onDestroy } from "svelte"
  export let title = ""
  export let description: string | null = null
  export let body = ""

  // flag to disable form
  let disabled = false

  // subscribe function to re-enable form submit when the store updates
  let pageUnsubscribe = page.subscribe(() => {
    disabled = false
  })

  // unsubscribe from the store on component teardown
  onDestroy(() => {
    pageUnsubscribe()
  })
</script>

<form use:enhance on:submit={() => (disabled = true)} method="post">
  <div class="form-group">
    <label for="title">Title</label>
    <input class="form-control" id="title" type="text" name="title" bind:value={title} />
  </div>
  <div class="form-group">
    <label for="description">Description</label>
    <input
      class="form-control"
      id="description"
      type="text"
      name="description"
      bind:value={description}
      placeholder="(Optional)"
    />
  </div>
  <div class="form-group">
    <label for="body">Body</label>
    <textarea class="form-control" id="body" name="body" bind:value={body} />
  </div>
  <button class="btn btn-success" {disabled} color="success" type="submit">submit</button>
</form>

<style>
  label {
    display: inline-block;
    margin-bottom: 0.5rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }

  .form-control {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
  }

  textarea.form-control {
    height: auto;
  }
</style>
