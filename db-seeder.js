const fs = require('fs')
const faker = require('faker')
const axios = require('axios')

const labels = ['mobile', 'work', 'home', 'main', 'work-fax', 'home-fax', 'pager', 'other']
const url = 'http://localhost:3000/contacts'
const cleanContacts = JSON.stringify({contacts:[]}, null, 2)
let contacts = []
let amount = 30

fs.writeFile('./db.json', cleanContacts, (err) => {
	if (err) throw err

	while (amount > 0) {
		contacts.push(factory())
		amount--
	}

	for (let contact of contacts) {
		axios.post(url, contact)
			.then(response => console.log(response.data))
			.catch(error => console.log(error.status))
	}
})

function factory() {
	return {
		id: "",
		name_prefix: faker.helpers.randomize([ '', faker.name.prefix() ]),
		first_name: faker.name.firstName(),
		last_name: faker.name.lastName(),
		name_suffix: "",
		company: faker.company.companyName(),
		email: faker.internet.email(),
		phone: faker.phone.phoneNumber('(###)###-####'),
		phone_label: faker.helpers.randomize(labels),
		avatar_url: faker.internet.avatar()
	}
}
