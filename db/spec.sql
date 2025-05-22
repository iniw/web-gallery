-- The category of an art piece.
-- e.g: music, cinema, painting, etc.
CREATE TABLE category (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    -- The name of this category
    name text UNIQUE NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- An art piece.
-- e.g: album, movie, e.p, painting, photo, etc.
CREATE TABLE art (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_id integer NOT NULL REFERENCES category (id) ON DELETE RESTRICT,
    -- The artist of the art piece
    artist text,
    -- The name of this art piece
    name text NOT NULL,
    -- The date that this art piece was released/revealed
    date date NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- A user of the application.
CREATE TABLE app_user (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username text UNIQUE NOT NULL,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE rating (
    user_id integer NOT NULL REFERENCES app_user (id) ON DELETE CASCADE,
    art_id integer NOT NULL REFERENCES art (id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, art_id),
    rating integer NOT NULL CHECK (rating BETWEEN 0 AND 10),
    created_at timestamptz DEFAULT now()
);

INSERT INTO category (name)
    VALUES ('Music'),
    ('Cinema'),
    ('Paintings');

INSERT INTO art (category_id, artist, name, date)
    VALUES (1, 'Jorge Ben', 'A Tábua de Esmeralda', '1974-05-01'),
    (1, 'Aphex Twin', 'Selected Ambient Works 85-92', '1999-01-08'),
    (2, 'Richard Kelly', 'Donnie Darko', '2003-09-24');

INSERT INTO app_user (username)
    VALUES ('vini'),
    ('foyer');

INSERT INTO rating (user_id, art_id, rating)
    VALUES (1, 1, 10),
    (1, 2, 9),
    (1, 3, 10),
    (2, 2, 10);

