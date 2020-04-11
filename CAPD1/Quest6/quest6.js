const request = require("request")
var express = require('express');
var app = express();
fs = require('fs');
app.use(express.json())
require('date-utils')

mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'byeori',
    password: 'password',
    database: 'test'
})
connection.connect();

obj = {};

function insert_sensor() {
    var query = connection.query('insert into arduino set ?', obj, function(err, rows, cols) {
    if (err) throw err;
    console.log("database insertion ok= %j", obj);
  });
}

app.get('/insert/', function(req, res){
	r = req.query;
	obj.device = r.device_id;
	obj.value = r.value;
	insert_sensor();
	res.end();
})

app.get('/graph', function (req, res) {
    console.log('got app.get(graph)');
    var html = fs.readFile('./arduino_test.html', function (err, html) {
    html = " "+ html
    console.log('read file');

    var qstr = 'select value, device, (unix_timestamp(time)*1000) as time from arduino ';
    connection.query(qstr, function(err, rows, cols) {
      if (err) throw err;

      var data = "";
      var comma = ""
      for (var i=0; i< rows.length; i++) {
         r = rows[i];
         data += comma + "[new Date("+r.time+"),"+ r.value+"]";
         comma = ",";
      }
      var header = "data.addColumn('datetime', 'Date');";
      header += "data.addColumn('number', 'Temperature')";
      html = html.replace("<%HEADER%>", header);
      html = html.replace("<%DATA%>", data);

      res.writeHeader(200, {"Content-Type": "text/html"});
      res.write(html);
      res.end();
    });
  });
})

app.get('/get_data', function(req, res){

	param = req.query;
	dev_id = param.device_id
	var qstr;
	if(dev_id == '' || dev_id == null){
		qstr = 'select * from arduino where time >= NOW() - interval 1 day order by no desc'
	}
	else
		qstr = 'select * from arduino where device = '+dev_id+' and time >= NOW() - interval 1 day order by no desc'
	var data = new Object();
	connection.query(qstr, function(err, rows, cols){
		if(err) throw err;
		for (var i=0; i<rows.length; i++){
			r = rows[i];
			temp = new Object();
			temp.sequence= r.no;
			temp.device_id = r.device;
			temp.value = r.value;
			temp.status = r.status;
			temp.time = (new Date(r.time)).toFormat("YYYY-MM-DD HH24:MI");
			data[i] = temp
		}
		res.send(JSON.stringify(data))
	})
})

var server = app.listen(8085, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('listening at http://%s:%s', host, port)
});

