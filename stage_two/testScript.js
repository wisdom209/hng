const axios = require('axios')
const baseUrl = 'http://localhost:4000/api'
const name = process.argv[2] || undefined
const updateName = process.argv[3] || undefined

let id;
const testCrud = async () => {
	if (!name || !updateName) {
		console.log('Usage: node testScript.js "name" "update name"')
		return;
	}


	/* CREATE A NEW USER */
	console.log("\n[*] Create a user...")
	await axios.post(baseUrl, { name }).then(result => {
		id = result.data.id;
		console.log(result.data, '\n')
	}).catch(error => {
		console.error(error)
		process.exit()
	})


	/* GET THE CREATED USER */
	console.log("[*] Get created user from database")
	await axios.get(`${baseUrl}/${id}`).then(result => {
		console.log(result.data, '\n')
	}).catch(error => {
		console.error(error.message)
		process.exit()
	})


	/* UPDATE THE CREATED USER */
	console.log("[*] Update the created user")
	await axios.put(`${baseUrl}/${id}`, { name: updateName }).then(result => {
		console.log(result.data, '\n')
	}).catch(error => {
		console.error(error.message)
		process.exit()
	})


	/* GET THE UPDATED USER */
	console.log("[*] Get updated user from database")
	await axios.get(`${baseUrl}/${id}`).then(result => {
		console.log(result.data, '\n')
	}).catch(error => {
		console.error(error.message)
		process.exit()
	})


	/* DELETE THE UPDATED USER */
	console.log("[*] Delete created user from database")
	await axios.delete(`${baseUrl}/${id}`).then(result => {
		console.log(result.data, '\n')
	}).catch(error => {
		console.error(error.message)
		//process.exit()
	})


	/* TRY TO RETRIEVE THE DELETED USER */
	console.log("[*] Getting deleted user from database for confirmation")
	await axios.get(`${baseUrl}/${id}`).then(result => {
		console.log(result.data)
	}).catch(error => {
		console.error(error.response.data)
		process.exit()
	})
}

testCrud()
