/*

Behavioural story

Initial load (no todos)
The create todo component should be visible

Within the story 
click means: hitting enter, clicking or tapping on a focussed element

Outline of behaviour
Add a new task 
1) User types into new task input and hits enter
2) App creates a new task
	a) Task should be visible
	a) New Tast text should match what was inputted (but trimmed)
	b) Task should be marked as incomplete

Interactions with task
3) Mark task as complete
	a) there should be a clickable/focussable/visable element for user to mark task as complete
	b) when clicked the task should be marked as complete
4) Editing the text
	a) **TODO - check double click indication in Aria? double click on the text and it should be editable
	b) The changes should be preserved (and trimmed presumably) once enter is hit or input loses focus
	c) See below for removing content behaviour
	d) Pressing escape returns the input to its original value
5) 	Removal
	a) if the edit box has its content deleted (or is only whitespace) the values should be preserved and the item marked as removed
	b) hovering (or focussing) on the todo should make the remove control visible
	c) Removed tasks are visible but marked as removed

Quick test suggestions (INCOMPLETE - lets do a little work )
Tests with question marks indicate behaviour queries by myself

(all below should be duped for accessibility interaction)

Create and Complete
User enters new task - new task is visible with correct text
User enters new task with whitespace - text is trimmed

User marks the first task as completed - task is shown to be completed
User tries to edit completed task and cannot

QUERY: Can User edit completed tasks? (e.g. mark as removed or actual delete or even update description)

User edits second task description successfully (with whitespace trimmed)
User marks second task as removed

User creates two new tasks (are all tasks still visible and in the order we expect?)
User edits first of new tasks and deletes all content - expect reset to original value
User edits second of new tasks and 

*/






































*/