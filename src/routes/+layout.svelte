<script lang="ts">
  import { navigating, page } from "$app/stores"
  import Loading from "$lib/components/Loading.svelte"
</script>

{#if $navigating}
  <Loading />
{/if}

<div>
  <header>
    <div class="signedInStatus">
      <p class="nojs-show loaded">
        {#if $page.data.session}
          {#if $page.data.session.user?.image}
            <span
              style="background-image: url('{$page.data.session.user.image}')"
              class="avatar"
            />
          {/if}
          <span class="signedInText">
            <small>Signed in as</small><br />
            <strong
              >{$page.data.session.user?.name ??
                $page.data.session.user?.email}</strong
            >
          </span>
          <a href="/auth/signout" class="button">Sign out</a>
        {:else}
          <span class="notSignedInText">You are not signed in</span>
          <a href="/auth/signin" class="buttonPrimary">Sign in</a>
        {/if}
      </p>
    </div>
    <nav>
      <ul class="navItems">
        <li class="navItem"><a href="/">Home</a></li>
      </ul>
    </nav>
  </header>
  <slot />
</div>

<style>
  :global(body) {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
    padding: 0 1rem 1rem 1rem;
    max-width: 680px;
    background: var(--clr-background);
    color: #333;
    box-sizing: border-box;
    margin: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    text-align: left;
  }
  :global(li),
  :global(p) {
    line-height: 1.5rem;
    margin-bottom: 1rem;
  }
  :global(a) {
    font-weight: 500;
    text-decoration: none;
  }
  :global(a:visited) {
    color: inherit;
  }
  :global(a:hover) {
    text-decoration: none;
  }
  :global(h1,h2,h3,h4,h5,h6){
    margin-bottom: .5rem;
    font-weight: 500;
    line-height: 1.2;
  }
  :global(h1) {
    font-size: 2.5rem;
  }
  :global(hr) {
    border: 1px solid #ddd;
    margin-top: 1rem;
    margin-bottom: 1rem;
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }
  :global(iframe) {
    background: #ccc;
    border: 1px solid #ccc;
    height: 10rem;
    width: 100%;
    border-radius: 0.5rem;
    filter: invert(1);
  }
  :global(.btnn) {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    background-color: transparent;
    /* border: 1px solid transparent; */
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: var(--brd-radius);
    border-style: solid;
    border-width: 1px;
  }

  :global(.btnn-outline-secondary) {
    color: var(--clr-secondary);
    border-color: var(--clr-secondary);
    background-color: var(--clr-background);
  }

  :global(.btnn-outline-secondary:hover,.btnn-outline-secondary:active){
    color: var(--clr-background);
    background-color: var(--clr-secondary);
  }
  :global(.btnn-outline-danger) {
    color: var(--clr-danger);
    border-color: var(--clr-danger);
    background-color: var(--clr-background);
  }

  :global(.btnn-outline-danger:hover,.btnn-outline-danger:active){
    color: var(--clr-background);
    background-color: var(--clr-danger);
  }

  :global(.btnn-spaced) {
    margin: 0.125rem 0;
  }

  :global(.btnn-sm) {
    padding: .25rem .5rem;
    font-size: .875rem;
    line-height: 1.5;
    border-radius: calc(var(--brd-radius) * .8);
  }
  .nojs-show {
    opacity: 1;
    top: 0;
  }
  .signedInStatus {
    display: block;
    min-height: 4rem;
    width: 100%;
  }
  .loaded {
    position: relative;
    top: 0;
    opacity: 1;
    overflow: hidden;
    border-radius: 0 0 0.6rem 0.6rem;
    padding: 0.6rem 1rem;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease-in;
  }
  .signedInText,
  .notSignedInText {
    position: absolute;
    padding-top: 0.8rem;
    left: 1rem;
    right: 6.5rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inherit;
    z-index: 1;
    line-height: 1.3rem;
  }
  .signedInText {
    padding-top: 0rem;
    left: 4.6rem;
  }
  .avatar {
    border-radius: 2rem;
    float: left;
    height: 2.8rem;
    width: 2.8rem;
    background-color: white;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .button,
  .buttonPrimary {
    float: right;
    margin-right: -0.4rem;
    font-weight: 500;
    border-radius: 0.3rem;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1.4rem;
    padding: 0.7rem 0.8rem;
    position: relative;
    z-index: 10;
    background-color: transparent;
    color: #555;
  }
  .buttonPrimary {
    background-color: #346df1;
    border-color: #346df1;
    color: #fff;
    text-decoration: none;
    padding: 0.7rem 1.4rem;
  }
  .buttonPrimary:hover {
    box-shadow: inset 0 0 5rem rgba(0, 0, 0, 0.2);
  }
  .navItems {
    margin-bottom: 2rem;
    padding: 0;
    list-style: none;
  }
  .navItem {
    display: inline-block;
    margin-right: 1rem;
  }
</style>
