<script lang="ts">
  import { page } from "$app/stores"
  import { enhance } from "$app/forms"
  import { FormGroup, Input, Label, Button } from "sveltestrap"
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
  <FormGroup>
    <Label for="title">Title</Label>
    <Input id="title" type="text" name="title" bind:value={title} />
  </FormGroup>
  <FormGroup>
    <Label for="description">Description</Label>
    <Input
      id="description"
      type="text"
      name="description"
      bind:value={description}
      placeholder="(Optional)"
    />
  </FormGroup>
  <FormGroup>
    <Label for="body">Body</Label>
    <Input type="textarea" id="body" name="body" bind:value={body} />
  </FormGroup>
  <Button {disabled} color="success" type="submit">submit</Button>
</form>
