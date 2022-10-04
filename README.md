# :tada: Welcome to Abbreve
Abbreve is an open source dictionary for slangs. Writing on the internet is currently the most common way of communication, but keeping up with the abbreviation-style is becoming difficult.

Abbreve helps you keep up, by providing meanings to these abbreviations.

# :movie_camera: Project Overview
You can check out the live project [here](https://abbreve.vercel.app/)

All you need to do is start entering a slang in the search bar, and the meaning will be provided. Below the main meaning of the slang could be alternative meanings.
![Screenshot of form section of page with 'lgtm' types into the search bar, it's meaning below it, and alternative meanings](https://user-images.githubusercontent.com/81039882/193478300-b950c00a-acf9-4c31-9e92-ee500e591588.png)


# :mega: Want to contribute?
We would love to have you! Abbreve is open source and we are keen on hearing what you have to say. Do check out the [code of conduct](https://github.com/Njong392/Abbreve/blob/main/CODE_OF_CONDUCT.md) for rules and guidelines.

## :bulb: Getting Started
Found a bug? Accessibility issue? Or do you want to add an abbreviation to our database? Then go right ahead and create an issue.


### Tech Stack
This project uses:
- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com)

### Prerequisites
Before installation, you need to have the following: 
- [Node](https://nodejs.org) installed
- Basic knowledge of [Git](https://git-scm.com/)

### Steps
1. [Fork](https://github.com/Njong392/Abbreve/fork) this repository. 
2. In your terminal, clone your fork using `git clone <link to your fork>`.
3. Run `cd Abbreve` to navigate to project directory.
4. Run `npm install` to add node_modules folder.
5. To start the server on localhost, run `npm run dev`.
>This project uses [Vite](https://vitejs.dev), but that shouldn't overwhelm you. Everything works pretty much the same.

6. Make your changes, push your code, and open a pull request.

### Adding an Abbreviation
Before adding an abbreviation, please make sure that the new entry does Not already exist. You can easily check this by entering the slang on the [live](https://abbreve.vercel.app/) site to see if gives a result or not.

> For now, we use [JSON](https://www.w3schools.com/js/js_json_intro.asp) to store the abbreviations. We hope to improve on this as time goes on.

1. In the `/public` folder, open the `/server` folder and subsequently, the `db.json` file you find in it. You can see that each slang is a JSON object of its own with a `definition` and `alternatives`.

2. To add a new abbreviation, you must append a new object to this file. 
    - The slang must be in lowercase. For example, `lgtm` not `LGTM`
    - The first letter of each word in the definition and alternatives must be uppercase. For example, `Looks Good To Me`

3. The Screenshot below could help
    ![Screenshot of db.json file in IDE with highlighted section](https://user-images.githubusercontent.com/81039882/193478231-1b0159e1-dd20-41d2-80cb-d82816d6f8bc.png)

    - The highlighted section is an example of the way you would add an abbreviation. 
    - Before you add a new object, end the one above with a comma. If not, there will be errors in your JSON. Your IDE should indicate this.

3. If a slang does not have alternatives, add only a `definition`

> Only English slangs are accepted as of yet.

:bomb: Now, GO CREATE THOSE ISSUES AND PULL REQUESTS!

# :key: License
This project is licensed with [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0).


If you like the [project](https://abbreve.vercel.app/), Don't forget to leave a star :star: . All support is highly appreciated :100:



