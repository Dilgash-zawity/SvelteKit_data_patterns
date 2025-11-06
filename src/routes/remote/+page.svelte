<script lang="ts">
  import {
    getTodos,
    createTodo,
    deleteTodo,
    addTodo,
  } from "$lib/remote/data.remote";

  const todos = getTodos();
  let newTodoName = $state("");

  async function handleCreateTodo() {
    if (!newTodoName.trim()) return;
    await addTodo({ name: newTodoName.trim() });
    newTodoName = "";
  }

  async function handleDeleteTodo(id: string) {
    await deleteTodo(id);
  }
</script>

<div>
  <h1>Remote Functions</h1>

  <form {...createTodo}>
    <input
      {...createTodo.fields.name.as("text")}
      placeholder="Enter a new todo..."
    />
    {#each createTodo.fields.name.issues() as issue, index (index)}
      <span style="color: red;">{issue.message}</span>
    {/each}
    <button type="submit" disabled={!!createTodo.pending}>
      {createTodo.pending ? "Adding..." : "Add Todo"}
    </button>
  </form>

  <div>
    <input
      bind:value={newTodoName}
      placeholder="Or add using command..."
      onkeydown={(e) => e.key === "Enter" && handleCreateTodo()}
    />
    <button onclick={handleCreateTodo} disabled={!newTodoName.trim()}>
      Add
    </button>
  </div>

  {#await todos}
    <p>Loading...</p>
  {:then todosList}
    {#if todosList.length === 0}
      <p>No todos yet. Add one above!</p>
    {:else}
      {#each todosList as todo (todo.id)}
        <div>
          <span>{todo.name}</span>
          <button onclick={() => handleDeleteTodo(todo.id)}>Delete</button>
        </div>
      {/each}
    {/if}
  {:catch error}
    <p style="color: red;">Error: {error.message}</p>
  {/await}
</div>
