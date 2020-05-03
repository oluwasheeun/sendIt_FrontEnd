const changeDestination = document.getElementById('change-destination');
const parcel = document.getElementById('parcel-id');
const newDestination = document.getElementById('new-destination');

async function newDestinations(e) {
    e.preventDefault();

    const parcelId = parcel.value;
    const destination = { destination: newDestination.value };

    try {
        const res = await fetch(
            `https://obscure-springs-34125.herokuapp.com/parcels/${parcelId}/destination`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },

                body: JSON.stringify(destination),
            }
        );

        const data = await res.json();

        if (data.success) {
            document.querySelector(
                '.form-box'
            ).innerHTML = `<h1 class="m-heading">Desination Succesfully Changed</h1>`;

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
    } catch (err) {
        alert(err.message);
    }
}

changeDestination.addEventListener('submit', newDestinations);

//Logout User
const logout = document.getElementById('logout');
logout.addEventListener('click', () => {
    localStorage.clear();

    window.location.href = '/FrontEnd_SendIT/login.html';
});
