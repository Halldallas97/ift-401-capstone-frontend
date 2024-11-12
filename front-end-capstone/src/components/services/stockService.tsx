"use client";

const path = "http://localhost:8080/api/server"

interface StockBuy {
  quantity: number;
  name: string;
  costPerStock: number;
  total: number;
  symbol: string;
  email: string;
  newBalance: number;
}

export function buyStock(quantity: number, name: string, costPerStock: number, total: number, symbol: string, email: string, newBalance: number) {
  console.log(`sending buy order ${quantity}, ${name}, ${costPerStock}, ${total}, ${symbol}, ${email}, ${newBalance}`)
  const stockBuy: StockBuy = {
    quantity,
    name,
    costPerStock,
    total,
    symbol,
    email,
    newBalance,
  };

  try {
    const response = fetch(`${path}/buy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stockBuy),
    });
  }
  catch (err) {
    console.error(`There was an error buying the stock: ${err}`);
  }
}

export async function getStock(email: string) {
  try {
    console.log(email, "here")
    const response = await fetch(`${path}/stock?email=${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log(response);
  }
  catch (err) {
    console.error(`There was an error buying the stock: ${err}`);
  }
}

