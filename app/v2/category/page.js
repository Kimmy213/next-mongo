"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

export default function Home() {
  const [category, setCategory] = useState([]);
  const { register, handleSubmit } = useForm();
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE
  console.log(`${API_BASE}/category`)
  async function fetchCategory() {
    const data = await fetch(`${API_BASE}/category`);
    const c = await data.json();
    setCategory(c);
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  function createCategory(data) {
    fetch(`${API_BASE}/category`, {
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
      <div className="mx-4">
        <h1>Category ({category.length})</h1>
        <List>
          {category.map((category) => (
            <ListItem key={category._id}>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>
                  {category.name}
                <Link href={`/product/category/${category._id}`} className="text-red-600">
                </Link>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </div>
    </main>
  );
}
