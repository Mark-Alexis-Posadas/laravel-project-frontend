import { useState } from "react";
import type { Category } from "../types/category";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryApi";
import { useFetch } from "../hooks/useFetch";

const Categories = () => {
  const { data, setData, loading, refetch } = useFetch(getCategories);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [editing, setEditing] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState<Category | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm({ name: "", description: "" });
    setEditing(null);
  };

  // SUBMIT (CREATE / UPDATE)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editing) {
        await updateCategory(editing.id, form);
      } else {
        await createCategory(form);
      }

      const res = await getCategories();
      setData(res.data);

      resetForm();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // DELETE
  const handleDelete = async () => {
    if (!deleting) return;

    try {
      await deleteCategory(deleting.id);

      const res = await getCategories();
      setData(res.data);

      setDeleting(null);
    } catch (err) {
      console.error(err);
    }
  };

  // EDIT
  const handleEdit = (category: Category) => {
    setEditing(category);
    setForm({
      name: category.name,
      description: category.description ?? "",
    });
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Categories</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-4"
      >
        <h2 className="text-xl font-semibold">
          {editing ? "Update Category" : "Add Category"}
        </h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Category name"
          className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          rows={3}
          className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="bg-indigo-500 px-4 py-2 rounded-lg"
          >
            {submitting
              ? editing
                ? "Updating..."
                : "Creating..."
              : editing
                ? "Update"
                : "Create"}
          </button>

          {editing && (
            <button
              type="button"
              onClick={resetForm}
              className="text-red-400 hover:underline"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* LIST */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((cat) => (
          <div
            key={cat.id}
            className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl"
          >
            <h3 className="text-xl font-bold">{cat.name}</h3>
            <p className="text-zinc-400 text-sm mt-2">
              {cat.description || "No description"}
            </p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(cat)}
                className="text-indigo-400 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => setDeleting(cat)}
                className="text-red-400 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DELETE MODAL */}
      {deleting && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setDeleting(null)}
          />

          <div className="relative bg-zinc-900 border border-zinc-800 p-6 rounded-xl w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold text-red-400">Delete Category</h2>

            <p>
              Are you sure you want to delete{" "}
              <span className="text-white font-bold">{deleting.name}</span>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleting(null)}
                className="px-4 py-2 bg-zinc-800 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
