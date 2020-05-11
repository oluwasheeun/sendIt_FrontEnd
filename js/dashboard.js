//Check if signed In
if (localStorage.getItem('jwt') === null) {
    window.location.href = './login.html';
} else {
    const orders = document.querySelector('.list-orders');
    const welcome = document.querySelector('.welcome-name');

    //Target Order details
    const numberOfOrders = document.querySelector('.order-details .no1');
    const ordersInTransit = document.querySelector('.order-details .no2');
    const ordersDelivered = document.querySelector('.order-details .no3');
    const ordersCanceled = document.querySelector('.order-details .no4');

    //Get token from local storage
    const token = localStorage.getItem('jwt');

    //Get logged-In User details
    async function getMe() {
        try {
            const res = await fetch(
                'https://obscure-springs-34125.herokuapp.com/auth/me',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await res.json();

            //Save User details to Local Storage
            localStorage.setItem('userId', data.data._id);
            localStorage.setItem('firstName', data.data.firstName);
            localStorage.setItem('lastName', data.data.lastName);
            localStorage.setItem('role', data.data.role);
        } catch (err) {}

        //Load Orders
        async function getOrders() {
            const userId = localStorage.getItem('userId');
            const userRole = localStorage.getItem('role');

            if (userRole === 'admin') {
                document
                    .querySelector('.createOrder')
                    .classList.add('no-display');
                document
                    .querySelector('.cancelOrder')
                    .classList.add('no-display');
                document
                    .querySelector('.changeDestination')
                    .classList.add('no-display');

                //fetch all orders for admin
                try {
                    const res = await fetch(
                        'https://obscure-springs-34125.herokuapp.com/parcels',
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    const data = await res.json();

                    return data.data;
                } catch (err) {
                    console.log(err.message);
                }
            } else {
                document
                    .querySelector('.updateStatus')
                    .classList.add('no-display');
                document
                    .querySelector('.updateLocation')
                    .classList.add('no-display');

                try {
                    const res = await fetch(
                        `https://obscure-springs-34125.herokuapp.com/users/${userId}/parcels`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    const data = await res.json();

                    return data.data;
                } catch (err) {
                    console.log(err.message);
                }
            }
        }

        getOrders().then((data) => {
            data.map((i) => {
                orders.innerHTML += `<tr><td>${i._id}</td><td>${i.pickupLocation}</td><td>${i.destination}</td><td>${i.recipientName}</td><td>${i.phone}</td><td>${i.presentLocation}</td><td>${i.status}</td></tr>`;
            });

            numberOfOrders.textContent = data.length;
            ordersInTransit.textContent = data.filter(
                (i) => i.status === 'In-Transit'
            ).length;
            ordersDelivered.textContent = data.filter(
                (i) => i.status === 'Delivered'
            ).length;
            ordersCanceled.textContent = data.filter(
                (i) => i.status === 'Cancelled'
            ).length;
        });

        welcome.textContent = localStorage.getItem('firstName');
    }

    getMe();

    //Logout User
    const logout = document.getElementById('logout');
    logout.addEventListener('click', () => {
        localStorage.clear();

        window.location.href = './login.html';
    });
}

// //Decode JWT
// function parseJwt(token) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(
//         atob(base64)
//             .split('')
//             .map(function (c) {
//                 return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//             })
//             .join('')
//     );

//     return JSON.parse(jsonPayload);
// }
