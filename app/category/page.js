"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function Home() {
  const [categoryList, setCategoryList] = useState([]);
  const { register, handleSubmit } = useForm();

  async function fetchCategory() {
    const data = await fetch("http://localhost:3000/api/category");
    const c = await data.json();
    setCategoryList(c);
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  function createCategory(data) {
    fetch("http://localhost:3000/api/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => fetchCategory());
  }

  return (
    <main>
      <form onSubmit={handleSubmit(createCategory)}>
        <div className="grid grid-cols-2 gap-4 w-fit m-4">
          <div>Category:</div>
          <div>
            <input
              name="name"
              type="text"
              {...register("name", { required: true })}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div className="col-span-2">
            <input
              type="submit"
              value="Add"
              className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            />
          </div>
        </div>
      </form>
      <div>
        <h1>Category ({categoryList.length})</h1>
        {categoryList.map((category) => (
          <div key={category._id}>
            <Link href={`/product/category/${category._id}`} className="text-red-600">
              {category.name}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
