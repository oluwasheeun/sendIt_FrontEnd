const registerForm = document.getElementById('register-form');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

const alertError = document.querySelector('.Error');

//Send Post to API to create User
async function createUser(e) {
    e.preventDefault();

    if (password.value !== confirmPassword.value) {
        return (alertError.innerHTML = `<p>Please input match password</p>`);
    }

    const sendBody = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phone: phone.value,
        password: password.value, 
    };

    try {
        const res = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendBody),
        });

        const data = await res.json();

        if (data.success) {
            //Store token in local storage
            localStorage.setItem('jwt', data.token);

            //Alert success & redirect to Dashboard
            alert('User Created');
            window.location.href = '/FrontEnd_SendIT/userProfile.html';
        } else {
            alertError.innerHTML = `<p>Email already exist!</p>`;
        }
    } catch (err) {
        alert(err.message);
        return;
    }
}

registerForm.addEventListener('submit', createUser);
