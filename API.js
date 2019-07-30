const MAIN_URL = "https://test-users-api.herokuapp.com";

// Fetch
async function fetchUsers() {
    const response = await fetch(
        `${MAIN_URL}/users`,
        {
            method:  'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

    const { data: users } = await response.json();

    return users;
};

async function deleteUserAsync(id) {
    await fetch(
        `${MAIN_URL}/users/${id}`,
        {
        method:  'DELETE',
        });
};

async function createUserAsync(newUser) {
    const response = await fetch(
        `${MAIN_URL}/users/`,
        {
        method:  'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    });

    const { data: user } = await response.json();

    return newUser;
};

async function editUserAsync(userData) {
    const response = await fetch(
        `${MAIN_URL}/users/${userData.id}`,
        {
        method:  'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const { data: newUserData } = await response.json();

    return newUserData;
};


// Axios
// const api = axios.create({
//     mainURL: MAIN_URL
//   });