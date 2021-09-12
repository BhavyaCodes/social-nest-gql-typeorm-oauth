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