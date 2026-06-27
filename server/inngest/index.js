import { Inngest } from "inngest";
import prisma from "../config/prisma.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "profile-marketplace" });

// Inngest function to save user data to a database
const syncUserCreation = inngest.createFunction(
    {id: "sync-user-from-clerk"},
    {event: "clerk/user.created"},
    async ({event}) =>{
        const {data} = event

        // Check if uuser already exist in the database
        const user = await prisma.user.findFirst({
            where: {id: data.id}
        })
        if(user){
            // Update user data if it exists
            await prisma.user.update({
                where: {id: data.id},
                data: {
                    email: data?.email_addresses[0]?.email_addresses,
                    //9:08:58
                }
            })
        }
    },
);

// Create an empty array where we'll export future Inngest functions
export const functions = [];