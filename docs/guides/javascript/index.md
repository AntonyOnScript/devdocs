---
title: JavaScript
---


Moodle makes heavy use of JavaScript to improve the experience for its users.

All new JavaScript in Moodle should use the ES2015+ module format, which is
transpiled into the CommonJS format.
Modules are loaded in the browser using the RequireJS loader.

All Moodle JavaScript can use the same Mustache templates and translated strings which are available to Moodle PHP code, and the standard Moodle web service framework can be used to fetch and store data.

This guide covers how to get started with JavaScript in Moodle, and introduces key concepts and features including module format and structure, including your code, using templates, using translation features, tooling, and handling events.

:::note
You may see the terms `ES6` and `ES2015` used interchangably.
ES2015 is the 6th generation of the Ecma Script specification.
ES2015 respresents a big change from previous versions of the Ecma Script
specification.
:::

## Useful References

Moodle uses vanilla JavaScript combined with helpers for performing common actions, and a small collection of libraries
for serving and managing dependencies.

The JavaScript documentation available on the Mozilla Developer Network is one of the best reference documentations
available. You may find the following references particularly useful:

- [MDN JavaScript guide][guides_javascript-mdn-javascript_guide].
- [MDN JavaScript Reference][guides_javascript-mdn-javascript_reference].
- [ES2015+ Cheatsheet][guides_javascript-devhints-es6_cheatsheet]

## Modules

JavaScript in Moodle is structured into ES2015 modules which are transpiled into the CommonJS format.

Like our PHP classes and Mustache templates, our JavaScript modules each belong to a particular {term}`component`
and must be named according to our standard [name and namespace conventions](../policy/naming#javascript).

The naming scheme for Moodle’s JavaScript fits into the pattern:

`[component_name]/[optional/sub/namespace/][modulename]`

The first directory in any subfolder must be either a Moodle API, or `local`.

The following are examples of valid module names:

```
// For a module named `discussion` in the `mod_forum` component:
mod_forum/discussion

// For a module named `grader` in the `mod_assign` component which is
// part of the `grades` API:
mod_assign/grades/grader

// For a module named `confirmation` in the `block_newsitems` component
// which is a modal and not part of a core API:
block_newsitems/local/modal/confirmation

// For a module name `selectors` in the `core_user` component and relates
// to the `participants` module:
core_user/local/participants/selectors
```

:::tip
When structuring a new module you may find it clearer to create a main entry-point module with related modules stored in
a subdirectory.

For example when creating a new module which controls interactions on the Participants page and which is part of
the `core_user` component you will create a `participants` module.
The full namespace for this module will be `core_user/participants`.

The `core_user/participants` module may interact with DOM elements which are identified by CSS Selectors.
The Moodle convention is to place the selectors in a `selectors` module.

The module will also call a set of Web Services.
The Moodle convention is to place calls to Web Services in a `repository` module.

Since `participants` isn't a formal API in Moodle you must create your submodules in the `local/participants`
directory.

```console
.
├── local
│   └── participants
│       ├── repository.js       // core_user/local/participants/selectors
│       └── selectors.js        // core_user/local/participants/repository
└── participants.js             // core_user/participants
```

:::

## Writing your first module

The convention in Moodle is to have one JavaScript Module which is your initial entrypoint.
This usually provides a function called `init` which you then [export][guides_javascript-mdn-javascript_reference-export] from the module.
This `init` function will be called by Moodle.

Your module will probably also have one or more dependencies which you will `import`.

As you start to build out the structure of your code you will start to export more functions, as well as Objects,
Classes, and other data structures.

:::note
This guide isn't intended to teach you how to write JavaScript.
If you are new to JavaScript, you may want to start with the [MDN JavaScript
basics guide][guides-javascript-mdn-javascript_getting_started].
:::

A module which calls to the browser `console.log` function would look like:

```js title="mod/example/lib/amd/src/helloworld.js"
export const init = () => {
    window.console.log('Hello, world!');
};
```

In this example a new variable called `init` is created and exported using
the ES2015 [export][guides_javascript-mdn-javascript_reference-export] keyword.
The variable is assigned an arrow function expression which takes no
arguments, and when executed will call the browser `console.log` function
with the text `"Hello, world!"`.

### Listen to a DOM Event

Usually you will want to perform an action in response to a user
interacting with the page.

You can use the [document.addEventListener()][guides_javascript-mdn-javascript_reference-addeventlistener] method to do
this.

To add a `click` listener to the entire body you would write:

```js title="mod/example/lib/amd/src/helloworld.js"
export const init = () => {
    document.addEventListener('click', e => {
        window.console.log(e.target);
    });
};
```

In this example any time that a user clicks anywhere on the document the item
that was clicked on will be logged to the browser console.

Usually you won't want to listen for every click in the document but only for
some Elements in the page.

If you wanted to display a browser alert every time a user clicks on a button,
you might have a template like the following example:

```mustache title="mod/example/templates/helloworld.mustache"
 <button data-action="mod_example/helloworld-update_button">Click me</button>
```

You can write a listener which looks for clicks to this button:

```js title="mod/example/lib/amd/src/helloworld.js"
const Selectors = {
    actions: {
        showAlertButton: '[data-action="mod_example/helloworld-update_button"]',
    },
};

export const init = () => {
    document.addEventListener('click', e => {
        if (e.target.closest(Selectors.actions.showAlertButton)) {
            window.alert("Thank you for clicking on the button");
        }
    });
};
```

This example shows several conventions that are used in Moodle:

- CSS Selectors are often stored separate to the code in a `Selectors`
  object. This allows you to re-use a Selector and to group them
  together in different ways. It also places all selectors in one place so
  that they're easier to update.
- The `Selectors` object is stored in a `const` variable which is \_not\_
  exported. This means that it's private and only available within your
  module.
- A `data-*` attribute is used to identify the button in the JavaScript
  module.
  Moodle advises not to use class selectors when attaching event listeners because
  so that it's easier to restyle for different themes without any changes to
  the JavaScript later.
- A namespace is used for the `data-action` to identify what the button is intended for.
- By using `e.target.closest()` you can check whether the element that was
  clicked on, or any of its parent elements matches the supplied CSS Selector.

Instead of having one event listener for every button in your page, you can
have one event listener which checks which button was pressed.
If you have a template like the following:

```mustache title="mod/example/templates/helloworld.mustache"
 <div>
     <button data-action="mod_example/helloworld-update_button">Click me</button>
     <button data-action="mod_example/helloworld-big_red_button">Do not click me</button>
 </div>
```

Then you can write one event listener which looks at all buttons on the page.
For example:

```js title="mod/example/lib/amd/src/local/helloworld/selectors.js"
export default {
    actions: {
        showAlertButton: '[data-action="mod_example/helloworld-update_button"],
        bigRedButton: '[data-action="mod_example/helloworld-big_red_button"],
    },
};
```

```js title="mod/example/lib/amd/src/helloworld.js"
import Selectors from './local/helloworld/selectors';

const registerEventListeners = () => {
    document.addEventListener('click', e => {
        if (e.target.closest(Selectors.actions.showAlertButton)) {
            window.alert("Thank you for clicking on the button");
        }

        if (e.target.closest(Selectors.actions.bigRedButton)) {
            window.alert("You shouldn't have clicked on that one!");
        }
    });
};

export const init = () => {
    registerEventListeners();
};
```

You will notice several key differences in this example when compared with the previous one:

- The list of Selectors has been moved to a new Module which is included using
  the [import][guides_javascript-mdn-javascript_reference-import] keyword.
  The new `selectors` module is a dependency of the `helloworld` module.
- The call to `document.addEventListener` has been moved to a new
  `registerEventListeners` function.
  This is another Moodle convention which encourages you to structure your
  code so that each part has clear responsibilities.
- One event listener is present and it checks if the Element clicked on was
  one that it's interested in.

## Including JavaScript from your pages

Once you have written a JavaScript module you need a way to include it within your content.

Moodle has three main ways to include your JavaScript and the best way will depend on your content. These are:

- from a template via `requirejs`;
- from PHP via the output requirements API; and
- from other JavaScript via `import` or `requirejs`.

### Including from a template

Most recent code in Moodle makes heavy use of Mustache templates and you will often find that your JavaScript is
directly linked to the content of one of your templates.

All JavaScript in Mustache templates must be places in a `{{#js}}` tag.
This tag ensures that all JavaScript is called in a consistent and reliable way.

:::caution
You shouldn't add too much JavaScript directly to a template.
JavaScript placed directly into Templates isn't transpiled for consistent use in all browsers and it isn't passed through minification processes.
Some browser-specific features won't be available.
:::

This simplest form of this is:

```mustache title mod/forum/templates/discussion.mustache
<div>
    <!—- Your template content goes here. —->
</div>

{{#js}}
require(['mod_forum/discussion'], function(Discussion) {
    Discussion.init();
});
{{/js}}
```

Any time that this template is rendered and placed on the page the `mod_forum/discussion` module will be fetched and the `init()` function called on it.

:::note Since Moodle 4.0
Moodle no longer supports Internet Explorer. It's now safe to use {term}`Arrow functions<Arrow functions>`.
:::

Often you may want to link the JavaScript to a specific `DOMElement` in the template.
You can use the `{{uniqid}}` Mustache tag to give that DOM Element a unique ID and then pass that into the Module.

```mustache
<div id=“mod_forum-discussion-wrapper-{{uniqid}}”>
    <!—- Your template content goes here. —->
</div>

{{#js}}
require([‘mod_forum/discussion’], function(Discussion) {
    Discussion.init(document.querySelector(“mod_forum-discussion-wrapper-{{uniqid}}”));
});
{{/js}}
```

In this example you have added a new `id` to the `div` element.
You then fetch the DOM Element using this id and pass it into the `init` function.

:::note
The `{{uniqid}}` tag gives a new unique string for each rendered template including all its children.
It isn't a true unique id and must be combined with other information in the template to make it unique.
:::

### Including from PHP

Much of Moodle’s code still creates HTML content in PHP directly.
This might be a simple `echo` statement or using the `html_writer` output functions.
A lot of this content is being migrated to use Mustache Templates which are the recommended approach for new content.

Where content is generated in PHP you will need to include your JavaScript at the same time.

Although several older ways to include JavaScript from PHP, it`s strongly
recommended that all new JavaScript only use the `js_call_amd` function on the
`page_requirements_manager`.
This has a similar format to the version used in Templates:

```php
// Call the `init` function on `mod_forum/discussion`.
$PAGE->requires->js_call_amd('mod_forum/discussion', 'init');
```

The `js_call_amd` function turns this into a `requirejs` call.

You can also pass arguments to your function by passing an array as the third argument to `js_call_amd`, for example:

```php
// Call the `init` function on `mod_forum/discussion`.
$PAGE->requires->js_call_amd(‘mod_forum/discussion’, ‘init’, [$course->id]);
```

If you pass a multi-dimensional array as the third argument, then you can use Array destructuring within the JavaScript to get named values.

```php
$PAGE->requires->js_call_amd(‘mod_forum/discussion’, ‘init’, [[
    ‘courseid’ => $course->id,
    ‘categoryid’ => $course->category,
]]);
```

```js
export const init = ({courseid, category}) => {
    window.console.log(courseid);
    window.console.log(category);
};
```

:::caution
A limit applies to the length of the parameters passed in the third argument.
If data is already available elsewhere in the DOM, you shoudl avoid passing it as a parameter.
:::

## Passing data to your Module

You will often need to work with data as part of your JavaScript module.
This might be simple data, like the a database id, or it may be more complex
like full Objects.

Moodle provides several ways to achieve this:

* you can pass a small amount of data into the module initialisation, but this is no longer recommended
* you can store this data in the DOM as a data attribute which is fetched in your code
* a Moodle Web Service can be used to fetch more complex data structures dynamically

### Using data attributes

The easiest way to pass data is to use data attributes.

```{eval-rst}
.. TODO::

    Document the main ways that we pass data.

    Focus on:

        * data- attributes in HTML being ready
        * the limitations of the data passed into `js_call_amd`
        * web services


```

## Promises

```{eval-rst}
.. TODO::

    We should document things like:

        * Use ``then`` and ``catch`` consistently (thennables)
        * Don't use ``catch`` if you are returning a Promise just by habit - only use it if you mean to
        * You _must_ return at the end of a thennable
        * It's generally a good idea to return a Promise from a fucntion if the function is primarily tasked with
          creating that Promise
```

:::important
You shouldn't use the `done`, `fail`, or `always` functions on Promises.
These are a jQuery feature which isn't present in the Native Promise implementation.
:::

### Examples

```js
const getModal = questionBody => {
    return ModalFactory.create({
        title: getString('mytitle', 'mod_example'),
        body: renderTemplate('mod_example/example_body', questionBody),
        removeOnClose: true,
    })
    .then(modal => {
        modal.show();

        return modal;
    });
};
```

## Working with Strings

One of the most helpful core modules is `core/str` which allows you to fetch and render language Strings in JavaScript.

The `core/str` module has two main functions, which both return Promises containing the resolved string.

Strings are fetched on request from Moodle, and are then cached in LocalStorage.

## Example

```{literalinclude} _examples/str.js
:language: javascript
:linenos:
```

## Templates

## Modals

## Notifications

## AJAX Calls

## Preferences

## Prefetch

## Tools

Moodle uses common and popular tools to ensure code quality, and to improve the
end-user experience.

Most of the Moodle JavaScript tooling requires [NodeJS](../tools/nodejs).

### Grunt

[Grunt] is a command-line tool used to compile JavaScript, and CSS, and to lint JavaScript, CSS, and Behat tests.

:::tip
Rather than running `grunt` on the entire Moodle source every time you make changes, you can use `grunt watch`
in the background to build just the files you change as you write them.
:::

#### Installing grunt

```console
$ npm -g install grunt-cli
```

#### Using grunt

```bash
grunt
```

### ESLint

## Glossary

:::glossary
Arrow functions

  An arrow function is a shorthand way of writing a regular function.
  These have several small but important differences to regular functions which make them easier to use in most
  cases, but unsuitable in some others.

  They're not suitable for use in code which isn't transpiled as Internet Explorer doesn't offer any support for
  them.

  For more information see the [MDN documentation for Arrow function expressions][guides_javascript-mdn-arrow_functions].
:::

% ------------------------------------------------------------------------
% Links used on the current page go here.
% All links must be namespaced in the format:
%
%     `guides_javascript-[domain_or_acronym]-[specialty]`
%
% These links should be kept sorted alphabetically

[grunt]: https://gruntjs.com/
[guides-javascript-mdn-javascript_getting_started]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web
[guides_javascript-devhints-es6_cheatsheet]: https://devhints.io/es6
[guides_javascript-mdn-arrow_functions]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
[guides_javascript-mdn-javascript_guide]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[guides_javascript-mdn-javascript_reference]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
[guides_javascript-mdn-javascript_reference-addeventlistener]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
[guides_javascript-mdn-javascript_reference-export]: https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export
[guides_javascript-mdn-javascript_reference-import]: https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/import