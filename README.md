# Read Up

## Find the best articles on code.

We’re constantly getting great technical articles sent to us from developer friends. Via e-mail. Read Up stops the madness and aggregates them so we can all find the best stuff and Read Up on a given topic. Stack Overflow is magical for specific questions. Google is great for finding docs. But neither is great for finding those hidden blog post gems or great tutorials. Read Up fills that gap.

Read Up is built by developers, for developers. It’s open source, and we welcome contributions to improve the site.

## Contributing
  We love contributions, so here's simple steps to get you started.

  1.) Fork the repo.

  2.) Run `git clone https://github.com/YOUR_USER_NAME/readup.git` at the terminal to make a local copy. You can get the correct git address by copying the https address listed just below the settings of your newly forked repo.

  3.) Follow the build instructions (below), make changes, push back to your master and then make a pull request

**Build Instructions**

  After you've cloned a local copy and are in that directory...

  1.) `npm install` . This will take a hot second

  2.) `source serverStart.sh`

  Then navigate to `localhost:3000` in your browser, and you should see Read Up in all it's glory.
  You're now working with our **development database and API keys**. All functionality should be normal, but the amount of articles will be less.

  Anytime you want to come back and work on Read Up, **you will need to do step 2 again**.




#### Technology:
   Read Up is deployed on AWS, using EC2 for the server, RDS for MySQL cloud hosting, and S3 handles static image file hosting.

- **SQL** - While not the typical choice for a node app, it was clear that with all the relationships among our data, SQL was our best bet. We use Sequelize as our ORM.
- **Node/Express** - The advantages of single language app development and asynchronous I/O helped win the day for node.
- **AngularJS** -  Two-way data binding.
- **Stylus** - The variables, mixins, and import abilities let us write clean, responsive and modular CSS that was easy to iterate on.
- **Browserify** - Modularized code is clean code, and Browserify brings that to the front end by mimicking node’s require syntax.
- **Grunt** - With only a 2.5 week development sprint, Grunt saved us precious time by automating our compilation, build and watch tasks.
- **Karma** - Karma opens up instances of Chrome to automate Angular end-to-end testing.

#### About Us:
We built [Read Up](http://www.readup.co) at [Hack Reactor](http://hackreactor.com/). Many thanks to the community there for all the support.

**Blake West:**
[GitHub](https://github.com/bwest87) | [LinkedIn](http://www.linkedin.com/in/blakewest87) | [Website](http://sympatheticvibration.com/)

**Brett Hoyer:**
[GitHub](https://github.com/BrettHoyer) | [LinkedIn](http://www.linkedin.com/in/bretthoyer) | [Website](http://thehoyer.com/)

**Doug Kong:**
[GitHub](https://github.com/DougKong) | [LinkedIn](http://www.linkedin.com/in/dougkong) | [Website](http://dougkong.com/)

**Jess MacQueen:**
[GitHub](https://github.com/macqueen) | [LinkedIn](http://www.linkedin.com/in/jessmacqueen) | [Website](http://jessmacqueen.com/)

Huge thanks to [Mike Sall](http://sall.co/) for his contributions to the beautiful design of ReadUp, and for initiating the idea.
