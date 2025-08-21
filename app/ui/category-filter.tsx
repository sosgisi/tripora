'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Category } from "../lib/definitions";

export default function CategoryFilter({ categories }: { categories: Category[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const selectedCategory = searchParams.get('category') ?? '';

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    const params = new URLSearchParams(searchParams);
    
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }

    if(pathname === '/'){
      replace(`${pathname}trips/?${params.toString()}`);
    }else{
      replace(`${pathname}?${params.toString()}`);
    }

  };

  return (
    <select
      id="category"
      value={selectedCategory}
      onChange={handleCategoryChange}
      className="block w-40 rounded-md outline-none shadow-sm text-sm ring ring-blue-500 px-3 text-primary bg-white dark:text-primary-dark dark:bg-black"
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category.id} value={category.name}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
