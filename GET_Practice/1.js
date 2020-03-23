const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000

app.use(bodyParser.json());

app.get('/', function(req, res){
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	hour = (hour < 10 ? "0" : "") + hour;
	var min = date.getMinutes();
	min = (min<10 ? "0": "") + min;
	var sec = date.getSeconds();
	sec = (sec<10 ? "0" : "") + sec;
	var ip = require("ip");
	const user = {
		name:req.query.name,
		color:req.query.color,
		city:req.query.city,
		email:"cbr5964@naver.com",
		stuno:"20171696",
		time:year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec,
		ip:ip.address()}
	res.send(user);
})
app.get('/:a/:b', function(req, res){
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	hour = (hour < 10 ? "0" : "") + hour;
	var min = date.getMinutes();
	min = (min<10 ? "0": "") + min;
	var sec = date.getSeconds();
	sec = (sec<10 ? "0" : "") + sec;
	var ip = require("ip");
	const user = {
		a:req.params.a,
		b:req.params.b,
		email:"cbr5964@naver.com",
		stuno:"20171696",
		time:year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec,
		ip:ip.address()}
	res.send(user);
})

app.listen(8000);
