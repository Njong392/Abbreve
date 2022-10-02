# :tada: Welcome to Abbreve
Abbreve is an opne source disctionary for slangs. Writing on the internet is currently the most common way of communication, but keeping up with the abbreviation-style is becoming difficult.

Abbreve helps you keep up, by providing meanings to these abbreviations.

# :movie_camera: Project Overview
You can check out the live project [here](https://abbreve.vercel.app/)

All you need to do is start entering a slang in the search bar, and the meaning will be provided. Below the main meaning of the slang are alternative meanings.

# :mega: Want to contribute?
We would love to have you! Abbreve is open source and we are keen on hearing what you have to say.

## :bulb: Getting Started
Found a bug? Accessibility issue? Or do you want to add an abbreviation to our database? Then go right ahead and create an issue.


### Tech Stack
This project uses;
- [React](reactjs.org)
- [TailwindCSS](tailwindcss.com)

To start contributing,
### Prerequisites
You need to have, 
- [Node](nodejs.org) installed
- Basic knowledge of [Git](https://git-scm.com/)

### Steps
1. Fork this repositiory
2. In your terminal, clone your fork using `git clone <link to your fork>`
3. Run `cd Abbreve` to navigate to project directory.
4. Run `npm install` to add node_modules folder.
5. To start the server on localhost, run `npm run dev`.
>This project uses [Vite](vitejs.dev), but that shouldn't overwhelm you. Everything works pretty much the same.

6. Make your changes, push, and open a pull request.

### Adding an abbreviation
> For now, we use [JSON](https://www.w3schools.com/js/js_json_intro.asp) to store the abbreviations. We hope to improve on this as time goes on

1. In the `/public` folder, open the `/server` folder and subsequently, the `db.json` file you find in it. You can see that each slang is a JSON object of its own with a `definition` and `alternatives`.

2. To add a new abbreviation, you must append a new object to this file. 
    - The slang must be in lowercase. For example, `lgtm` not `LGTM`
    - The first letter of each word in the definition and alternatives must be uppercase. For example, `Looks Good To Me`

3. The Screenshot below could help

    - The highlighted section is an example of the way you would add an abbreviation. 
    - Before you add a new object, end the one above with a comma. If not, there will be errors in your JSON. Your IDE should indicate this.

3. If a slang does not have alternatives, add only a `definition`

> Only English slangs are accepted as of yet.

:bomb: Now, GO CREATE THOSE ISSUES AND PULL REQUESTS!


