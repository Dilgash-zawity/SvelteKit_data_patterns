import { db } from "$lib/server/db";
import { todo } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import { fail } from "@sveltejs/kit";

// Load existing todos from the database
export async function load() {
  const todos = await db.select().from(todo);
  return { todos };
}

export const actions = {
  // Create a new todo item
  create: async ({ request }) => {
    const data = await request.formData();
    const name = data.get("name");
    if (!name || typeof name !== "string") {
      return fail(400, { error: "Name is required" });
    }
    await db.insert(todo).values({ name: name.trim() });
  },

  //  Delete a todo item by ID
  delete: async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id")?.toString();
    if (!id) return fail(400, { error: "Invalid ID" });
    await db.delete(todo).where(eq(todo.id, id));
  },
};
