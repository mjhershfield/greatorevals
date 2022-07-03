<script lang="ts">
  import logo from './assets/svelte.png'
  import Counter from './lib/Counter.svelte'
</script>

<main class=" text-center p-1 m-x-0 my-auto font-sans">
  <img src={logo} alt="Svelte Logo" class="h-16 w-16" />
  <h1 class=" text-red-600 text-7xl font-thin max-w-none m-2 uppercase">Hello Typescript!</h1>

  <Counter />

  <p class="max-w-none m-2 text-base">
    Visit <a href="https://svelte.dev">svelte.dev</a> to learn how to build Svelte
    apps.
  </p>

  <p class="max-w-none m-2 text-base">
    Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
    the officially supported framework, also powered by Vite!
  </p>
</main>
