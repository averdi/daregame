#daregame 


##API usage
The API is used for Ajax intereaction with the databse.
The user must be authenticated (via Instagram) to gain access.

###Mark a dare as not accepted:
This adds the dare to the user database with accepted == false.
If successful, the API will respond with random dare of the same category where accepted == null.
####Route: PUT /api/v1/users
(with accepted == false && completed == null)
| Parameter     | Required      |
| ------------: |---------------| 
| dare          | yes           | 
| user          | yes           | 
| accepted      | yes, == true  |
| completed     | yes, *!= true*  |
| category      | yes           | 

###Mark a dare as complete:
First verify via Instagram that recent media has a hashtag == the dare hashtag.
If the verification via Instagarm finds the hashtag, update the user database to mark this dare complete.
If verification fails, render a pop up message that we could not find proof in Instagram.
If success, return success.
####Route: PUT /api/v1/users
| Parameter     | Required      |
| ------------: |---------------| 
| user          | yes           | 
| category      | yes           |
| completed     | yes, *== true* |



###Get a random dare from a specified category:
If successful, the API will respond with random dare of the specified category where accepted == null for the user specified.  (accepted == null means the user has not yet voted on this dare)
####Route: GET /api/v1/dares
| Parameter     | Required      |
| ------------: |---------------| 
| user          | yes           | 
| category      | yes           |


##Standard Routes
These routes are for browser navigation (they respond with HTML)
The user must be authenticated for all but the index and how to play pages.

###Initial view (pick a category)
####Route: GET /
Render 'index'
(Wishlist item:  If the user is authenticated and has a current dare, add a button labeled 'Your active dare' to go directly to 'user page' (so a returning user does not have to go through 'categories' to get back to their current game))
####Route: GET /gameplay
Render 'gameplay'
A simple page to describe how to play.  Should be a button on the home page.  
(Wishlist item: Put a button on every page (header) that links to this page.)


###Dare View (pick a dare)
####Route: GET /dare
call GET /api/v1/dares to get a random dare
Render 'dare' after the API returns a dare.
This route is intended to be hit from the index page when user selects a category or from user page when a user requests a new dare.
| Parameter     | Required      |
| ------------: |---------------| 
| user          | yes           | 
| category      | yes           |

###Play Page (complete a dare)
####Route: GET /play
Render 'play'.
These routes are intended to be hit from the Dare View page or from the Index.
| Parameter     | Required      |
| ------------: |---------------| 
| user          | yes           | 
| dare          | yes           |
