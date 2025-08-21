"use client";

import { Category, Provider, Trip, TripImage } from "@prisma/client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState, useEffect } from "react";

interface TripModalProps {
  setShowTripModal: Dispatch<SetStateAction<boolean>>;
}
interface SelectedTripProps {
  selectedTrip: Trip | null;
}
type Props = TripModalProps & SelectedTripProps;

export default function TripModal({ setShowTripModal, selectedTrip }: Props) {

  const router = useRouter();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [formData, setFormData] = useState({
    id: selectedTrip?.id || "",
    providerId: selectedTrip?.providerId || "",
    title: selectedTrip?.title || "",
    categoryId: selectedTrip?.categoryId || "",
    description: selectedTrip?.description || "",
    location: selectedTrip?.location || "",
    departureDate: selectedTrip?.departureDate || "",
    returnDate: selectedTrip?.returnDate || "",
    price: selectedTrip?.price || 0,
    maxParticipants: selectedTrip?.maxParticipants || 1,
    images: selectedTrip?.images?.map((img:TripImage) => img.imageUrl).join(", ") || "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "maxParticipants" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("id", formData.id);
    form.append("providerId", formData.providerId);
    form.append("title", formData.title);
    form.append("categoryId", formData.categoryId || "");
    form.append("description", formData.description || "");
    form.append("location", formData.location);
    form.append("departureDate", formData.departureDate);
    form.append("returnDate", formData.returnDate);
    form.append("price", formData.price.toString());
    form.append("maxParticipants", formData.maxParticipants.toString());
    imageFiles.forEach((file) => {
      form.append("images", file);
    });

    try {
      const res = await fetch("/api/admin/trip", {
        method: selectedTrip ? "PUT" : "POST",
        body: form,
      });

      const data = await res.json();
      if (!res.ok) {
        return setError(data.error || "Something went wrong");
      }

      router.refresh();
      setShowTripModal(false);
    } catch (err) {
      console.error("Submit Error:", err);
      setError("Failed to submit trip");
    }
  };

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await fetch("/api/admin/provider");
      const data = await res.json();
      setProviders(data);
    };
    const fetchCategories = async () => {
      const res = await fetch("/api/admin/category");
      const data = await res.json();
      setCategories(data);
    }

    fetchProviders();
    fetchCategories();
  }, []);

  return (
    <>
      <div className="overlay-dark"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 dark:text-white z-40 w-[400px] sm:w-[500px] md:w-1/2 rounded text-xs sm:text-sm text-primary p-5">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-heading2">{selectedTrip ? "Edit" : "Add"} Trip</h1>
          <X
            onClick={() => setShowTripModal(false)}
            className="hover:text-gray-500 cursor-pointer transform duration-200"
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label>Provider Name</label>
            <select
              name="providerId"
              value={formData.providerId}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md dark:bg-gray-900"
            >
              <option value="">Select Provider</option>
              {providers.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.companyName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Title</label>
            <input
              name="title"
              placeholder="Trip Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            />
          </div>

          <div>
            <label>Category</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md dark:bg-gray-900"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded-md min-h-20"
            />
          </div>

          <div>
            <label>Location</label>
            <input
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            />
          </div>

          <div>
            <label>Departure Date</label>
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            />
          </div>

          <div>
            <label>Return Date</label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            />
          </div>

          <div>
            <label>Price</label>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            />
          </div>

          <div>
            <label>Max Participants</label>
            <input
              type="number"
              name="maxParticipants"
              placeholder="Max Participants"
              value={formData.maxParticipants}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md"
            />
          </div>

          <div>
            <label>Images</label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={(e) => {
                if(e.target.files){
                  setImageFiles((prevImages) => [
                    ...prevImages,
                    ...Array.from(e.target.files || []),
                  ]);
                }
              }}
              required
              className="w-full border p-2 rounded-md"
            />
            <div className="text-sm text-gray-500 mt-2">
              { (formData.images && imageFiles.length===0) && (
                <p>Selected: {formData.images}</p>
              )}
              {imageFiles.length > 0 && (
                <p>Selected: {imageFiles.map((img) => img.name).join(", ")}</p>
              )}
            </div>
          </div>

          <div className={`flex ${error ? 'justify-between' : 'justify-end'} items-center gap-5`}>
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-400 transform duration-200"
            >
              {selectedTrip ? "Update" : "Create"} Trip
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
