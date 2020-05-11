//Check if signed In
if (localStorage.getItem('jwt')) {
    window.location.href = './userProfile.html';
} else {
    const signin = document.getElementById('login-form');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    const alertError = document.querySelector('.Error');

    async function login(e) {
        e.preventDefault();

        const sendBody = {
            email: email.value,
            password: password.value,
        };

        try {
            const res = await fetch(
                'https://obscure-springs-34125.herokuapp.com/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify(sendBody),
                }
            );

            const data = await res.json();

            if (data.success) {
                //Store token in local storage
                localStorage.setItem('jwt', data.token);

                //Alert success & redirect to Dashboard
                document.querySelector(
                    '.form-box'
                ).innerHTML = `<h1 class="m-heading">Loading Profile.......</h1>`;

                setTimeout(
                    () => (window.location.href = './userProfile.html'),
                    2000
                );
            } else {
                alertError.innerHTML = `<p>${data.message}</p>`;
            }
        } catch (err) {
            alert(err.message);
            return;
        }
    }

    signin.addEventListener('submit', login);
}
