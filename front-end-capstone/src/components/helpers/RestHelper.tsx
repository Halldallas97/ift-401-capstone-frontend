"use client";

const path = "http://localhost:8080/api/server"

interface StockBuy{
    quantity: number; 
    name: string; 
    costPerStock: number; 
    total: number; 
    symbol: string; 
    email: string;
    newBalance:number;  
}

export function buyStock(quantity: number, name:string, costPerStock:number, total:number, symbol:string, email:string, newBalance:number ) {
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

export function createUser(email: string, userName: string, firstName: string, lastName: string, password: string) {
    console.log(`Creating user with email: ${email}, password: ${password}, first name: ${firstName}, last name: ${lastName}`);
    try {
        const response = fetch(`${path}/trader`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, userName, firstName, lastName, password }),
        });
    }
    catch (err) {
        console.error(`There was an error creating trader: ${err}`);
    }
}

export async function checkuser(email: string, pWord: string) {
    console.log(`user name: ${email}, password: ${pWord}`);
    try {
        const response = await fetch(`${path}/login?email=${email}&password=${pWord}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const user = await response.json();
        return user;
    } catch (err) {
        console.error(`There was an error finding trader: ${err}`);
        throw err; 
    }
}
