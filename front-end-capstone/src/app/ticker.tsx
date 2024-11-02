"use client"

import { useState } from "react"

export default function Ticker() {
    const [search, setSearch] = useState<string>("");
    const [tickers, setTickers] = useState<string[]>([]);

    async function getStocks() {
        try {
            const response = await fetch(`https://api.polygon.io/v3/reference/tickers?search=${search}&active=true&limit=5`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer fTCtsri6rFjgXsCpplFtU92SXzZlSgAb`
                },
            });

            const data = await response.json() as { results: { ticker: string }[] };
            setTickers(data.results.map(result => result.ticker));

            getStockData();

        } catch (err) {
            console.error(`There was an error fetching data: ${err}`);
        }
    }

    async function getStockData() {
        // Assuming tickers is an array of stock symbols
        for (const symbol of tickers) {
            try {
                const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&apiKey=fTCtsri6rFjgXsCpplFtU92SXzZlSgAb`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer fTCtsri6rFjgXsCpplFtU92SXzZlSgAb`
                    },
                });

                const data = await response.json() 

                // Do something with the data
                console.log(`Data for ${symbol}:`, data);

            } catch (err) {
                console.error(`There was an error fetching data for ${symbol}: ${err}`);
            }
        }
    }

    return (

        <div className="p-4">
            <input type="text" className="rounded-md p-2 text-black" placeholder="stock symbol" onChange={(e) => setSearch(e.target.value)} />

            <button className="p-2 m-2 rounded-md bg-green-900" onClick={getStocks}>
                Submit
            </button>
        </div>

    )
}




