CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table producer (
    name text primary key
);

create table coffee (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    producer text references producer on delete restrict,
    image text
);

create table person (
    id uuid primary key default uuid_generate_v4(),
    name text
);

create table rating (
    rating numeric not null, -- overall rating
    aroma numeric null,
    body numeric null,
    flavor numeric null,
    aftertaste numeric null,
    with_milk numeric null,
    date timestamptz not null default (now() at time zone 'utc'),
    coffee_id uuid references coffee on delete cascade,
    person_id uuid references person on delete cascade,
    primary key (coffee_id, person_id),
    constraint valid_rating CHECK (rating between 0.0 and 10.0)
);


DO $$

declare
    p producer.name%type;
    pid person.id%type;
    coffee_id coffee.id%type;
    r rating%rowtype;

begin
    insert into producer values ('Lofbergs') returning name into p;
    insert into person (name) values ('mikael') returning id into pid;
    insert into coffee (name, producer) values ('dark roast', 'Lofbergs') returning id into coffee_id;
    insert into rating (coffee_id, person_id, rating) values (coffee_id, pid, 5.5) returning * into r;
    raise info 'coffee rating row is %', r;
end $$;
