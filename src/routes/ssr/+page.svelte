<script>
  import { enhance } from "$app/forms";

  let { data } = $props();
</script>

<div>
  <h1>SSR</h1>

  <form method="POST" action="?/create" use:enhance>
    <input name="name" placeholder="Enter a new todo..." required />
    <button type="submit">Add Todo</button>
  </form>

  {#if data.todos.length === 0}
    <p>No todos yet. Add one above!</p>
  {:else}
    {#each data.todos as todo (todo.id)}
      <div>
        <span>{todo.name}</span>
        <form method="POST" action="?/delete" use:enhance style="display: inline;">
          <input type="hidden" name="id" value={todo.id} />
          <button type="submit">Delete</button>
        </form>
      </div>
    {/each}
  {/if}
</div>