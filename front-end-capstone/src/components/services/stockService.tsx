"use client";

const path = "http://localhost:8080/api/server/stock"

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
interface Transaction {
  company: string;
  sym: string;
  cost: number;
  quantity: number;
  sellPrice: number; 
  evaluation: number;
}

export function sellStock(stock: Stock, email: string, stockValue: number) {
  const confirmSell = window.confirm(
    `Are you sure you want to sell ${stock.company} at $${stockValue}?`
  );

  if (!confirmSell) {
    return;
  }
  try {
    const response = fetch(`${path}/sell?email=${email}&currentPrice=${stockValue}`, {
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
export async function getWalletBalance(email: string){
    try {
    
        const response = await fetch(`${path}/wallet?email=${email}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Network response failed");
        }
        const data = await response.json();    
        return data; 
      } catch (err) {
        console.error(`There was an error fetching the wallet: ${err}`);
        
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
export async function getTransactions(email: string): Promise<{ transactionList: Transaction[] }> {
  try {
    const response = await fetch(`${path}/transactions?email=${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return data;
  } catch (err) {
    console.error(`There was an error fetching the stock: ${err}`);
    return { transactionList: [] };
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


