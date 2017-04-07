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

### All requests that deal with interview questions
* View all interview questions: GET /interviewQuestions
* _Create a new interview question: POST /interviewQuestions/create_
  * Requires topic, title, question and one originalAnswer
* View specific interview question: GET /interviewQuestions/[QuestionId]/show
  * [QuestionId] is the unique 9 character ID of the question
* _Edit an interview question: POST /interviewQuestions/[QuestionId]/edit_
  * A new topic, title, question and originalAnswer must be provided, otherwise old values will remain
* _Delete an interview question: DELETE /interviewQuestions/[QuestionId]/remove_

### All requests that deal with additional answers to any interview question
* _Create a new answer: POST /interviewQuestions/[QuestionId]/answers/create_
  * Requires answerText 
* _Edit an answer: POST /interviewQuestions/[QuestionId]/answers/[AnswerId]/edit_
  * [AnswerId] follows the same convention as [QuestionId]
* _Remove an answer: DELETE /interviewQuestions/[QuestionId]/answers/[AnswerId]/remove_

