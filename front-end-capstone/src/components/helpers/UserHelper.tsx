"use client";

export function createUser(email: string, firstName: string, lastName: string, password: string) {
    console.log(`Creating user with email: ${email}, password: ${password}, first name: ${firstName}, last name: ${lastName}`);
    // make API call to create the user
    // Simulating successful user creation
}

export function checkuser(email: string, pWord: string){
    console.log("user name " + { email} + " password " + {pWord} )
    /** if the user exists call login
     * login()
     * if the user doesnt exist return nothing... as in dont authenticate the user.
     * for now well just assume the user always exists till the backend logic is completed */
}
