-- adds has liked column to get all posts, required userId
SELECT posts.id,
	content,
	posts.user_id,
	likes.id as hasliked
FROM POSTS
	LEFT JOIN LIKES ON POSTS.ID = LIKES.POST_ID
WHERE likes.user_id = 'insert userid of user here'
	OR likes.id IS NULL
LIMIT 10 OFFSET 0;
-- get all posts with likeCount
SELECT p.id,
	p.content,
	p.user_id,
	p.created_at,
	COALESCE(l.likes_count, 0) AS likes_count
FROM posts AS p
	LEFT JOIN (
		SELECT post_id,
			COUNT(*) AS likes_count
		FROM likes
		GROUP BY post_id
	) AS l ON p.id = l.post_id;
-- with likes count and hasliked
SELECT p.id,
	p.content,
	p.user_id,
	p.created_at,
	COALESCE(l.likes_count, 0) AS likes_count,
	COALESCE(l2.has_liked, false) AS has_liked
FROM posts AS p
	LEFT JOIN (
		SELECT post_id,
			COUNT(*) as likes_count
		FROM likes
		GROUP BY post_id
	) AS l ON p.id = l.post_id
	LEFT JOIN (
		SELECT likes.post_id,
			true AS has_liked
		FROM likes
		WHERE user_id = '15d6f60d-48ed-4a7c-9db7-7c883c22cc62'
	) AS l2 ON p.id = l2.post_id;
-- 
-- Get Single Post with hasLiked
-- 
SELECT p.id AS id,
	content,
	p.user_id AS "userId",
	p.created_at AS "createdAt",
	COALESCE(l.has_liked, false)
FROM posts AS p
	LEFT JOIN (
		SELECT true::boolean AS has_liked,
			post_id,
			user_id
		FROM likes
	) AS l ON (
		l.post_id = p.id
		AND l.user_id = '9b2676d0-e55f-4f65-8606-e10e92b8190b'
	)
WHERE p.id = '68b17ed4-da57-478f-9565-228b609e76a9';
--
--FETCHING posts with pagination
--
SELECT p.id,
	p.content,
	p.user_id AS "userId",
	p.created_at AS "createdAt",
	COALESCE(l.likes_count::INTEGER, 0::INTEGER) AS "likesCount",
	COALESCE(l2.has_liked::BOOLEAN, false::BOOLEAN) AS "hasLiked"
FROM posts AS p
	LEFT JOIN (
		SELECT post_id,
			COUNT(*) as likes_count
		FROM likes
		GROUP BY post_id
	) AS l ON p.id = l.post_id
	LEFT JOIN (
		SELECT likes.post_id,
			true AS has_liked
		FROM likes
		WHERE user_id = $1
	) AS l2 ON p.id = l2.post_id
WHERE (p.created_at < $2::TIMESTAMP)
ORDER BY p.created_at DESC
LIMIT(2);