import supabase from "$lib/db";


/** @type {import('./__types/[id]').RequestHandler} */
export async function get({ params }) {
    let res = await supabase.from('coffee').select(`
        name, id, producer, image, date, profile_id,
        rating(rating, profile(name))
        `).eq('id', params.id)

    if (res.error != null) {
        throw res.error;
    }

    let data: { name: string, id: string, producer: string, image: string, date: string, profile_id: string, rating: { rating: number, profile: { name: string } } } = res.data[0];

    console.log('!!!--- got data', data)
    // params.id;
    return {
        status: 200,
        body: {
            ...data
        }
    };
}
