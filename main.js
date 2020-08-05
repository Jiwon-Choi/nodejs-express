// 5. MySQL로 상세보기 구현

const express = require('express'); // module 읽어오기
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const topicRouter = require('./routes/topic');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.get('*', function(request, response, next){
  // fs.readdir('./data', function (error, filelist) {
  //   request.list = filelist;
  //   next();
  // });

  fs.readFile('./data/todos.json', 'utf8', (error, jsonFile) => {
    if (error) return console.log(error);

    const jsonData = JSON.parse(jsonFile);
    request.list = jsonData;
    next();

    // jsonData.forEach(todo => {
    //   console.log(todo);
    // });
  });
})

app.use('/', indexRouter);
app.use('/topic', topicRouter);

app.use(function(req, res, next){
  res.status(404).send('Sorry can\'t find that!');
})

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
})

app.listen(3001, () => console.log('Example app listening on port 3001!'));
