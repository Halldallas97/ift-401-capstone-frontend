"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface SymbolObject {
  name: string;
  symbol: string;
  cost: number;
}

export default function Ticker() {
  const [search, setSearch] = useState<string>("");
  const [tickers, setTickers] = useState<{ ticker: string; name: string }[]>([]);
  const [symbolObjectsList, setSymbolObjectsList] = useState<SymbolObject[]>([]);
  const router = useRouter(); 

  async function getStocks() {
    try {
      const response = await fetch(
        `https://api.polygon.io/v3/reference/tickers?search=${search}&active=true&limit=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 0e7hWppHXfdD0zxhLTAJ45Uy_fpVeX1_`,
          },
        }
      );

      const data = (await response.json()) as {
        results: { ticker: string; name: string }[];
      };
      setTickers(data.results.map((result) => ({ ticker: result.ticker, name: result.name })));
    } catch (err) {
      console.error(`There was an error fetching data: ${err}`);
    }
  }

  useEffect(() => {
    if (tickers.length > 0) {
      getStockData();
    }
  }, [tickers]);

  async function getStockData() {
    const today = new Date();
    const isoToday = today.toISOString().split('T')[0];
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const isoYesterday = yesterday.toISOString().split('T')[0];
    
    for (const sym of tickers) {
      try {
        const response = await fetch(
          `https://api.polygon.io/v2/aggs/ticker/${sym.ticker}/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&apiKey=0e7hWppHXfdD0zxhLTAJ45Uy_fpVeX1_`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer 0e7hWppHXfdD0zxhLTAJ45Uy_fpVeX1_`,
            },
          }
        );

        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const stock = {
            name: sym.name,
            symbol: sym.ticker,
            cost: data.results[0].c,
          };
          setSymbolObjectsList((prevList) => [...prevList, stock]);
        }
      } catch (err) {
        console.error(`There was an error fetching data for ${sym.ticker}: ${err}`);
      }
    }
  }

  const handleBuyClick = (obj: SymbolObject) => {
    router.push(`/buy?symbol=${obj.symbol}&name=${obj.name}&cost=${obj.cost}`);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        className="rounded-md p-2 text-black"
        placeholder="stock symbol"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="p-2 m-2 rounded-md bg-green-500 hover:bg-green-800" onClick={getStocks}>
        Submit
      </button>
      <div className="mt-4 text-white">
        <ul>
          {symbolObjectsList.map((obj) => (
            <button
              key={obj.symbol} // Key prop moved to the button element
              onClick={() => handleBuyClick(obj)}
            >
              <div className="rounded-lg bg-transparent border border-pink-800 p-2 mb-2">
                <li className="flex justify-between">
                  <div className="flex space-x-8">
                    <span>{obj.symbol}</span>
                    <span>{obj.name}</span>
                  </div>
                  <div>
                    <span>{Math.round(obj.cost * 100) / 100}</span>
                  </div>
                </li>
              </div>
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
}
