"use client"

import { useState, useEffect } from "react";

interface SymbolObject {
    name: string;
    symbol: string;
    cost: number;
}

export default function Ticker() {
    const [search, setSearch] = useState<string>("");
    const [tickers, setTickers] = useState<{ ticker: string; name: string }[]>([]);
    const [symbolObjectsList, setSymbolObjectsList] = useState<SymbolObject[]>([]); // List of SymbolObject
    const [selectedSymbolObject, setSelectedSymbolObject] = useState<SymbolObject | null>(null); // Single SymbolObject, or null if not selected

    async function getStocks() {
        try {
            const response = await fetch(`https://api.polygon.io/v3/reference/tickers?search=${search}&active=true&limit=10`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer fTCtsri6rFjgXsCpplFtU92SXzZlSgAb`
                },
            });

            const data = await response.json() as { results: { ticker: string, name: string }[] };
            setTickers(data.results.map(result => ({ ticker: result.ticker, name: result.name })));


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
        for (const sym of tickers) {
            try {
                const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${sym.ticker}/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&apiKey=fTCtsri6rFjgXsCpplFtU92SXzZlSgAb`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer fTCtsri6rFjgXsCpplFtU92SXzZlSgAb`
                    },
                });

                const data = await response.json();
                const stock = { name: sym.name, symbol: sym.ticker, cost: data.results[0].c }; // Use sym.ticker for symbol
                setSelectedSymbolObject(stock);
                setSymbolObjectsList(prevList => [...prevList, stock]); // Add the stock to the list

            } catch (err) {
                console.error(`There was an error fetching data for ${sym.ticker}: ${err}`);
            }
        }
    }

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
                        <div key={obj.symbol} className="rounded-lg bg-transparent border border-pink-800 p-2 mb-2">
                            <li className="flex justify-between">
                                <div className="flex space-x-8">
                                    <span>{obj.symbol}</span>
                                    <span>{obj.name}</span>
                                </div>
                                <div>
                                    <span>{Math.round(obj.cost *100 ) / 100}</span>
                                </div>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}
