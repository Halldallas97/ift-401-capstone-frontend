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
interface Stock {
  company: string;
  sym: string;
  cost: number;
  quantity: number;
  volume: number;
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

export async function getStock(email: string): Promise<{ stocks: Stock[] }> {
  try {
    console.log(email, "here");

    const response = await fetch(`${path}/stock?email=${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data); 

    return data; 
  } catch (err) {
    console.error(`There was an error fetching the stock: ${err}`);
    return { stocks: [] }; 
  }
}


