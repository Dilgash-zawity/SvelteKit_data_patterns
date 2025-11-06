import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { todo } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

// GET - fetch all todos
export const GET: RequestHandler = async () => {
	try {
		const todos = await db.select().from(todo);
		return json(todos);
	} catch (error) {
		console.error('Error fetching todos:', error);
		return json({ error: 'Failed to fetch todos' }, { status: 500 });
	}
};

// POST - create a new todo
export const POST: RequestHandler = async ({ request }) => {
	try {
		const { name } = await request.json();
		
		if (!name?.trim()) {
			return json({ error: 'Name is required' }, { status: 400 });
		}

		const newTodo = await db.insert(todo).values({ 
			name: name.trim() 
		}).returning();

		return json(newTodo[0], { status: 201 });
	} catch (error) {
		console.error('Error creating todo:', error);
		return json({ error: 'Failed to create todo' }, { status: 500 });
	}
};

// DELETE - delete a todo
export const DELETE: RequestHandler = async ({ request }) => {
	try {
		const { id } = await request.json();
		
		if (!id) {
			return json({ error: 'ID is required' }, { status: 400 });
		}

		const deletedTodo = await db
			.delete(todo)
			.where(eq(todo.id, id))
			.returning();

		if (deletedTodo.length === 0) {
			return json({ error: 'Todo not found' }, { status: 404 });
		}

		return json({ message: 'Todo deleted successfully' });
	} catch (error) {
		console.error('Error deleting todo:', error);
		return json({ error: 'Failed to delete todo' }, { status: 500 });
	}
};
