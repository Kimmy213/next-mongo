import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function BoxBasic() {
  return (
    <main>
      <Box component="section" className="border border-gray-800 m-5 text-center">
        <h1>Stock Management v1.0</h1>
        <ul>
          <li><a href="/product">Products</a></li>
          <li><a href="/category">Category</a></li>
        </ul>
        
      </Box>
    </main>
  );
}
