-- The category of an artpiece.
-- e.g: music, cinema, painting
CREATE TABLE category (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    -- The name of this category
    name text UNIQUE NOT NULL,
    inserted_at timestamptz DEFAULT now()
);

-- A piece of art.
-- e.g: Album, Movie, E.P, Painting, Photo
CREATE TABLE artpiece (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_id integer NOT NULL REFERENCES category (id) ON DELETE RESTRICT,
    -- The artist of the art piece
    artist text,
    -- The name of this art piece
    name text NOT NULL,
    -- The date that this art piece was released/revealed
    date date NOT NULL,
    inserted_at timestamptz DEFAULT now()
);

CREATE TYPE app_user_role AS ENUM (
    'admin',
    'user'
);

-- A user of the application.
CREATE TABLE app_user (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username text UNIQUE NOT NULL,
    password text NOT NULL,
    user_role app_user_role NOT NULL,
    inserted_at timestamptz DEFAULT now()
);

-- A genre, belonging to a specific category of art
-- e.g: Post-Rock, Impressionism, Horror
CREATE TABLE genre (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_id integer NOT NULL REFERENCES category (id) ON DELETE RESTRICT,
    name text,
    parent integer REFERENCES genre (id) ON DELETE CASCADE,
    inserted_at timestamptz DEFAULT now()
);

-- The NxN relationship between artpiece <=> genre
CREATE TABLE artpiece_genre (
    artpiece_id integer NOT NULL REFERENCES artpiece (id) ON DELETE CASCADE,
    genre_id integer NOT NULL REFERENCES genre (id) ON DELETE CASCADE,
    PRIMARY KEY (artpiece_id, genre_id),
    inserted_at timestamptz DEFAULT now()
);

-- Same thing as `artpiece_genre`, but as a "minor" genre
CREATE TABLE artpiece_secondary_genre (
    artpiece_id integer NOT NULL REFERENCES artpiece (id) ON DELETE CASCADE,
    genre_id integer NOT NULL REFERENCES genre (id) ON DELETE CASCADE,
    PRIMARY KEY (artpiece_id, genre_id),
    inserted_at timestamptz DEFAULT now()
);

-- A rating that a user gave to an artpiece.
CREATE TABLE rating (
    user_id integer NOT NULL REFERENCES app_user (id) ON DELETE CASCADE,
    artpiece_id integer NOT NULL REFERENCES artpiece (id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, artpiece_id),
    value integer NOT NULL CHECK (value BETWEEN 0 AND 10),
    inserted_at timestamptz DEFAULT now()
);

-- A review that a user wrote about an artpiece.
CREATE TABLE review (
    user_id integer NOT NULL REFERENCES app_user (id) ON DELETE CASCADE,
    artpiece_id integer NOT NULL REFERENCES artpiece (id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, artpiece_id),
    content text NOT NULL,
    inserted_at timestamptz DEFAULT now()
);

-- A comment that a user wrote about an artpiece.
CREATE TABLE comment (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer NOT NULL REFERENCES app_user (id) ON DELETE CASCADE,
    artpiece_id integer NOT NULL REFERENCES artpiece (id) ON DELETE CASCADE,
    content text NOT NULL,
    inserted_at timestamptz DEFAULT now()
);

INSERT INTO category (name)
    VALUES ('Music'),
    ('Film'),
    ('Painting');

INSERT INTO artpiece (category_id, artist, name, date)
    VALUES (1, 'Jorge Ben', 'A Tábua de Esmeralda', '1974-05-01'),
    (1, 'Aphex Twin', 'Selected Ambient Works 85-92', '1999-01-08'),
    (2, 'Richard Kelly', 'Donnie Darko', '2003-09-24'),
    (3, 'Claude Monet', 'Impression, soleil levant', '1874-04-01'),
    (1, 'Bob Dylan', 'Bringing It All Back Home', '1965-03-22'),
    (2, 'Emir Kusturica', 'Underground', '1995-10-25'),
    (3, 'Aleksander Rostov', 'Conquest of Revachol', '2020-05-04'),
    (1, 'Victor & Leo', 'Borboletas', '2008-09-01'),
    (2, 'John Lasseter', 'Cars', '2006-07-30'),
    (3, 'Salvador Dalí', 'La persistència de la memòria', '1931-01-01'),
    (1, 'Gorillaz', 'Demon Days', '2005-05-11'),
    (2, 'David Fincher', 'Fight Club', '1999-10-15'),
    (3, 'Vincent Van Gogh', 'Tournesols', '1889-01-01'),
    (1, 'Death Grips', 'Fashion Week', '2015-01-04'),
    (2, 'Stuart Gordon', 'Re-Animator', '1985-10-18'),
    (3, 'Vincent Van Gogh', 'At Eternitys Gate', '1890-01-01');

INSERT INTO app_user (username, password, user_role)
    VALUES ('root', 'root', 'admin');

INSERT INTO rating (user_id, artpiece_id, value)
    VALUES (1, 1, 5);

INSERT INTO review (user_id, artpiece_id, content)
    VALUES (1, 1, 'oi');

INSERT INTO genre (category_id, name)
    VALUES (1, 'Samba-Rock'),
    (1, 'Samba-Soul'),
    (1, 'MPB'),
    (1, 'Techno-Ambient'),
    (1, 'Ambient');

INSERT INTO artpiece_genre (artpiece_id, genre_id)
    VALUES (1, 1),
    (1, 3),
    (2, 4);

INSERT INTO artpiece_secondary_genre (artpiece_id, genre_id)
    VALUES (1, 2),
    (2, 5);

