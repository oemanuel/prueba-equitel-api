'use strict'

const mongosse = require("mongoose");
const app = require('./app');
const port = 3999;

mongosse.Promise = global.Promise;
mongosse.connect('mongodb://localhost:27017/prueba_equitel', { useNewUrlParser: true })
.then(()=>{
    console.log("DB conected");
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
      });
})
.catch(()=>{
    console.log("DB failed");
});