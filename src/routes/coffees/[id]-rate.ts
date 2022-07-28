import { page } from "$app/stores";
import supabase from "$lib/db";

/** @type {import('./__types/[id]-rate').RequestHandler} */
export async function get({ params }) {
    let res = await supabase
        .from("coffee")
        .select(
            "name, producer, image, date, rating(rating, description, profile(name))"
        )
        .eq("id", params.id);
    if (res.error != null) {
        throw res.error;
    }
    let data = res.data[0];

    return {
        status: 200,
        body: {
            ...data,
        },
    };
}

/** @type {import('./__types/[id]-rate').RequestHandler} */
export async function post({ request, params }) {
    let f = await request.formData();
    let rating = f.get("rating");
    let description = f.get("description");
    let image = f.get("uploadURL");
    let last = f.get("xxx");
    console.log("post!", description, rating, last, supabase.auth.user(), "!");

    if (supabase.auth.user() == null) {
        return {
            status: 400,
            body: { error: "could not find current user" },
        };
    }
    let { data, error } = await supabase.from("rating").insert([
        {
            rating,
            description,
            coffee_id: params.id,
            profile_id: supabase.auth.user()?.id,
        },
    ]);

    console.log(request.url, data, error);
    if (error) {
        return {
            status: 400,
            body: { error },
        };
    }
    return {
        status: 303,
        headers: {
            location: request.url.replace(`-rate$`, ""),
        },
    };
}
