const cancelOrder = document.getElementById('cancel-order');
const parcel = document.getElementById('parcel-id');

async function cancel(e) {
    e.preventDefault();

    const parcelId = parcel.value;

    try {
        const res = await fetch(
            `https://obscure-springs-34125.herokuapp.com/parcels/${parcelId}/cancel`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            }
        );

        const data = await res.json();

        if (data.success) {
            document.querySelector(
                '.form-box'
            ).innerHTML = `<h1 class="m-heading">Order Cancelled.</h1>`;

            setTimeout(
                () =>
                    (window.location.href =
                        '/FrontEnd_SendIT/userProfile.html'),
                2000
            );
        } else {
            document.querySelector(
                '.form-box'
            ).innerHTML = `<h1 class="m-heading">Parcel Not Found</h1>`;

            setTimeout(() => location.reload(), 2000);
        }
    } catch (err) {}
}

cancelOrder.addEventListener('submit', cancel);

//Logout User
const logout = document.getElementById('logout');
logout.addEventListener('click', () => {
    localStorage.clear();

    window.location.href = '/FrontEnd_SendIT/login.html';
});
