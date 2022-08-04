import db from "$lib/db";
import type { definitions } from "src/types";

export type coffeeJoinRating = definitions["coffee"] &
    { rating: definitions["rating"] & { profile: { name: string } } }[];

/** @type {import('./__types/index').RequestHandler} */
export async function get() {
    let { error, data } = await db.rpc("fetch_cardinfo");
    if (error) {
        console.error("error data...", error);
        return {
            status: 400,
            body: { message: error.message },
        };
    }

    return {
        body: { coffees: data },
    };
}
