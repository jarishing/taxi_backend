const express = require('express'),
      debug   = require('debug')('Server'),
      passport      = require("passport"),
      errors  = require('server-api-errors');

const App = function(){
    
    passport.use(require('./utils/passport.local'));

    const app = express();
    
    /**
     * 
     * Base middleware
     * 
     */
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(require("helmet").noCache());
    // if ( process.env.NODE_ENV == "development")
        // app.use(require('morgan')('dev'));
    app.use(require('body-parser').json());
    app.use(require('body-parser').urlencoded({ extended: false }));
    app.use(require('cookie-parser')());
    app.use(require('cors')());

    /**
     * 
     * Mount Routes
     * 
     */
    app.use("/api", require('./index.route'));
    // Catch the 404 error and pass it to the error handler
    app.use( (req, res, next ) => {
        const error = new errors.NotFound();
        return next( error);
    });
    app.use(errors.catchError);

    return app;
}();

module.exports = App;