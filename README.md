# JobQuest

## RESTful API Reference

Note: Items in *italics* require user authentication.

### All requests that deal with posts
* View all posts: GET /posts
* _Create a new post: POST /posts/create_
  * Requires title, thread
* View specific post: GET /posts/[PostId]/show
  * [PostId] is the unique 9 character ID of the post
* _Edit a post: POST /posts/[PostId]/edit_
  * A new title and/or thread must be provided, otherwise old values will remain
* _Delete a post: DELETE /posts/[PostId]/remove_
* _Vote on a post: POST /vote/[TypeId]/[PostId]_
  * [TypeId] can be 'up' to vote up or 'down' to vote down

### All requests that deal with comments
* _Create a new comment: POST /posts/[PostId]/comments/create_
* _Edit a comment: POST /posts/[PostId]/comments/[CommentId]/edit_
  * [CommentId] follows the same convention as [PostId]
* _Remove a comment: DELETE /posts/[PostId]/comments/[CommentId]/remove_

### All requests that deal with applications
* View all applications: GET /applications
* _Create a new application: POST /applications/create_
  * Requires company, role, status and comment (optional) 
* View specific application: GET /applications/[ApplicationId]/show
  * [ApplicationId] is the unique 9 character ID of the application
* _Edit an application: POST /applications/[ApplicationId]/edit_
  * A new company, role, status and/or comment must be provided, otherwise old values will remain
* _Delete an application: DELETE /applications/[ApplicationId]/remove_

### All requests that deal with reddit
* View posts from a subreddit: GET /reddit/:Subreddit/:Sort
  * [Subreddit] is the name of the subreddit (e.g. cscareerquestions)
  * [Sort] is the sorting method that should be applied (hot/new/top/controversial)
* Search posts from a subreddit: POST /reddit/:Subreddit/search
  * Requires searchterm