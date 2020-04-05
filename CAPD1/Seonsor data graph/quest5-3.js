const request = require("request")
var express = require('express');
var app = express();
fs = require('fs');

mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'byeori',
    password: 'password',
    database: 'test'
})
connection.connect();

function insert_sensor() {
const url = 'https://api.darksky.net/forecast/6048e3272f1fdaf7bd2dd947b0c491eb/37.5642135,127.0016?units=si'

request({ url: url, json:true}, (error, response) =>{
	
	console.log(response.body.currently.temperature);
	
	obj = {};
  obj.temp = response.body.currently.temperature;
  
    var query = connection.query('insert into temp_test set ?', obj, function(err, rows, cols) {
    if (err) throw err;
    console.log("database insertion ok= %j", obj);
  });
})
}

setInterval(insert_sensor,600000);

app.get('/graph', function (req, res) {
    console.log('got app.get(graph)');
    var html = fs.readFile('./test.html', function (err, html) {
    html = " "+ html
    console.log('read file');

    var qstr = 'select temp, (unix_timestamp(time)*1000) as time from temp_test ';
    connection.query(qstr, function(err, rows, cols) {
      if (err) throw err;

      var data = "";
      var comma = ""
      for (var i=0; i< rows.length; i++) {
         r = rows[i];
         data += comma + "[new Date("+r.time+"),"+ r.temp +"]";
         comma = ",";
      }
      var header = "data.addColumn('datetime', 'Date');";
      header += "data.addColumn('number', 'Temperature');"
      html = html.replace("<%HEADER%>", header);
      html = html.replace("<%DATA%>", data);

      res.writeHeader(200, {"Content-Type": "text/html"});
      res.write(html);
      res.end();
    });
  });
})

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('listening at http://%s:%s', host, port)
});

