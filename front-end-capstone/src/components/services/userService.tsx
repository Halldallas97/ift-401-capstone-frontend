"use client";

const path = "http://localhost:8080/api/server"

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

export async function getWalletBalance(email: string){
    try {
        console.log(email, "here");
    
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