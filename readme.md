NICE UI Dev Test 
==
**candidate: Christian Bodart**
Summary
--
A technical test undertaken for a NICE (NHS) developer role. Developed using Sublime Text, Git/Github, jasmine/jasmine-fixtures/jquery (and plugins)/knockout.

Test details located at https://github.com/nhsevidence/UIDevTest

Methodology
---
The mini-app/single page application was developed using a (slightly haphazard) mix of progressive enhancement, BDD and TDD.
The order of development took place roughly as follows:

1. Build prototype
    (See 'design' folder)
    - Fulfill desired functionality with server interaction (i.e. a basic form) 
    - Familiarize myself with the application requirements
    - Allow basic accessibility requirements to be assessed/implemented
    - Allow swift styling of form
1. Build basic 'working' Model and Controller/ViewModel code using TDD 
    (See tests folder)
    - Decide which testing framework to use
    - Deciding which library/pattern/architecture to use
    - Further clarify some of the basic concepts and behaviors of the application
1. Create behavioral tests to develop against (and decide what approach to such testing to use)
    - The behavioral tests were developed from the behavior described in the test
    - The tests were written 'against' the prototype to clarify user interaction etc
1. Build the application against both the behavioral and unit tests

Assumptions/Decisions, Questions and Notes
---
#### Initial Application Specification
Some questions were instantly raised from reviewing the specification, among them:

1. Whilst the application is specified to be mouse, touch and reader friendly, mouse only behaviors (double click and hover) for important actions are specified in the design. 

    More to the point, both requiring the user to double click and hover to reveal an action not otherwise presented is neither intuitive nor user friendly. It also (not coincidently) complicates development.
    
1. The use of 'removal' is confusing in both the document and the design - clarification required as in some places it seems like a 'delete' action is desired - additionally the icon for 'removal' is a cross which usually means delete. There does not seem to be a way to properly delete a todo - a potentially annoying shortcoming of the application which by its absence (not coincidentally) arguably complicates development.
2. Behaviour of the initial creation field was not fully specified - does it reset its content after submission (preventing user from creating multiple todos with the same description) or maintain it's content (my preferred behavior) - The design lacks an actual 'create todo' button (relying on the user to implicitly know to hit enter or equivalent

#### Prototyping
Creating an html-only implementation suggested some solutions to the problems outlined above.

1. There is no need to have a double click action to edit the field - it should simply be a normal editable field that can be clicked/focussed/tapped into on all devices (At the time of writing this is the behavior of the application so it is currently a **FAIL**)
 
2. The remove button could always be visible so it an be instantly accessed on visual devices - removing the need for separate hover/focus behavior development. 

3. The delete/removal behavior was definitely confusing  - both with the red crosses meaning remove and not being able to delete a removed action

4. Having a submit button turned out to be quite nice and helpful when it came to clarifying the best behaviour of the form (don't reset the create input, leave the content in)
#### Unit Tests/TDD
In truth this was the incorrect stage to actually start coding, however since I had not decided which design patterns/whether to use third party libraries or not, it felt like a good time to play with some small unit tests (they usually help the mosst appropraite pattern fall out in their writing).

I did though, decide to code with knockout style interfaces since this in no way prevented me from using jquery or bare metal solutions (its likely that such an interface would sit (relatively) happily with angular/backbone implementations too).

I also decided to use the jasmine testing framework as I find it incredibly simple to work with when it comes to TDD

#### BDD
Since I'd already started using jasmine I decided to try out jasmine html fixtures to write my behavioural tests (generally I'm more used to automated testing with Selenium/WebDriver etc) - since this was unknown territory for me and I still hadnt truly decided the implementation details, I decided to write my tests against the static markup I'd developed, allowing me to both get familiar with jasmine-html fixtures and make sure any test helpers I created where 'tested' themselves against real code.

####Build
Having (in the main) written all the tests against static code it was time to build - since I'd spent a fair deal of time developing so far and I already had knockout style models built I decided to use knockout in the first instance (though I did not know for sure that knockout, my tests and jasmine-html-fixtures where going to sit well together). In fact at first it proved to be a difficult environment to work in since the fixtures are built and destroyed during tests etc so I jumped to creating an html page with the knockout app in it and everytime it looked like a new piece of functionality was working I just updated my fixture html to match and ran all the tests on it. (nice opportunity for extending jasmine-fixtures or writing some node/grunt utilities to do this automatically)

####Results
At this time the application seems to be fully working but behavioural tests are failing due to a flaw in how my tests simulate user interactions.I fixed this last night but...(see below)

#### Learnings/Retrospective
1. Avoid accidentally telling git gui to clean up loose objects (git gc) when you still have some loose commits you want to keep!
2. Always install node/grunt before doing any development so you can have automated unit tests running in the background while you develop (and jshint csslint etc)
3. The only thing that took less time than creating the fully functioning app in knockout was writing the basic html markup and chopping out the images - even writing this readme has taken far longer than creating the app