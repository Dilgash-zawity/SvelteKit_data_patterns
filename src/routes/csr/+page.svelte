<script lang="ts">
	import { onMount } from 'svelte';

	interface Todo {
		id: string;
		name: string;
	}

	let todos = $state<Todo[]>([]);
	let loading = $state(false);
	let error = $state('');
	let newTodoName = $state('');

	async function fetchTodos() {
		loading = true;
		error = '';
		try {
			const response = await fetch('/api/data');
			if (!response.ok) throw new Error('Failed to fetch todos');
			todos = await response.json();
		} catch (e: any) {
			error = e?.message || 'Unknown error';
		} finally {
			loading = false;
		}
	}

	async function createTodo() {
		if (!newTodoName.trim()) return;
		
		error = '';
		try {
			const response = await fetch('/api/data', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: newTodoName.trim() })
			});
			
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to create todo');
			}
			
			newTodoName = '';
			await fetchTodos();
		} catch (e: any) {
			error = e?.message || 'Unknown error';
		}
	}

	async function deleteTodo(id: string) {
		error = '';
		try {
			const response = await fetch('/api/data', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id })
			});
			
			if (!response.ok) throw new Error('Failed to delete todo');
			await fetchTodos();
		} catch (e: any) {
			error = e?.message || 'Unknown error';
		}
	}

	onMount(fetchTodos);
</script>

<div>
	<h1>CSR </h1>

	<div>
		<input
			bind:value={newTodoName}
			placeholder="Enter a new todo..."
			onkeydown={(e) => e.key === 'Enter' && createTodo()}
		/>
		<button onclick={createTodo} disabled={!newTodoName.trim()}>
			Add Todo
		</button>
	</div>

	{#if error}
		<div style="color: red;">
			{error}
			<button onclick={() => error = ''}>✕</button>
		</div>
	{/if}

	{#if loading}
		<p>Loading...</p>
	{:else if todos.length === 0}
		<p>No todos yet. Add one above!</p>
	{:else}
		{#each todos as todo (todo.id)}
			<div>
				<span>{todo.name}</span>
				<button onclick={() => deleteTodo(todo.id)}>Delete</button>
			</div>
		{/each}
	{/if}
</div>
