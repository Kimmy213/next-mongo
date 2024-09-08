"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function Home() {
  const { register, handleSubmit } = useForm();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  async function fetchProducts() {
    const data = await fetch("http://localhost:3000/api/product");
    const p = await data.json();
    setProducts(p);
  }

  async function fetchCategory() {
    const data = await fetch("http://localhost:3000/api/category");
    const c = await data.json();
    setCategory(c);
  }

  const createProduct = (data) => {
    fetch("http://localhost:3000/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => fetchProducts());
  };

  const deleteById = (id) => async () => {
    if (!confirm("Are you sure?")) return;
    
    await fetch(`http://localhost:3000/api/product/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  }

  useEffect(() => {
    fetchCategory();
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-row gap-4">
      <div className="flex-1 w-64 ">
        <form onSubmit={handleSubmit(createProduct)}>
          <div className="grid grid-cols-2 gap-4 m-4 w-1/2">
            <div>Code:</div>
            <div>
              <input
                name="code"
                type="text"
                {...register("code", { required: true })}
                className="border border-black w-full"
              />
            </div>
            <div>Name:</div>
            <div>
              <input
                name="name"
                type="text"
                {...register("name", { required: true })}
                className="border border-black w-full"
              />
            </div>
            <div>Description:</div>
            <div>
              <textarea
                name="description"
                {...register("description", { required: true })}
                className="border border-black w-full"
              />
            </div>
            <div>Price:</div>
            <div>
              <input
                name="name"
                type="number"
                {...register("price", { required: true })}
                className="border border-black w-full"
              />
            </div>
            <div>Category:</div>
            <div>
              <select
                name="category"
                {...register("category", { required: true })}
                className="border border-black w-full"
              >
                {category.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
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
      </div>
      <div className="border m-4 bg-slate-300 flex-1 w-64">
        <h1 className="text-2xl">Products ({products.length})</h1>
        <ul className="list-disc ml-8">
          {
            products.map((p) => (
              <li key={p._id}>
                <button className="border border-black p-1/2" onClick={deleteById(p._id)}>❌</button>{' '}
                <Link href={`/product/${p._id}`} className="font-bold">
                  {p.name}
                </Link>{" "}
                - {p.description}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
