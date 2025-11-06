<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<title>SvelteKit CRUD </title>
</svelte:head>

<nav>
	<div>
		<h2><a href="/">SvelteKit CRUD</a></h2>
		<nav>
			<a href="/ssr">SSR</a>
			<a href="/csr">CSR</a>
			<a href="/remote">Remote Functions</a>
		</nav>
	</div>
</nav>

<main>
	{@render children()}
</main>


<style>
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;
    }
</style>