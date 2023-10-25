const express = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')
const fs = require('fs')
const app = express()
const port = 9000

app.use(fileUpload()) //File feltöltés
app.use(express.json()) //JSON feltöltés

app.get('/', (req, res) => {
	res.sendFile(path.join(`${__dirname}/../frontend/index.html`))
})

app.use('/public', express.static(`${__dirname}/../frontend/public`))

app.use('/public', express.static(`${__dirname}/../frontend/public/img`))

app.get('/data', (req, res) => {
  res.sendFile(path.join(`${__dirname}/data/data.json`))
})

app.get('/data/:id', (req, res) => {
	console.log(req.params.id)
	try{
		const searchId = parseInt(req.params.id)
		if(isNaN(searchId)){
			res.status(418).send('NaN')
		}
		else {
			fs.readFile('data/data.json', (err, data) => {
				if(err){
					console.log(err)
					res.send(err)
				}
				else{
					const fileData = JSON.parse(data)
					let result = null
					fileData.forEach(element => {
						if(element.id === searchId){
							result = element
							console.log(result)
						}
					})
					if(result === null){
						res.status(404).send('Nincs ilyen adat')
					}
					else{
						res.send(result)
					}
				}
			})
		}
	}
	catch(err){
		console.log(err)
		res.send('Error')
	}
})

app.post('/picked', (req, res) => {
	fs.readFile('data/picked.json', (err, data) => {
		if(err){
			res.send('Olvasási hiba történt')
		}
		else {
			const userData = JSON.parse(data)
			const lastId = userData[userData.length-1].id

			userData.push({id: lastId+1, ...req.body})


			fs.writeFile(`${__dirname}/data/picked.json`, JSON.stringify(userData, null, 4), error => {
				if(error){
					res.send("Error van")
				} else {
					res.send(req.body)
				}
			})
		}
	})
})

app.listen(port, () => {
	console.log(`http://127.0.0.1:${port}`)
})