-- ========================================================
-- SONICLY CATALOG SEED SCRIPT (BOLLYWOOD, HOLLYWOOD, PODCASTS)
-- ========================================================

-- Clean any existing seed data cleanly (cascades handle children)
DELETE FROM song WHERE TRUE;
DELETE FROM album WHERE TRUE;
DELETE FROM artist WHERE TRUE;
DELETE FROM episode WHERE TRUE;
DELETE FROM podcast WHERE TRUE;
DELETE FROM podcast_creator WHERE TRUE;

-- 1. ARTISTS (BOLLYWOOD & HOLLYWOOD)
INSERT INTO artist (artist_id, name, bio, social_media) VALUES
(1, 'Arijit Singh', 'Bollywood Playback, Romantic Melodies, Soul', '@arijitsingh'),
(2, 'A.R. Rahman', 'Academy Award Winner, Film Scores, Indian Classical & World', '@arrahman'),
(3, 'Pritam', 'Bollywood Pop, Melodic Chartbusters, Contemporary Hindi Film', '@ipritamofficial'),
(4, 'Shreya Ghoshal', 'National Award Winner, Indian Classical, Melodious Ballads', '@shreyaghoshal'),
(5, 'Diljit Dosanjh', 'Punjabi Pop, Contemporary Bhangra, Global Urban Punjabi', '@diljitdosanjh'),
(6, 'The Weeknd', 'R&B, Synth-Pop, Dark Wave & Retro Modern Pop', '@theweeknd'),
(7, 'Taylor Swift', 'Pop, Synth-Pop, Narrative Folk & Country-Pop', '@taylorswift'),
(8, 'Dua Lipa', 'Disco-Pop, Dance-Pop, Nu-Disco & Future Funk', '@dualipa'),
(9, 'Ed Sheeran', 'Acoustic Pop, Folk Pop, Melodic Singer-Songwriter', '@teddysphotos'),
(10, 'Billie Eilish', 'Alt-Pop, Electropop, Ambient Pop & Indie', '@billieeilish'),
(11, 'Post Malone', 'Hip-Hop, Melodic Pop-Rap, Alternative Rock', '@postmalone'),
(12, 'Coldplay', 'Alternative Rock, Pop-Rock, Stadium Anthems', '@coldplay');

-- 2. ALBUMS
INSERT INTO album (album_id, artist_id, album_title, release_date, cover_page) VALUES
(1, 1, 'Aashiqui 2', '2013-04-26', 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/bb/23/ee/bb23eeed-0c35-4f1d-2b11-485622777ae4/8902894353007_cover.jpg/600x600bb.jpg'),
(2, 3, 'Brahmāstra: Part One – Shiva', '2022-09-09', 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/9f/13/ca/9f13ca3b-e533-03e0-f19a-f0aaa774581d/196589311191.jpg/600x600bb.jpg'),
(3, 2, 'Rockstar', '2011-10-31', 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/56/ac/41/56ac41f7-99f3-3eae-3b07-443167292c4e/8902894697408_cover.jpg/600x600bb.jpg'),
(4, 4, 'Bajirao Mastani', '2015-11-24', 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f1/4f/8f/f14f8fe3-4fda-8244-8dff-0db4be58bd4a/196871079808.jpg/600x600bb.jpg'),
(5, 5, 'G.O.A.T.', '2020-07-30', 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d2/89/ac/d289ac98-749e-3822-6b6e-b06aa4815715/859740651597_cover.jpg/600x600bb.jpg'),
(6, 6, 'After Hours', '2020-03-20', 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/61/e7/3f/61e73f94-018d-5f50-50ec-8521952bc72e/20UM1IM11629.rgb.jpg/600x600bb.jpg'),
(7, 7, 'Lover', '2019-08-23', 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/49/3d/ab/493dab54-f920-9043-6181-80993b8116c9/19UMGIM53909.rgb.jpg/600x600bb.jpg'),
(8, 8, 'Future Nostalgia', '2020-03-27', 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/6c/11/d6/6c11d681-aa3a-d59e-4c2e-f77e181026ab/190295092665.jpg/600x600bb.jpg'),
(9, 9, '÷ (Divide)', '2017-03-03', 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/15/e6/e8/15e6e8a4-4190-6a8b-86c3-ab4a51b88288/190295851286.jpg/600x600bb.jpg'),
(10, 10, 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?', '2019-03-29', 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/1a/37/d1/1a37d1b1-8508-54f2-f541-bf4e437dda76/19UMGIM05028.rgb.jpg/600x600bb.jpg'),
(11, 11, 'Hollywood''s Bleeding', '2019-09-06', 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/7b/1b/1b/7b1b1b0b-7ce2-b223-f9e0-8e36abe51877/19UMGIM78325.rgb.jpg/600x600bb.jpg'),
(12, 12, 'A Head Full of Dreams', '2015-12-04', 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/c8/0a/6d/c80a6df9-e55a-fb83-0311-f4776984ac67/mzm.lasidxkv.jpg/600x600bb.jpg');

-- 3. SONGS (BOLLYWOOD & HOLLYWOOD WITH DIRECT PLAYABLE AUDIO)
INSERT INTO song (song_id, album_id, artist_id, name, duration, release_date, audio_url) VALUES
-- Bollywood Hits
(1, 1, 1, 'Tum Hi Ho', 262, '2013-04-26', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3a/8c/9b/3a8c9b0b-2def-750a-f615-1555bf941edf/mzaf_17229496441442805917.plus.aac.p.m4a'),
(2, 1, 1, 'Chahun Main Yaa Naa', 305, '2013-04-26', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/57/a4/b8/57a4b83d-f870-0649-1386-701a71ee9140/mzaf_13855791885895391488.plus.aac.p.m4a'),
(3, 2, 3, 'Kesariya', 268, '2022-07-17', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/38/4c/5c/384c5c8f-3ff8-e457-b2f7-3158ce108649/mzaf_12389299033886433185.plus.aac.p.m4a'),
(4, 2, 3, 'Rasiya', 265, '2022-09-24', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c5/bd/4f/c5bd4f17-23ff-e2af-ccd0-b976985151a6/mzaf_6244821523021066334.plus.aac.p.m4a'),
(5, 3, 2, 'Kun Faya Kun', 471, '2011-10-31', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ce/72/5e/ce725e63-6977-b281-3766-fff46d6e0c07/mzaf_7464998292185183397.plus.aac.p.m4a'),
(6, 3, 2, 'Nadaan Parinde', 384, '2011-10-31', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/1d/e8/9a/1de89aed-47a3-cd41-d9ad-fbd1f9c6c154/mzaf_388238856976260175.plus.aac.p.m4a'),
(7, 4, 4, 'Deewani Mastani', 340, '2015-11-24', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ef/e6/b9/efe6b9d4-3318-19ff-01fa-5c51f2ffe9b9/mzaf_3533703985365202572.plus.aac.p.m4a'),
(8, 4, 4, 'Mohe Rang Do Laal', 232, '2015-11-24', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/2f/ae/2e/2fae2e8f-2a3c-532f-3d52-52b0a8e3836b/mzaf_8876100466464678750.plus.aac.p.m4a'),
(9, 5, 5, 'G.O.A.T.', 224, '2020-07-30', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ba/5c/57/ba5c5769-536b-1884-dfbf-5930cab13332/mzaf_7745269360294572986.plus.aac.p.m4a'),
(10, 5, 5, 'Lover', 190, '2021-08-27', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/38/d5/7a/38d57a99-39fc-e901-7c45-fa6260ec83c1/mzaf_8083696285926392389.plus.aac.p.m4a'),

-- Hollywood Hits
(11, 6, 6, 'Blinding Lights', 216, '2020-03-20', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/12/73/ca/1273ca46-233a-5331-189b-25ac1d656533/mzaf_976341070785891411.plus.aac.p.m4a'),
(12, 6, 6, 'Save Your Tears', 216, '2020-03-20', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/8b/38/17/8b3817e4-c0e9-7e02-2654-3e2ecee93603/mzaf_18415642125637540903.plus.aac.p.m4a'),
(13, 7, 7, 'Cruel Summer', 178, '2019-08-23', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/44/af/81/44af8168-9609-1b85-5048-ada08dceacf3/mzaf_1341699644335558812.plus.aac.p.m4a'),
(14, 7, 7, 'Lover', 221, '2019-08-23', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e0/db/47/e0db47b0-7f70-0631-0414-cd4777d2fb3e/mzaf_6362891154838442638.plus.aac.p.m4a'),
(15, 8, 8, 'Levitating', 204, '2020-03-27', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/59/dc/4d/59dc4dda-93ff-8f1c-c536-f005f6ea6af5/mzaf_3066686759813252385.plus.aac.p.m4a'),
(16, 8, 8, 'Don''t Start Now', 183, '2020-03-27', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/24/3d/34/243d3413-a0fc-b229-f54a-1715ebd3a9ca/mzaf_11578996572221800393.plus.aac.p.m4a'),
(17, 9, 9, 'Shape of You', 234, '2017-03-03', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/44/c7/4f/44c74f0d-72dc-6143-d4d0-ba14d661ca0d/mzaf_9566898362556366703.plus.aac.p.m4a'),
(18, 9, 9, 'Perfect', 263, '2017-03-03', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c7/ba/bc/c7babc66-f598-aaa6-bcf6-307281795817/mzaf_16337361235117168274.plus.aac.p.m4a'),
(19, 10, 10, 'bad guy', 194, '2019-03-29', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/c3/87/1f/c3871f7e-3260-d615-1c66-5fdca2c3a48f/mzaf_10721331211699880949.plus.aac.p.m4a'),
(20, 11, 11, 'Circles', 215, '2019-09-06', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f9/b1/aa/f9b1aaed-3e24-227f-153d-99969f8b8464/mzaf_6272498007975402144.plus.aac.p.m4a'),
(21, 11, 11, 'Sunflower', 158, '2018-10-18', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/98/f0/d6/98f0d67e-f8bf-762d-cac7-1c6b3b6b35dd/mzaf_4543283896248560946.plus.aac.p.m4a'),
(22, 12, 12, 'Hymn for the Weekend', 259, '2015-12-04', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/88/ea/e5/88eae5a0-e6b7-f7bf-c764-3264fa64041f/mzaf_7367784822013036863.plus.aac.p.m4a'),
(23, 12, 12, 'Adventure of a Lifetime', 264, '2015-12-04', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/e8/df/83/e8df830f-e6b4-e1df-863e-7c7a9b56b642/mzaf_4564048335141026337.plus.aac.p.m4a');

-- 4. PODCAST CREATORS
INSERT INTO podcast_creator (creator_id, email, bio) VALUES
(1, 'ranveer@beerbiceps.com', 'Ranveer Allahbadia — Host of The Ranveer Show, YouTuber & Entrepreneur'),
(2, 'joe@joerogan.com', 'Joe Rogan — Comedian, UFC commentator & host of the JRE Experience'),
(3, 'andrew@hubermanlab.com', 'Dr. Andrew Huberman — Neurobiology Professor at Stanford University School of Medicine'),
(4, 'team@finshots.in', 'Finshots — Daily financial and economic analysis simplified for curious minds');

-- 5. PODCAST SHOWS
INSERT INTO podcast (podcast_id, creator_id, title, language, release_date, description) VALUES
(1, 1, 'The Ranveer Show (TRS)', 'Hindi / English', '2020-01-01', 'India''s smartest podcast exploring spirituality, self-improvement, business, history, and deep human psychology.'),
(2, 2, 'The Joe Rogan Experience', 'English', '2009-12-24', 'Unfiltered, long-form discussions with the world''s most fascinating scientists, thinkers, comedians, and cultural figures.'),
(3, 3, 'Huberman Lab', 'English', '2021-01-04', 'Science-grounded protocols to optimize sleep, focus, fitness, dopamine, neuroplasticity, and physical vitality.'),
(4, 4, 'Finshots Daily', 'English', '2020-04-15', 'Quick 5-minute deep-dives into the latest business trends, Indian market policies, and macroeconomic insights.');

-- 6. PODCAST EPISODES (DIRECT AUDIO MP3)
INSERT INTO episode (episode_id, podcast_id, episode_no, title, duration, description, release_date, audio_url) VALUES
-- The Ranveer Show
(1, 1, 101, 'Mastering the Human Mind & Overcoming Fear', 3420, 'A masterclass on mental resilience, morning rituals, and breaking negative thought loops.', '2023-08-10', 'https://traffic.libsyn.com/secure/beerbiceps/trs_sample.mp3'),
(2, 1, 102, 'The Science of Meditation & Ancient Indian Wisdom', 4180, 'Deep dive into neuro-theology, breathing techniques, and ancient Indian philosophical insights.', '2023-09-15', 'https://traffic.libsyn.com/secure/beerbiceps/trs_meditation.mp3'),

-- Joe Rogan Experience
(3, 2, 2050, 'Elon Musk on Artificial General Intelligence & Space Travel', 7200, 'Elon Musk returns to discuss humanoid robotics, xAI, Starship orbital tests, and interplanetary life.', '2023-11-01', 'https://archive.org/download/joe-rogan-experience-musk/jre_elon.mp3'),
(4, 2, 2051, 'Dr. Andrew Huberman on Dopamine, Focus & Peak States', 6840, 'Practical protocols for elevating daily energy, controlling screen addiction, and resetting sleep rhythms.', '2023-11-12', 'https://archive.org/download/huberman-dopamine-sample/huberman_sample.mp3'),

-- Huberman Lab
(5, 3, 1, 'Master Your Sleep & Awaken Energized', 5400, 'Using morning sunlight, temperature cycles, and behavioral cues to fix insomnia and achieve deep restorative sleep.', '2023-05-20', 'https://traffic.libsyn.com/secure/hubermanlab/Huberman_Lab_Sleep_Toolkit.mp3'),
(6, 3, 2, 'Optimize Your Dopamine for Drive & Motivation', 6120, 'Understand the biological mechanics of craving, motivation, friction, and dopamine baseline regulation.', '2023-06-15', 'https://traffic.libsyn.com/secure/hubermanlab/Huberman_Lab_Dopamine.mp3'),

-- Finshots Daily
(7, 4, 1, 'The 10-Minute Grocery Delivery War in India', 580, 'Why Blinkit, Zepto, and Instamart are reshaping Indian retail logistics and unit economics.', '2023-10-05', 'https://d3ctxlq1ktw2nl.cloudfront.net/staging/2023-9-5/349925230-44100-2-338ba835fbb5c.mp3'),
(8, 4, 2, 'Why Gold Prices Are Surging to All-Time Highs', 540, 'Analyzing central bank reserves, geopolitical hedging, and currency inflation impacting global precious metals.', '2023-10-18', 'https://d3ctxlq1ktw2nl.cloudfront.net/staging/2023-9-18/351652433-44100-2-005bf479ff73a.mp3');

-- 7. SYNCHRONIZE IDENTITY SEQUENCES
SELECT setval(pg_get_serial_sequence('app_user', 'user_id'), COALESCE((SELECT MAX(user_id) FROM app_user), 1));
SELECT setval(pg_get_serial_sequence('artist', 'artist_id'), COALESCE((SELECT MAX(artist_id) FROM artist), 1));
SELECT setval(pg_get_serial_sequence('podcast_creator', 'creator_id'), COALESCE((SELECT MAX(creator_id) FROM podcast_creator), 1));
SELECT setval(pg_get_serial_sequence('playlist', 'playlist_id'), COALESCE((SELECT MAX(playlist_id) FROM playlist), 1));
SELECT setval(pg_get_serial_sequence('subscription', 'subscription_id'), COALESCE((SELECT MAX(subscription_id) FROM subscription), 1));
SELECT setval(pg_get_serial_sequence('device', 'device_id'), COALESCE((SELECT MAX(device_id) FROM device), 1));
SELECT setval(pg_get_serial_sequence('album', 'album_id'), COALESCE((SELECT MAX(album_id) FROM album), 1));
SELECT setval(pg_get_serial_sequence('song', 'song_id'), COALESCE((SELECT MAX(song_id) FROM song), 1));
SELECT setval(pg_get_serial_sequence('podcast', 'podcast_id'), COALESCE((SELECT MAX(podcast_id) FROM podcast), 1));
SELECT setval(pg_get_serial_sequence('episode', 'episode_id'), COALESCE((SELECT MAX(episode_id) FROM episode), 1));
SELECT setval(pg_get_serial_sequence('payment', 'payment_id'), COALESCE((SELECT MAX(payment_id) FROM payment), 1));

