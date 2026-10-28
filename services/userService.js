const users = [
    {id: 1, name: "Alice", email: "alice@gmail.com", role: "user"},
    {id: 2, name: "Bob", email: "bob@gmail.com", role: "user"},
    {id: 3, name: "Pankaj", email: "pankaj@gmail.com", role: "admin"},
    {id: 4, name: "Aman", email: "aman@gmail.com", role: "user"}
]

function getAllUsers(){
    return users;
}

function findUserById(id){
    return users.find(user => user.id === id);
}

function findUserByRole(role){
    return users.filter(user => user.role === role);
}


function findUserByName(name) {
    if (typeof name !== "string") {
        return [];
    }

    return users.filter(user =>
        user.name.toLowerCase().includes(name.toLowerCase())
    );
}


function createUser(name, email, role){
    const maxId = Math.max(0, ...users.map(user => user.id));
    const newId = maxId + 1;
    const newUser = {
        id: newId,
        name: name,
        email: email,
        role: role
    }
    users.push(newUser);
    return newUser;
}

function updateUser(id, name, email, role){
    const user = users.find(user => user.id === id);

    if(!user){
        return null;
    }

    user.name = name;
    user.email = email;
    user.role = role;

    return user;
}

function patchUser(id, updates){
    const user = users.find(user=>user.id === id);

    if(!user){
        return null;
    }

    if(updates.name !== undefined){
        user.name = updates.name;
    }

    if(updates.email!== undefined){
        user.email = updates.email;
    }

    if(updates.role !== undefined){
        user.role = updates.role;
    }

    return user;
}

function deleteUser(id){
    const index = users.findIndex(user => user.id === id);

    if(index === -1){
        return null;
    }

    const deletedUser = users.splice(index,1);

    return deletedUser[0];
}

module.exports = {
    getAllUsers,
    findUserById,
    createUser,
    updateUser,
    patchUser,
    deleteUser,
    findUserByRole,
    findUserByName
};