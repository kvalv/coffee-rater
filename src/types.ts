/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/": {
        get: {
            responses: {
                /** OK */
                200: unknown;
            };
        };
    };
    "/producer": {
        get: {
            parameters: {
                query: {
                    name?: parameters["rowFilter.producer.name"];
                    /** Filtering Columns */
                    select?: parameters["select"];
                    /** Ordering */
                    order?: parameters["order"];
                    /** Limiting and Pagination */
                    offset?: parameters["offset"];
                    /** Limiting and Pagination */
                    limit?: parameters["limit"];
                };
                header: {
                    /** Limiting and Pagination */
                    Range?: parameters["range"];
                    /** Limiting and Pagination */
                    "Range-Unit"?: parameters["rangeUnit"];
                    /** Preference */
                    Prefer?: parameters["preferCount"];
                };
            };
            responses: {
                /** OK */
                200: {
                    schema: definitions["producer"][];
                };
                /** Partial Content */
                206: unknown;
            };
        };
        post: {
            parameters: {
                body: {
                    /** producer */
                    producer?: definitions["producer"];
                };
                query: {
                    /** Filtering Columns */
                    select?: parameters["select"];
                };
                header: {
                    /** Preference */
                    Prefer?: parameters["preferReturn"];
                };
            };
            responses: {
                /** Created */
                201: unknown;
            };
        };
        delete: {
            parameters: {
                query: {
                    name?: parameters["rowFilter.producer.name"];
                };
                header: {
                    /** Preference */
                    Prefer?: parameters["preferReturn"];
                };
            };
            responses: {
                /** No Content */
                204: never;
            };
        };
        patch: {
            parameters: {
                query: {
                    name?: parameters["rowFilter.producer.name"];
                };
                body: {
                    /** producer */
                    producer?: definitions["producer"];
                };
                header: {
                    /** Preference */
                    Prefer?: parameters["preferReturn"];
                };
            };
            responses: {
                /** No Content */
                204: never;
            };
        };
    };
    "/coffee": {
        get: {
            parameters: {
                query: {
                    id?: parameters["rowFilter.coffee.id"];
                    name?: parameters["rowFilter.coffee.name"];
                    producer?: parameters["rowFilter.coffee.producer"];
                    image?: parameters["rowFilter.coffee.image"];
                    date?: parameters["rowFilter.coffee.date"];
                    /** Filtering Columns */
                    select?: parameters["select"];
                    /** Ordering */
                    order?: parameters["order"];
                    /** Limiting and Pagination */
                    offset?: parameters["offset"];
                    /** Limiting and Pagination */
                    limit?: parameters["limit"];
                };
                header: {
                    /** Limiting and Pagination */
                    Range?: parameters["range"];
                    /** Limiting and Pagination */
                    "Range-Unit"?: parameters["rangeUnit"];
                    /** Preference */
                    Prefer?: parameters["preferCount"];
                };
            };
            responses: {
                /** OK */
                200: {
                    schema: definitions["coffee"][];
                };
                /** Partial Content */
                206: unknown;
            };
        };
        post: {
            parameters: {
                body: {
                    /** coffee */
                    coffee?: definitions["coffee"];
                };
                query: {
                    /** Filtering Columns */
                    select?: parameters["select"];
                };
                header: {
                    /** Preference */
                    Prefer?: parameters["preferReturn"];
                };
            };
            responses: {
                /** Created */
                201: unknown;
            };
        };
        delete: {
            parameters: {
                query: {
                    id?: parameters["rowFilter.coffee.id"];
                    name?: parameters["rowFilter.coffee.name"];
                    producer?: parameters["rowFilter.coffee.producer"];
                    image?: parameters["rowFilter.coffee.image"];
                    date?: parameters["rowFilter.coffee.date"];
                };
                header: {
                    /** Preference */
                    Prefer?: parameters["preferReturn"];
                };
            };
            responses: {
                /** No Content */
                204: never;
            };
        };
        patch: {
            parameters: {
                query: {
                    id?: parameters["rowFilter.coffee.id"];
                    name?: parameters["rowFilter.coffee.name"];
                    producer?: parameters["rowFilter.coffee.producer"];
                    image?: parameters["rowFilter.coffee.image"];
                    date?: parameters["rowFilter.coffee.date"];
                };
                body: {
                    /** coffee */
                    coffee?: definitions["coffee"];
                };
                header: {
                    /** Preference */
                    Prefer?: parameters["preferReturn"];
                };
            };
            responses: {
                /** No Content */
                204: never;
            };
        };
    };
    "/profile": {
        get: {
            parameters: {
                query: {
                    id?: parameters["rowFilter.profile.id"];
                    name?: parameters["rowFilter.profile.name"];
                    /** Filtering Columns */
                    select?: parameters["select"];
                    /** Ordering */
                    order?: parameters["order"];
                    /** Limiting and Pagination */
                    offset?: parameters["offset"];
                    /** Limiting and Pagination */
                    limit?: parameters["limit"];
                };
                header: {
                    /** Limiting and Pagination */
                    Range?: parameters["range"];
                    /** Limiting and Pagination */
                    "Range-Unit"?: parameters["rangeUnit"];
                    /** Preference */
                    Prefer?: parameters["preferCount"];
                };
            };
            responses: {
                /** OK */
                200: {
                    schema: definitions["profile"][];
                };
                /** Partial Content */
                206: unknown;
            };
        };
        post: {
            parameters: {
                body: {
                    /** profile */
                    profile?: definitions["profile"];
                };
                query: {
                    /** Filtering Columns */
                    select?: parameters["select"];
                };
                header: {
                    /** Preference */
                    Prefer?: parameters["preferReturn"];
                };
            };
            responses: {
                /** Created */
                201: unknown;
            };
        };
        delete: {
            parameters: {
                query: {
                    id?: parameters["rowFilter.profile.id"];
                    name?: parameters["rowFilter.profile.name"];
                };
                header: {
                    /** Preference */
                    Prefer?: parameters["preferReturn"];
                };
            };
            responses: {
                /** No Content */
                204: never;
            };
        };
        patch: {
            parameters: {
                query: {
                    id?: parameters["rowFilter.profile.id"];
                    name?: parameters["rowFilter.profile.name"];
                };
                body: {
                    /** profile */
                    profile?: definitions["profile"];
                };
                header: {
                    /** Preference */
                    Prefer?: parameters["preferReturn"];
                };
            };
            responses: {
                /** No Content */
                204: never;
            };
        };
    };
    "/rating": {
        get: {
            parameters: {
                query: {
                    rating?: parameters["rowFilter.rating.rating"];
                    aroma?: parameters["rowFilter.rating.aroma"];
                    body?: parameters["rowFilter.rating.body"];
                    flavor?: parameters["rowFilter.rating.flavor"];
                    aftertaste?: parameters["rowFilter.rating.aftertaste"];
                    with_milk?: parameters["rowFilter.rating.with_milk"];
                    date?: parameters["rowFilter.rating.date"];
                    coffee_id?: parameters["rowFilter.rating.coffee_id"];
                    profile_id?: parameters["rowFilter.rating.profile_id"];
                    /** Filtering Columns */
                    select?: parameters["select"];
                    /** Ordering */
                    order?: parameters["order"];
                    /** Limiting and Pagination */
                    offset?: parameters["offset"];
                    /** Limiting and Pagination */
                    limit?: parameters["limit"];
                };
                header: {
                    /** Limiting and Pagination */
                    Range?: parameters["range"];
                    /** Limiting and Pagination */
                    "Range-Unit"?: parameters["rangeUnit"];
                    /** Preference */
                    Prefer?: parameters["preferCount"];
                };
            };
            responses: {
                /** OK */
                200: {
                    schema: definitions["rating"][];
                };
                /** Partial Content */
                206: unknown;
            };
        };
        post: {
            parameters: {
                body: {
                    /** rating */
                    rating?: definitions["rating"];
                };
                query: {
                    /** Filtering Columns */
                    select?: parameters["select"];
                };
                header: {
                    /** Preference */
                    Prefer?: parameters["preferReturn"];
                };
            };
            responses: {
                /** Created */
                201: unknown;
            };
        };
        delete: {
            parameters: {
                query: {
                    rating?: parameters["rowFilter.rating.rating"];
                    aroma?: parameters["rowFilter.rating.aroma"];
                    body?: parameters["rowFilter.rating.body"];
                    flavor?: parameters["rowFilter.rating.flavor"];
                    aftertaste?: parameters["rowFilter.rating.aftertaste"];
                    with_milk?: parameters["rowFilter.rating.with_milk"];
                    date?: parameters["rowFilter.rating.date"];
                    coffee_id?: parameters["rowFilter.rating.coffee_id"];
                    profile_id?: parameters["rowFilter.rating.profile_id"];
                };
                header: {
                    /** Preference */
                    Prefer?: parameters["preferReturn"];
                };
            };
            responses: {
                /** No Content */
                204: never;
            };
        };
        patch: {
            parameters: {
                query: {
                    rating?: parameters["rowFilter.rating.rating"];
                    aroma?: parameters["rowFilter.rating.aroma"];
                    body?: parameters["rowFilter.rating.body"];
                    flavor?: parameters["rowFilter.rating.flavor"];
                    aftertaste?: parameters["rowFilter.rating.aftertaste"];
                    with_milk?: parameters["rowFilter.rating.with_milk"];
                    date?: parameters["rowFilter.rating.date"];
                    coffee_id?: parameters["rowFilter.rating.coffee_id"];
                    profile_id?: parameters["rowFilter.rating.profile_id"];
                };
                body: {
                    /** rating */
                    rating?: definitions["rating"];
                };
                header: {
                    /** Preference */
                    Prefer?: parameters["preferReturn"];
                };
            };
            responses: {
                /** No Content */
                204: never;
            };
        };
    };
    "/rpc/get_film_count": {
        post: {
            parameters: {
                body: {
                    args: {
                        /** Format: integer */
                        len_to: number;
                        /** Format: integer */
                        len_from: number;
                    };
                };
                header: {
                    /** Preference */
                    Prefer?: parameters["preferParams"];
                };
            };
            responses: {
                /** OK */
                200: unknown;
            };
        };
    };
}

export interface definitions {
    producer: {
        /**
         * Format: text
         * @description Note:
         * This is a Primary Key.<pk/>
         */
        name: string;
    };
    coffee: {
        /**
         * Format: uuid
         * @description Note:
         * This is a Primary Key.<pk/>
         * @default extensions.uuid_generate_v4()
         */
        id: string;
        /** Format: text */
        name: string;
        /**
         * Format: text
         * @description Note:
         * This is a Foreign Key to `producer.name`.<fk table='producer' column='name'/>
         */
        producer?: string;
        /** Format: text */
        image?: string;
        /**
         * Format: timestamp with time zone
         * @default (now() AT TIME ZONE 'utc'::text)
         */
        date?: string;
    };
    profile: {
        /**
         * Format: uuid
         * @description Note:
         * This is a Primary Key.<pk/>
         */
        id: string;
        /** Format: text */
        name?: string;
    };
    rating: {
        /** Format: numeric */
        rating: number;
        /** Format: numeric */
        aroma?: number;
        /** Format: numeric */
        body?: number;
        /** Format: numeric */
        flavor?: number;
        /** Format: numeric */
        aftertaste?: number;
        /** Format: numeric */
        with_milk?: number;
        /**
         * Format: timestamp with time zone
         * @default (now() AT TIME ZONE 'utc'::text)
         */
        date: string;
        /**
         * Format: uuid
         * @description Note:
         * This is a Primary Key.<pk/>
         * This is a Foreign Key to `coffee.id`.<fk table='coffee' column='id'/>
         */
        coffee_id: string;
        /**
         * Format: uuid
         * @description Note:
         * This is a Primary Key.<pk/>
         * This is a Foreign Key to `profile.id`.<fk table='profile' column='id'/>
         */
        profile_id: string;
    };
}

export interface parameters {
    /**
     * @description Preference
     * @enum {string}
     */
    preferParams: "params=single-object";
    /**
     * @description Preference
     * @enum {string}
     */
    preferReturn: "return=representation" | "return=minimal" | "return=none";
    /**
     * @description Preference
     * @enum {string}
     */
    preferCount: "count=none";
    /** @description Filtering Columns */
    select: string;
    /** @description On Conflict */
    on_conflict: string;
    /** @description Ordering */
    order: string;
    /** @description Limiting and Pagination */
    range: string;
    /**
     * @description Limiting and Pagination
     * @default items
     */
    rangeUnit: string;
    /** @description Limiting and Pagination */
    offset: string;
    /** @description Limiting and Pagination */
    limit: string;
    /** @description producer */
    "body.producer": definitions["producer"];
    /** Format: text */
    "rowFilter.producer.name": string;
    /** @description coffee */
    "body.coffee": definitions["coffee"];
    /** Format: uuid */
    "rowFilter.coffee.id": string;
    /** Format: text */
    "rowFilter.coffee.name": string;
    /** Format: text */
    "rowFilter.coffee.producer": string;
    /** Format: text */
    "rowFilter.coffee.image": string;
    /** Format: timestamp with time zone */
    "rowFilter.coffee.date": string;
    /** @description profile */
    "body.profile": definitions["profile"];
    /** Format: uuid */
    "rowFilter.profile.id": string;
    /** Format: text */
    "rowFilter.profile.name": string;
    /** @description rating */
    "body.rating": definitions["rating"];
    /** Format: numeric */
    "rowFilter.rating.rating": string;
    /** Format: numeric */
    "rowFilter.rating.aroma": string;
    /** Format: numeric */
    "rowFilter.rating.body": string;
    /** Format: numeric */
    "rowFilter.rating.flavor": string;
    /** Format: numeric */
    "rowFilter.rating.aftertaste": string;
    /** Format: numeric */
    "rowFilter.rating.with_milk": string;
    /** Format: timestamp with time zone */
    "rowFilter.rating.date": string;
    /** Format: uuid */
    "rowFilter.rating.coffee_id": string;
    /** Format: uuid */
    "rowFilter.rating.profile_id": string;
}

export interface operations {}

export interface external {}
