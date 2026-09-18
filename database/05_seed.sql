-- ============================================
-- MUSIC STREAMING PLATFORM
-- SAMPLE DATA
-- ============================================

-- USERS
INSERT INTO app_user
(first_name, last_name, email, phone_no, gender, dob)
VALUES
('Arun', 'Kumar', 'arun@example.com', '9876543210', 'MALE',
 TO_DATE('2003-05-12', 'YYYY-MM-DD'));

INSERT INTO app_user
(first_name, last_name, email, phone_no, gender, dob)
VALUES
('Priya', 'Sharma', 'priya@example.com', '9876543211', 'FEMALE',
 TO_DATE('2002-08-20', 'YYYY-MM-DD'));

INSERT INTO app_user
(first_name, last_name, email, phone_no, gender, dob)
VALUES
('Rahul', 'Singh', 'rahul@example.com', '9876543212', 'MALE',
 TO_DATE('2004-01-15', 'YYYY-MM-DD'));


-- ARTISTS
INSERT INTO artist
(name, bio, social_media)
VALUES
('Arijit Singh',
 'Indian playback singer known for Hindi music.',
 '@arijitsingh');

INSERT INTO artist
(name, bio, social_media)
VALUES
('A.R. Rahman',
 'Indian composer, singer and music producer.',
 '@arrahman');

INSERT INTO artist
(name, bio, social_media)
VALUES
('Shreya Ghoshal',
 'Indian playback singer and performer.',
 '@shreyaghoshal');


-- PODCAST CREATORS
INSERT INTO podcast_creator
(email, bio)
VALUES
('creator1@example.com',
 'Technology and programming podcast creator.');

INSERT INTO podcast_creator
(email, bio)
VALUES
('creator2@example.com',
 'Entertainment and culture podcast creator.');


-- ALBUMS
INSERT INTO album
(artist_id, album_title, release_date, cover_page)
VALUES
(1, 'Sample Album One',
 TO_DATE('2024-01-10', 'YYYY-MM-DD'),
 'https://example.com/album1.jpg');

INSERT INTO album
(artist_id, album_title, release_date, cover_page)
VALUES
(2, 'Sample Album Two',
 TO_DATE('2023-06-15', 'YYYY-MM-DD'),
 'https://example.com/album2.jpg');

INSERT INTO album
(artist_id, album_title, release_date, cover_page)
VALUES
(3, 'Sample Album Three',
 TO_DATE('2024-03-20', 'YYYY-MM-DD'),
 'https://example.com/album3.jpg');


-- SONGS
INSERT INTO song
(album_id, artist_id, name, duration, release_date, audio_url)
VALUES
(1, 1, 'Sample Song One', 240,
 TO_DATE('2024-01-10', 'YYYY-MM-DD'),
 'https://example.com/song1.mp3');

INSERT INTO song
(album_id, artist_id, name, duration, release_date, audio_url)
VALUES
(1, 1, 'Sample Song Two', 215,
 TO_DATE('2024-01-10', 'YYYY-MM-DD'),
 'https://example.com/song2.mp3');

INSERT INTO song
(album_id, artist_id, name, duration, release_date, audio_url)
VALUES
(2, 2, 'Sample Song Three', 300,
 TO_DATE('2023-06-15', 'YYYY-MM-DD'),
 'https://example.com/song3.mp3');

INSERT INTO song
(album_id, artist_id, name, duration, release_date, audio_url)
VALUES
(3, 3, 'Sample Song Four', 275,
 TO_DATE('2024-03-20', 'YYYY-MM-DD'),
 'https://example.com/song4.mp3');


-- PLAYLISTS
INSERT INTO playlist
(user_id, playlist_name, visibility)
VALUES
(1, 'My Favorites', 'PUBLIC');

INSERT INTO playlist
(user_id, playlist_name, visibility)
VALUES
(2, 'Study Music', 'PRIVATE');


-- PLAYLIST SONGS
INSERT INTO playlist_song
(playlist_id, song_id)
VALUES
(1, 1);

INSERT INTO playlist_song
(playlist_id, song_id)
VALUES
(1, 2);

INSERT INTO playlist_song
(playlist_id, song_id)
VALUES
(2, 3);


-- FOLLOWED ARTISTS
INSERT INTO user_artist
(user_id, artist_id)
VALUES
(1, 1);

INSERT INTO user_artist
(user_id, artist_id)
VALUES
(1, 2);

INSERT INTO user_artist
(user_id, artist_id)
VALUES
(2, 3);


-- SUBSCRIPTIONS
INSERT INTO subscription
(user_id, plan_type, start_date, end_date)
VALUES
(1, 'PREMIUM',
 TO_DATE('2026-01-01', 'YYYY-MM-DD'),
 TO_DATE('2026-12-31', 'YYYY-MM-DD'));

INSERT INTO subscription
(user_id, plan_type, start_date, end_date)
VALUES
(2, 'FREE',
 TO_DATE('2026-01-01', 'YYYY-MM-DD'),
 NULL);


-- PAYMENTS
INSERT INTO payment
(user_id, subscription_id, amount, payment_mode)
VALUES
(1, 1, 999.00, 'CARD');

INSERT INTO payment
(user_id, subscription_id, amount, payment_mode)
VALUES
(2, 2, 0.00, 'NONE');


-- DEVICES
INSERT INTO device
(user_id, os, device_type)
VALUES
(1, 'Windows 11', 'LAPTOP');

INSERT INTO device
(user_id, os, device_type)
VALUES
(1, 'Android', 'MOBILE');

INSERT INTO device
(user_id, os, device_type)
VALUES
(2, 'Windows 11', 'LAPTOP');


-- PODCASTS
INSERT INTO podcast
(creator_id, title, language, release_date, description)
VALUES
(1, 'Tech Talks',
 'English',
 TO_DATE('2026-01-10', 'YYYY-MM-DD'),
 'A podcast about technology and programming.');

INSERT INTO podcast
(creator_id, title, language, release_date, description)
VALUES
(2, 'Entertainment Weekly',
 'English',
 TO_DATE('2026-02-15', 'YYYY-MM-DD'),
 'A podcast about entertainment and culture.');


-- EPISODES
INSERT INTO episode
(podcast_id, episode_no, title, duration, description,
 release_date, audio_url)
VALUES
(1, 1, 'Introduction to Programming', 1800,
 'Introduction to programming concepts.',
 TO_DATE('2026-01-10', 'YYYY-MM-DD'),
 'https://example.com/episode1.mp3');

INSERT INTO episode
(podcast_id, episode_no, title, duration, description,
 release_date, audio_url)
VALUES
(1, 2, 'Database Fundamentals', 2100,
 'Introduction to database concepts.',
 TO_DATE('2026-01-17', 'YYYY-MM-DD'),
 'https://example.com/episode2.mp3');

INSERT INTO episode
(podcast_id, episode_no, title, duration, description,
 release_date, audio_url)
VALUES
(2, 1, 'Entertainment Trends', 1500,
 'Discussion about entertainment trends.',
 TO_DATE('2026-02-15', 'YYYY-MM-DD'),
 'https://example.com/episode3.mp3');


COMMIT;

-- ============================================
-- SAMPLE DATA INSERTION COMPLETE
-- ============================================