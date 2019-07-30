fetchUsers().then(data => {
    users = data;
    renderUsers();
  });

const act = {
    del: 
        (id) => {
            deleteUserAsync(id);
    },
    edit: 
        (newUser) => {
            editUserAsync(newUser);
    }
}

function renderUsers() {
    users.forEach((user) => {
        new User({
                data: user,
                actions: act,
                className: 'user',
                root: 'users',
                autoAttach: true
            });
    });
}

addNewUser ();
function addNewUser () {
    const form = document.getElementById("form");

    form.addEventListener('submit', addUser);

    function addUser (ev) {
        ev.preventDefault();
        const values = ev.target.getElementsByTagName('input');

        if (values[0].value && values[1].value) {
            const newUserData = {
                id: 0,
                name: values[0].value,
                age: values[1].value
            }

            new User({
                data: newUserData,
                actions: act,
                className: 'user',
                root: 'users',
                autoAttach: true
            });

            createUserAsync(newUserData);

        } else {
            alert('All inputs must be filled');
        }
    }

}