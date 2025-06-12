-- The category of an artpiece.
-- e.g: Music, Cinema, Painting
CREATE TABLE category (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    -- The name of this category
    name text UNIQUE NOT NULL,
    inserted_at timestamptz DEFAULT now()
);

-- An artist.
-- E.g: Person, Band, Group, etc.
CREATE TABLE artist (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    -- The name of this artpiece
    name text NOT NULL,
    inserted_at timestamptz DEFAULT now()
);

CREATE TYPE artpiece_type AS ENUM (
    'Album',
    'EP'
);

-- A piece of art.
-- e.g: A Tábua de Esmeralda, Cartola (1974)
CREATE TABLE artpiece (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_id integer NOT NULL REFERENCES category (id) ON DELETE RESTRICT,
    -- The name of this art piece
    name text NOT NULL,
    -- The date that this art piece was released/revealed
    date date NOT NULL,
    -- The type of this artpiece. See the `artpiece_type` enum.
    type artpiece_type,
    inserted_at timestamptz DEFAULT now()
);

CREATE TABLE artist_artpiece (
    artist_id integer NOT NULL REFERENCES artist (id) ON DELETE CASCADE,
    artpiece_id integer NOT NULL REFERENCES artpiece (id) ON DELETE CASCADE,
    PRIMARY KEY (artist_id, artpiece_id),
    inserted_at timestamptz DEFAULT now()
);

CREATE TYPE app_user_role AS ENUM (
    'admin',
    'user'
);

-- A Web Gallery user
CREATE TABLE app_user (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username text UNIQUE NOT NULL,
    password text NOT NULL,
    user_role app_user_role NOT NULL,
    inserted_at timestamptz DEFAULT now()
);

-- A genre, belonging to a specific category of art
-- e.g: Post-Rock (Music), Impressionism (Painting), Horror (Film)
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

-- The language an artpiece can be in. Doesn't apply to all artpieces (e.g: paintings)
-- e.g: English, Portuguese
CREATE TABLE artpiece_language (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL,
    inserted_at timestamptz DEFAULT now()
);

-- The NxN relationship between artpiece <=> artpiece language
CREATE TABLE artpiece_artpiece_language (
    artpiece_id integer NOT NULL REFERENCES artpiece (id) ON DELETE CASCADE,
    artpiece_language_id integer NOT NULL REFERENCES artpiece_language (id) ON DELETE CASCADE,
    PRIMARY KEY (artpiece_id, artpiece_language_id),
    inserted_at timestamptz DEFAULT now()
);

CREATE TABLE artpiece_keyword (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL,
    inserted_at timestamptz DEFAULT now()
);

CREATE TABLE artpiece_artpiece_keyword (
    artpiece_id integer NOT NULL REFERENCES artpiece (id) ON DELETE CASCADE,
    artpiece_keyword_id integer NOT NULL REFERENCES artpiece_keyword (id) ON DELETE CASCADE,
    PRIMARY KEY (artpiece_id, artpiece_keyword_id),
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
    ('Painting'),
    ('Empty');

INSERT INTO artist (name)
    VALUES ('Jorge Ben'),
    ('Aphex Twin'),
    ('Richard Kelly'),
    ('Claude Monet'),
    ('Bob Dylan'),
    ('Emir Kusturica'),
    ('Aleksander Rostov'),
    ('Victor & Leo'),
    ('John Lasseter'),
    ('Salvador Dalí'),
    ('Gorillaz'),
    ('David Fincher'),
    ('Vincent Van Gogh'),
    ('Death Grips'),
    ('Stuart Gordon'),
    ('Vincent Van Gogh');

INSERT INTO artpiece (category_id, name, date, type)
    VALUES (1, 'A Tábua de Esmeralda', '1974-05-01', 'Album'),
    (1, 'Selected Ambient Works 85-92', '1999-01-08', 'Album'),
    (2, 'Donnie Darko', '2003-09-24', NULL),
    (3, 'Impression, soleil levant', '1874-04-01', NULL),
    (1, 'Bringing It All Back Home', '1965-03-22', NULL),
    (2, 'Underground', '1995-10-25', NULL),
    (3, 'Conquest of Revachol', '2020-05-04', NULL),
    (1, 'Borboletas', '2008-09-01', NULL),
    (2, 'Cars', '2006-07-30', NULL),
    (3, 'La persistència de la memòria', '1931-01-01', NULL),
    (1, 'Demon Days', '2005-05-11', NULL),
    (2, 'Fight Club', '1999-10-15', NULL),
    (3, 'Tournesols', '1889-01-01', NULL),
    (1, 'Fashion Week', '2015-01-04', NULL),
    (2, 'Re-Animator', '1985-10-18', NULL),
    (3, 'At Eternitys Gate', '1890-01-01', NULL);

INSERT INTO artist_artpiece (artpiece_id, artist_id)
    VALUES (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 6),
    (7, 7),
    (8, 8),
    (9, 9),
    (10, 10),
    (11, 11),
    (12, 12),
    (13, 13),
    (14, 14),
    (15, 15),
    (16, 16);

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

INSERT INTO artpiece_language (name)
    VALUES ('English'),
    ('Portuguese');

INSERT INTO artpiece_artpiece_language (artpiece_id, artpiece_language_id)
    VALUES (1, 2),
    (5, 1);

INSERT INTO artpiece_keyword (name)
    VALUES ('Warm'),
    ('Tropical'),
    ('Uplifting');

INSERT INTO artpiece_artpiece_keyword (artpiece_id, artpiece_keyword_id)
    VALUES (1, 1),
    (2, 1);

