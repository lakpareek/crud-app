import "../App.css";
import React, { useEffect, useState } from "react";
import config from "../.config";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function ProfilePage() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/userData`, {
          
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const userData = await response.json();
        setData(userData);
      } catch (error) {
        console.error("An error occurred:", error);
        alert("An Error occurred :(");
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="dark:text-gray-400 bg-gray-100 dark:bg-[#1A1A1A] flex items-center justify-center flex-col">
      <h1 className="text-[6vw]">Welcome {data.username}!</h1>
      <div className="flex justify-center items-center flex-col">
        <h2 className="text-[4vw]">Your Products:</h2>
        <TableContainer
          component={Paper}
          className="w-full max-w-4xl dark:bg-[#1A1A1A]"
        >
          <Table sx={{ minWidth: 650 }} aria-label="product table">
            <TableHead>
              <TableRow>
                <TableCell className="dark:text-gray-200">
                  Product Name
                </TableCell>
                <TableCell className="dark:text-gray-200" align="right">
                  Brand
                </TableCell>
                <TableCell className="dark:text-gray-200" align="right">
                  Type
                </TableCell>
                <TableCell className="dark:text-gray-200" align="right">
                  Buying Date
                </TableCell>
                <TableCell className="dark:text-gray-200" align="right">
                  Warranty Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.products && data.products.length > 0 ? (
                data.products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell
                      component="th"
                      scope="row"
                      className="dark:text-gray-400"
                    >
                      {product.product_name}
                    </TableCell>
                    <TableCell className="dark:text-gray-400" align="right">
                      {product.brand}
                    </TableCell>
                    <TableCell className="dark:text-gray-400" align="right">
                      {product.type}
                    </TableCell>
                    <TableCell className="dark:text-gray-400" align="right">
                      {product.buying_date}
                    </TableCell>
                    <TableCell className="dark:text-gray-400" align="right">
                      {product.warranty_date}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
