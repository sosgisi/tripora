"use client";

import { Category } from "@/app/lib/definitions";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

interface CategoryModalProps {
  setShowCategoryModal: Dispatch<SetStateAction<boolean>>;
}
interface SelectedCategoryProps {
  selectedCategory: Category | null;
}
type Props = CategoryModalProps & SelectedCategoryProps;

export default function CategoryModal({ setShowCategoryModal, selectedCategory }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    id: selectedCategory?.id || "",
    trip: selectedCategory?.trip || "",
    name: selectedCategory?.name || "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/admin/category", {
        method: selectedCategory ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        return setError(data.error || "Something went wrong");
      }

      router.refresh();
      setShowCategoryModal(false);
    } catch (err) {
      console.error("Submit Error:", err);
      setError("Failed to submit trip");
    }
  };

  return (
    <>
      <div className="overlay-dark"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 dark:text-white z-40 w-[400px] sm:w-[500px] md:w-1/2 rounded text-xs sm:text-sm text-primary p-5">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-heading2">{selectedCategory ? "Edit" : "Add"} Trip</h1>
          <X
            onClick={() => setShowCategoryModal(false)}
            className="hover:text-gray-500 cursor-pointer transform duration-200"
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label>Category Name</label>
            <input
              name="name"
              placeholder="Category name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            />
          </div>

          <div className="flex justify-between items-center gap-5">
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-400 transform duration-200"
            >
              {selectedCategory ? "Update" : "Create"} Category
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
