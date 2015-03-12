![Graffiti Logo](https://s3.amazonaws.com/graffiti-storage/logo.svg)
> A context-centric, collaborative annotation engine in your browser. Just install the [Chrome Extension](https://s3.amazonaws.com/graffiti-storage/alpha.zip) and start highlighting text to comment on.
> Built with React+Flux, Mongo, Node, and the Chrome extension API.
> You can join and post under different groups, and choose which group's tags are visible in the browser dropdown. Since it's still in beta, we're limiting groups to Reddit, Hackernews, 30Weeks, and Fullstack.

## Table of Contents

- Installation and Usage
- Roadmap
- Contributors

### Screenshot

#### Right Click and select `See Tags` to view a page's tags.
![Graffiti 1](https://s3.amazonaws.com/graffiti-storage/context.png)
#### Hovering near the sidebar highlights embedded tags.
![Graffiti 1](https://s3.amazonaws.com/graffiti-storage/1.png)
#### Clicking on a tab brings out its comments.
![Graffiti 2](https://s3.amazonaws.com/graffiti-storage/2.png)
#### If you start highlighting text, a form will pop out for you to create your tag
![Graffiti 3](https://s3.amazonaws.com/graffiti-storage/3.png)
![Graffiti 4](https://s3.amazonaws.com/graffiti-storage/4.png)
#### See what pages other people in your groups are commenting on.
![Graffiti 1](https://s3.amazonaws.com/graffiti-storage/feed.png)
#### Sort by specific groups tags when you go to a page.
![Graffiti 1](https://s3.amazonaws.com/graffiti-storage/groups.png)
#### Join new groups.
![Graffiti 1](https://s3.amazonaws.com/graffiti-storage/profile.png)

_Above: An example of the working app_


## Installation and Usage

1.  Download and unzip the alpha build from [here](https://graffiti.herokuapp.com)

2.	Go to `chrome://extensions/` in your browser, and drag the folder into the list.

3. To view tags on a given page, just right click and click the `See Tags` option.

3. Graffiti works everywhere there's a `p` tag. Try going to Techcrunch or the New York times and highlighting text.

4. You can change your username from [our Heroku app](https://graffiti.herokuapp.com)

5.	You can also join, filter by, and post to separate groups from the browser dropdown.


### Roadmap

#### Features

-	React apps communicating through a Chrome background process.
-	Material UI
-	HTML and Special characters recognized in highlight

#### Known bugs

- $ signs, (), [], and {} characters are to be treated with extreme predjudice in your highlight.
- Sites that use a frontend framework like Angular, Backbone, Brisket, or React aren't 100% reliable to tag on yet.

## Contributors
* __Sam McCord__ - Project Lead and Engineer [LinkedIn](www.linkedin.com/in/samuelmccord/en) | [GitHub](https://github.com/sammccord)
* __James Cazzoli__ - Product Design Engineer [LinkedIn](www.linkedin.com/pub/james-cazzoli/47/b7b/2b6/en)
