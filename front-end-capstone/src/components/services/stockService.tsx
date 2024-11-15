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

export function sellStock(stock: Stock, email: string) {
  try {
    const response = fetch(`${path}/sell?email=${email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stock),
    }).then(() => {
      window.location.reload();
    });
  } catch (err) {
    console.error(`There was an error updating the wallet: ${err}`);
  }

}

export function updateWallet(quantity: number, email: string, withdrawal: boolean) {
  try {
    const response = fetch(`${path}/wallet?email=${email}&add=${quantity}&withdrawal=${withdrawal}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      window.location.reload();
    });
  } catch (err) {
    console.error(`There was an error updating the wallet: ${err}`);
  }
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
    }).then(() => {
      window.location.reload();
    });
  }
  catch (err) {
    console.error(`There was an error buying the stock: ${err}`);
  }
}

export async function getStock(email: string): Promise<{ stocks: Stock[] }> {
  try {
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


