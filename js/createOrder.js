//Check if signed In
if (localStorage.getItem('jwt') === null) {
    window.location.href = './login.html';
} else {
    const createOrderForm = document.getElementById('create-order-form');
    const pickupLocation = document.getElementById('pickup-location');
    const destination = document.getElementById('destination');
    const recipientName = document.getElementById('recipient-name');
    const recipientPhone = document.getElementById('recipient-phone');

    async function createOrder(e) {
        e.preventDefault();

        const Order = {
            pickupLocation: pickupLocation.value,
            destination: destination.value,
            recipientName: recipientName.value,
            phone: recipientPhone.value,
        };

        const token = localStorage.getItem('jwt');

        try {
            const res = await fetch(
                'https://obscure-springs-34125.herokuapp.com/parcels',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(Order),
                }
            );

            const data = await res.json();

            if (data.success) {
                document.querySelector(
                    '.form-box'
                ).innerHTML = `<h1 class="m-heading">Order Created!</h1>`;

                setTimeout(
                    () => (window.location.href = './userProfile.html'),
                    2000
                );
            }
        } catch (err) {
            return err.message;
        }
    }
    createOrderForm.addEventListener('submit', createOrder);

    //Logout User
    const logout = document.getElementById('logout');
    logout.addEventListener('click', () => {
        localStorage.clear();

        window.location.href = './login.html';
    });
}
