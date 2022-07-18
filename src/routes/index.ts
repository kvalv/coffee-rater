import db from '$lib/db';
import type { definitions } from 'src/types';

export type coffeeJoinRating = definitions['coffee'] & { rating: definitions['rating'] & {profile: { name: string }}}[]


/** @type {import('./__types/index').RequestHandler} */
export async function get() {

    let x = await db.from('coffee').select(`
        name,
        id,
        producer,
        image,
        date,
        rating (
            *,
            profile (name)
        )
    `)
    console.log(JSON.stringify(x))

    if (x.error != null) {
        console.log('unable to query data; ', x)
    }
    let coffees: coffeeJoinRating[] = x.data
    return {
        body: { coffees: coffees }
    }
}
