#daregame 

##HTML Pages:

- Index  
  -Landing page.
  -Can view without logging in.
  -Navigate to:
    -Instagram Log in by clicking Log In or a category
    -Dare, after clicking a category
    -Play, if the user has an outstanding dare
- Howto
  -Describes how to play.  Modal pop up?
  -Can view without logging in.
  -Button to close if modal.  Open in new tab with focus otherwise?
- Dare
  -Offers a random dare from the database and asks the user to accept or decline it.
  -Must be authenticated
  -Navigate to:
    -Index via home button
    -Ajax can load another dare if declined
    -Play page by accepting dare
- Play
  -Shows the current open dare and/or past completed dares.
  -Must be authenticated
  -Navigate to:
    -One button should conditionally read either 'Chicken Out' if there is an open dare or 'New Dare' if there is no open dare.
    -Dare by clicking New Dare.  Button available if there is no open dare.
    -Complete the dare and update display via Ajax.  Adds 'new dare' button.
    -Decline the dare and update display.  Adds 'new dare' button.
    -Index page by pressing home button or the button could be called *new category*.

##API usage
The API is used for Ajax intereaction with the databse.
The user must be authenticated (via Instagram) to gain access.

###Mark a dare as not accepted:
-This adds the dare to the user's document with accepted == false.
-If successful, the API will respond with a random dare of the same category where accepted == null.  Accepted == null signifies a dare the user has not yet accepted or rejected.
#####Route: PUT /api/v1/users  

| Parameter     | Required           | 
| ------------: | --------------     |
| dare._id      | yes                | 
| user          | yes                |
| accepted      | yes, **== false**  |
| completed     | yes, *!= true*     |
| category      | yes                |


###Mark a dare as complete:
-First verify via Instagram that recent media has a hashtag == the dare hashtag.
-If the verification via Instagarm finds the hashtag, update the user database to mark this dare complete and return success.
-If verification fails, render a pop up message that we could not find proof in Instagram.
#####Route: PUT /api/v1/users

| Parameter     | Required       |
| ------------: | -------------- | 
| user._id      | yes            | 
| category      | yes            | 
| hashtag       | yes            |
| completed     | yes, *== true* |



###Get a random dare from a specified category:
If successful, the API will respond with random dare of the specified category where accepted == null for the user.  (accepted == null means the user has not yet voted on this dare)
#####Route: GET /api/v1/dares

| Parameter     | Required      |
| ------------: |---------------| 
| user          | yes           | 
| category      | yes           |


##Standard Routes
These routes are for browser navigation (they respond with HTML)
The user must be authenticated for all but the *index* and *how to play* pages.

###Index (pick a category)
#####Route: GET /
-Render 'index'
-(Wishlist item:  If the user is *authenticated* and *has an accepted but incomplete dare*, add a button labeled 'Your active dare' to go directly to 'user page' (so a returning user does not have to go through 'categories' to get back to their current game))

###How To (how to play)
#####Route: GET /howto
-Render 'howto': a simple page to describe how to play.  
-Should be a button on the home page to get here.  
-(Wishlist item: Put a button on every page (header) that links to this page.)


###Dare View (pick a dare)
#####Route: GET /dare
-Call GET /api/v1/dares to get a random dare
-Render 'dare' after the API returns a dare.
-This route is intended to be hit from the index page when user selects a category or from user page when a user requests a new dare.  

| Parameter     | Required      |
| ------------: |---------------| 
| user          | yes           | 
| category      | yes           |

###Play View (complete a dare)
#####Route: GET /play
-Render 'play'.
-These routes are intended to be hit from the Dare View page or from the Index.

| Parameter     | Required      |
| ------------: |---------------| 
| user          | yes           | 
| dare          | yes           |
