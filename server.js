const express = require('express');

const app = express()

app.use(express.json());

let users = [];

// POST creates a user *************************************** Kim Buck 2020
function createUser(data) {
	const payload = {
		id: String(users.length + 1),
		...data
	};

	users.push(payload);
	return payload;
}

app.post('/api/users', (req, res) => {
	if (!req.body.name) {
		return res.status(400).json({
			message: 'Please enter name for new user'
		});
	}
	const newUser = createUser({
		name: req.body.name
	});

	res.status(201).json(newUser);
});

// GET: returns an array users *************************************** Kim Buck 2020
function getUsers() {
	return users;
}

app.get('/api/users', (req, res) => {
	const users = getUsers();
	res.json(users);
});

//GET: return user with :id *************************************** Kim Buck 2020
function getUserById(id) {
	return users.find((u) => u.id === id);
}
app.get("/api/users/:id", (req,res) => {
    const user = getUserById(req.params.id);

	if (user) {
		res.json(user);
	} else {
		res.status(404).json({
			message: 'User not found'
		});
	}
})

//DELETE: removes user with id and return the deleted user
function deleteUser(id) {
    const user = users.find((u) => u.id === id)
    users = users.filter((u) => u.id !== id)
    return user
}

app.delete("/api/users/:id", (req,res) => {

	const user = deleteUser(req.params.id);

	if (user) {
		res.json(user);
	} else {
		res.status(404).json({
			message: 'User not found'
		});
	}
})

//PUT: Updates the user with the specified `id` using data from the `request body`. Returns the modified us
function updateUser(id, data) {
	const index = users.findIndex((u) => u.id === id);
	users[index] = {
		...users[index],
		...data
	};

	return users[index];
}

app.put("/api/users/:id", (req,res) => {
    const user = getUserById(req.params.id)

    if (user) {
        const updatedUser = updateUser(user.id, {
            name: req.body.name || user.name,
        })

        res.json(updatedUser)
    } else {
        res.status(404).json({
            message: "user not found"
        })
    }
})

//put app listening at 4040
app.listen(4040)