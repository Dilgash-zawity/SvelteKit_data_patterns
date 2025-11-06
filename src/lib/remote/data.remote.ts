import { query, form, command } from '$app/server';
import { db } from '$lib/server/db';
import { todo } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

// Query function to get all todos
export const getTodos = query(async () => {
	const todos = await db.select().from(todo);
	return todos;
});

// Form function to create a new todo
export const createTodo = form(
	'unchecked',
	async (data: { name: string }, invalid) => {
		if (!data.name?.trim()) {
			invalid('Todo name is required');
		}

		const newTodo = await db.insert(todo).values({ 
			name: data.name.trim() 
		}).returning();

		// Refresh the todos query after creating
		await getTodos().refresh();

		return { success: true, todo: newTodo[0] };
	}
);

// Command function to delete a todo
export const deleteTodo = command(
	'unchecked',
	async (id: string) => {
		if (!id) {
			error(400, 'ID is required');
		}

		const deletedTodo = await db
			.delete(todo)
			.where(eq(todo.id, id))
			.returning();

		if (deletedTodo.length === 0) {
			error(404, 'Todo not found');
		}

		// Refresh the todos query after deleting
		await getTodos().refresh();
// 
		return { success: true, message: 'Todo deleted successfully' };
	}
);

// Command function to create a todo (alternative to form)
export const addTodo = command(
	'unchecked',
	async (data: { name: string }) => {
		if (!data.name?.trim()) {
			error(400, 'Todo name is required');
		}

		const newTodo = await db.insert(todo).values({ 
			name: data.name.trim() 
		}).returning();

		// Refresh the todos query after creating
		await getTodos().refresh();

		return { success: true, todo: newTodo[0] };
	}
);
