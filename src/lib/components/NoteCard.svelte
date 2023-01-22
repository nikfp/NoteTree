<script lang="ts">
  export let title: string
  export let cardBody: string | null
  export let href: string
</script>

<a data-sveltekit-preload-data="hover" {href}>
  <div class="p-2 mb-3 card cardlink">
    <h4 style={cardBody ? "text-decoration: underline" : ""}>
      {title}
    </h4>
    {#if cardBody}
      <p>{cardBody}</p>
    {/if}
  </div>
</a>

<style>
  a {
    text-decoration: none;
    color: inherit;
  }
  .cardlink {
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }

  .cardlink:hover {
    box-shadow: 0 0.375rem 0.25rem 0.125rem var(--fbc-secondary-text, var(--secondary));
    transform: translateY(-0.375rem);
  }

  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
    padding: .5rem;
    margin-bottom: 1rem;
  }
  
  h4 {
    font-size: 1.5rem;
    margin-bottom: .5rem;
    font-weight: 500;
    line-height: 1.2;
    margin-top: 0;
  }
</style>
