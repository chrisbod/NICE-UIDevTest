NICE UI Dev Test 
==
**candidate: Christian Bodart**
Summary
--
A technical test undertaken for a NICE (NHS) developer role. Developed using Sublime Text, Git/Github, jasmine/jasmine-fixtures/jquery (and plugins)/knockout.

Test details located at https://github.com/nhsevidence/UIDevTest

Skip the waffle and jump straight to the [interesting bits](#interesting_bits)

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
    
2. The use of 'removal' is confusing in both the document and the design - clarification required as in some places it seems like a 'delete' action is desired - additionally the icon for 'removal' is a cross which usually means delete. There does not seem to be a way to properly delete a todo - a potentially annoying shortcoming of the application which by its absence (not coincidentally) arguably complicates development.
3. Behaviour of the initial creation field was not fully specified - does it reset its content after submission (preventing user from creating multiple todos with the same description) or maintain it's content (my preferred behavior) - The design lacks an actual 'create todo' button (relying on the user to implicitly know to hit enter or equivalent

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

#### Learnings/Retrospective
1. Avoid accidentally telling git gui to clean up loose objects (git gc) when you still have some loose commits you want to keep!

2. Always install node/grunt before doing any development so you can have automated unit tests running in the background while you develop (and jshint csslint etc)

3. The only thing that took less time than creating the fully functioning app in knockout was writing the basic html markup and chopping out the images - even writing this readme has taken far longer than creating the app


<a name="interesting_bits"></a>
####Important files
The first release is available as a distributable/zip https://github.com/chrisbod/NICE-UIDevTest/releases - please read the release notes as in my opinion it is a FAIL of the requirements but worthy of inspection

The functional html example is in /src/knockout.htm [source here] (https://github.com/chrisbod/NICE-UIDevTest/blob/master/src/knockout.htm) 

The tests are all in the test directory [/tests] (https://github.com/chrisbod/NICE-UIDevTest/tree/master/tests) - to run them in chrome you will need to change your security settings so that local file httprequests work

####Results
At this time the application seems to be fully working but behavioural tests are failing due to a flaw in how my tests simulate user interactions.I fixed this last night but...(see below)

####Accessibility/Design/Platform notes

1. I have not used labels for controls but used title tags instead (this is fine with all bar one or two obscure screen readers)

2. Due to the hiding and showing of the delete/remove buttons the reverse tab order is slightly different
    - tab forward = todo, mark todo complete, todo text, remove todo
    - tab backward does not focus on the remove todo but goes to the todo text
    This inconsistency would be absent if the remove buttons where not hiding and showing but permanently visible (a better user experience anyway) 

3. At present the text field is editabe on focus AND on click/tap - double click functionality is not provided since a double click would focus the field into edit mode anyway and on touch devices a focus event would occur before a dbl tap or tap hold too.

4. My choice of title attributes is a little arbitrary and could do with cleaning up/simplification I suspect - a good chat with an accessibility expert or using a screen reader on it myself would improve things no doubt

