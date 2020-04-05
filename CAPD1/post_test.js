const request = require('request')

request.post('http://ec2-3-87-72-38.compute-1.amazonaws.com:8000/', {
	json: {
		name:'kim kyuho',
		age:30
	}
},
	(error,re,body)=>{
		if(error){
			console.error(error)
			return
		}
		console.log(body)}
)
