# quiztest [![npm version](https://badge.fury.io/js/quiztest.svg)](https://badge.fury.io/js/quiztest) [![Build](https://github.com/Nitinbabariya/quiztest-js/actions/workflows/build.yml/badge.svg)](https://github.com/Nitinbabariya/quiztest-js/actions/workflows/build.yml)

I'm working on this project in my free time to learn more about https://svelte.dev/

- supports markdown text formatting, images, syntax highlighting and math rendering.
- different [quiz-types](./docs/syntax.md): single-choice, multiple-choice, sequence.
- support for [hints and explanations](./docs/syntax.md#hints-and-comments).
- [options](./docs/options.md) for color theme, question shuffling, localization.
- can be easily included in any website, static site generator or [other web projects](./docs/module_import.md).
- mobile friendly with touch support for all question types.

## Usage

quiztest is easy to setup and best used in combination with existing static site generators like *Jekyll*, *Hugo* or *Sphinx*. Check out the extensions
[hugo-quiz](https://github.com/Nitinbabariya/hugo-quiz) 

### 📚 [Documentation](./docs/)

## Stand-alone Example

Add the library to your website and initialize with default options:

```html
<head>
	...
    <script 
	src="https://cdn.jsdelivr.net/npm/quiztest@latest/public/build/quiztest.js">
	</script>
	<script>quiztest.init();</script>
	...
</head>
```

To keep the bundle size low, syntax highlighting and math rendering are implemented in separate extensions that can be loaded and registered manually if needed: 

```html
<head>
	...
    <script src="./build/quiztest.js"></script>
	<script src="./build/extensions/quiztestKatex.js"></script>
	<script src="./build/extensions/quiztestHighlight.js"></script>
	<script>
		quizdown.register(quiztestKatex).register(quiztestHighlight).init();
	</script>
	...
</head>
```

Write questions within a `quiztest` class (edit in the [🚀quizdown editor](https://bonartm.github.io/quizdown-live-editor/?code=---%0AprimaryColor%3A%20steelblue%0AshuffleQuestions%3A%20false%0AshuffleAnswers%3A%20true%0A---%0A%0A%23%23%23%20Select%20your%20superpowers!%0A%0A-%20%5B%20%5D%20Enhanced%20Strength%0A-%20%5B%20%5D%20Levitation%0A-%20%5Bx%5D%20Shapeshifting%0A%0A%23%23%23%20What%27s%20the%20capital%20of%20Germany%3F%0A%0A%3E%20Hint%3A%20The%20_largest_%20city%20in%20Germany...%0A%0A1.%20%5Bx%5D%20Berlin%0A1.%20%5B%20%5D%20Frankfurt%0A1.%20%5B%20%5D%20Paris%0A1.%20%5B%20%5D%20Cologne)):

```html
...
<div class="quiztest
	---
	primaryColor: steelblue
	shuffleQuestions: false
	shuffleAnswers: true
	---

	### Select your superpowers!

	- [ ] Enhanced Strength
	- [ ] Levitation
	- [x] Shapeshifting

	### What's the capital of Germany?

	> Hint: The _largest_ city in Germany...

	1. [x] Berlin
	1. [ ] Frankfurt
	1. [ ] Paris
	1. [ ] Cologne
</div>
...
```
## Markdown support

### Currently quiztest supports following markdown elements

#### Bold
~~~
**bold text**
~~~ 
**bold text**

#### Italic
~~~
*italicized text*
~~~
*italicized text*

#### strikethrough
~~~
~~The world is flat.~~
~~~
~~The world is flat.~~

#### Blockquote (Used to provide hint of explanation that is useful for examiner in given context of question)
~~~ 
> blockquote
~~~
> this is an example quotation

#### Code
~~~ 
`hello world!
~~~
`hello world!`

#### Fenced code block
~~~
{
    "firstName": "John",
    "lastName": "Smith",
}
~~~

```
{
  "firstName": "John",
  "lastName": "Smith",
}
```

#### Ordered List (single choice answers)
~~~
1. First item
2. Second item
3. Third item
~~~
1. First item
2. Second item
3. Third item

#### Unordered List (multi choice answers)
~~~
- First item
- Second item
- Third item
~~~
- First item
- Second item
- Third item

#### Link
~~~
[title](https://www.example.com)
~~~
[title](https://www.example.com)

#### images
~~~
![alt text](image.jpg)
~~~
![alt text](image.jpg)

#### Heading
~~~
Currently heading is supported but only used as a question separator
# H1
## H2
### H3
~~~

#### Math and equation
~~~
$$
x = \frac{2+2}{\sqrt{a^2+b^2}}
$$
~~~
$$
x = \frac{2+2}{\sqrt{a^2+b^2}}
$$
### Not supported markdown elements

#### Horizontal Rule
~~~
---
~~~

#### Highlight
```
I need to highlight these ==very important words==.
```
I need to highlight these ==very important words==.

#### Subscript
~~~
H~2~O
~~~

#### Superscript
~~~
X^2^
~~~

#### Footnotes
~~~
Here's a sentence with a footnote. [^1]
[^1]: This is the footnote.
~~~

#### Table
~~~
| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |

~~~


## Contributing

Pull requests and feature requests are welcome. For major changes, please open an issue first to discuss what you would like to change. I'm happy for any feedback on how to improve the code base. 

### Wish List
- customizable reward page at the end of the quiz. Nice to show encouraging messages if the user is not performing well or otherway if the user is really good then play some animation and music
- fill in the blanks quiz
- link quizzes on different pages together via a results summary page (https://github.com/bonartm/quizdown-js/issues/18)

### How To 

After cloning, install the packages with 

```bash
npm install
```

Build the library with

```bash
npm run build
```

You can also preview a live version with

```bash
npm run dev
```

### Release process
```
#specify the version
# https://docs.npmjs.com/updating-your-published-package-version-number
npm version {major|minor|patch}

#Build bundle in release mode
npm run build

# push the changes 
git push
git push origin --tags

# create PR

# Merge the PR
# Create a release in github
 This will triggers the release process to publish the new npm package at https://www.npmjs.com/package/quiztest?activeTab=versions

```

### Published npm packages
[List of published packages](https://www.npmjs.com/package/quiztest?activeTab=versions)

## Credits
Its a forked project, I am Inspired by the [mermaid library](https://github.com/bonartm/quizdown-js)
to lean on top of what [bonartm](https://github.com/bonartm) has built.
