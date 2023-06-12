# TEAMS IMPACT

# Data Layer

### Data

- Collection of Teams
  - \_id -> string
  - name -> string
  - description -> string
  - character1 -> string
  - character2 -> string
  - character3 -> string
  - character4 -> string
  - rating -> string
  - type -> string
  - image -> string

### Modifications

- loadTeams
- loadTeam
- addTeam
- deleteTeam
- updateTeam

### Actions

- addTeam()
- removeTeam()
- updateTeam()
- loadTeams()
- filterTeams()
- loginUser()
- logoutUser()
- provideFeedback()
- showLoader()
- hideLoader()
- openModal()
- closeModal()

## API Operations (Custom Hooks)

- useTeams() – Including getTeams(),getTeamById() addTeam(), updateTeam(), removeTeam()
- useUser() – Including loginUser()
- useToken() - getDataToken()
- useLocalStorage() - setToken() , getToken() , removeToken()

## Store

### State

- Collection of Teams

### TeamsReducer

- addToDo()
- removeToDo()
- updateToDo()
- loadToDos()
- toggleToDo()

# Components

## App

- Receives a collection of Teams
- Renders a Header component
- Renders a TeamsList component

## navBar

- Renders a button to home
- Renders a button to logout
- Shows a logo of Teams Impact

## TeamsList

- Receives a collection of Teams
- Renders 3 TeamCard components
- Renders a Button component
  - text: "Load more"
  - actionOnClick: handleSubmit

## TeamCard

- Receives a Team
- Shows the Team's image
- Shows the Team's name
- Shows the Team's main character image
- Shows the Team's rating
- Shows the Team's type
- Renders a Button for delete:
  - alt_text: "delete"
  - actionOnClick: handleClick

## Button

- Receives a text
- Receives an action on click
- Shows a Button with the received text
- Calls the received action when the button is clicked

## TeamForm

- Shows an input text for the name of the Team
- Shows an textarea for the description of the Team
- Shows an select for the main character of the Team
- Shows an select for the 2n character of the Team
- Shows an select for the 3rd character of the Team
- Shows an select for the 4th character of the Team
- Shows an select for the rating of the Team
- Shows an select for the type of the Team
- Shows an input text for the URL of the background image of the Team
- Renders a Button component
  - text: "Create team" / "Edit team"
  - actionOnClick: handleSubmit

## LoginForm

- Have a own state.
- Receives a handleOnSubmit action
- Create a functionOnHandleOnSubmit, calls event.prevent.default(), calls handleOnsubmit(userCredentials) and reset UserCredentials
- Shows inputs for username and password.
- Show a button with the text "Log in"

# Layout

- Renders header component

# Pages

All pages are rendered in the layout component with a navBar component

## 404

- Shows "404 Traveler... there's nothing here"

## LoginPage

- Renders login component
- Receives a dispatch
- Create a handleOnSubmit function to call loginUser from useUSer customHook

## listPage

- Renders teamsList component

## detailPage

- Shows all details of especific Team
- Call getTeamById from useTeams custom hook

## addPage

- Renders a form component with "Create form" title

## modifyPage

- Renders a form component with "Modify form" title
