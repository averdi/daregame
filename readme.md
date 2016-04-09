#daregame 

##API usage
The API is used for Ajax intereaction with the databse.
The user must be authenticated (via Instagram) to gain access.

###Mark a dare as not accepted:
This adds the dare to the user database with accepteed == false.
If successful, the API will respond with random dare of the same category where accepted == null.
####Route: PUT /api/v1/users
| Parameter     | Required      |
| ------------: |---------------| 
| dare          | yes           | 
| user          | yes           | 
| accepted      | yes           |
| category      | yes           | 

###Get a random dare from a specified category:
If successful, the API will respond with random dare of the specified category where accepted == null for the user specified.  (accepted == null means the user has not yet voted on this dare)
####Route: GET /api/v1/dare
| Parameter     | Required      |
| ------------: |---------------| 
| user          | yes           | 
| category      | yes           |

##Standard Routes
These routes are for browser navigation (they respond with HTML)

###Initial view (pick a category)

####Route: GET /
render 'index'
if the user is authenticated and has a current dare, add a button labeled 'Your active dare' to go directly to 'user page' (so a returning user does not have to go through 'categories' to get back to their current game)

###Dare View (pick a dare)

####Route: GET /category
call GET /api/v1/dares to get a random dare
render 'dare' when the API returns a dare
these routes are hit from the index page or from user page when a user requests a new dare
| Parameter     | Required      |
| ------------: |---------------| 
| category      | yes           | 
| user          | yes           | 

###Play Page (complete a dare)

####Route: GET /play
call GET /api/v1/dare to get a random dare
render 'dare' when the API returns a dare
these routes are hit from the index page or from user page when a user requests a new dare
| Parameter     | Required      |
| ------------: |---------------| 
| category      | yes           | 
| user          | yes           | 
