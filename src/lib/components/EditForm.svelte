<script lang="ts">
  import { enhance } from "$app/forms"
  import { FormGroup, Input, Label, Button } from "sveltestrap"
  export let title = ""
  export let body = ""
</script>

<form use:enhance method="post">
  <FormGroup>
    <Label for="title">Title</Label>
    <Input id="title" type="text" name="title" bind:value={title} />
  </FormGroup>
  <FormGroup>
    <Label for="body">Body</Label>
    <Input type="textarea" id="body" name="body" bind:value={body} />
  </FormGroup>
  <Button color="success" type="submit">submit</Button>
</form>
