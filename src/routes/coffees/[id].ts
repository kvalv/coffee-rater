import supabase from "$lib/db";


/** @type {import('./__types/[id]').RequestHandler} */
export async function get({ params }) {
    let res = await supabase.from('coffee').select(`
        name, id, producer, image, date, profile_id,
        rating(rating, date, description, profile(id, name))
        `).eq('id', params.id)

    if (res.error != null) {
        throw res.error;
    }

    let data: { name: string, id: string, producer: string, image: string, date: string, profile_id: string, rating: { rating: number, description: string, profile: { name: string } } } = res.data[0];

    return {
        status: 200,
        body: {
            ...data
        }
    };
}
