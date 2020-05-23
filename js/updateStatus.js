//Check if signed In
if (localStorage.getItem('jwt') === null) {
  window.location.href = './login.html';
} else {
  const updateStatus = document.getElementById('update-status');
  const parcel = document.getElementById('parcel-id');
  const newStatus = document.getElementById('new-status');

  updateStatus.addEventListener('submit', status);

  async function status(e) {
    e.preventDefault();

    const parcelId = parcel.value;
    const status = { status: newStatus.value };

    try {
      const res = await fetch(
        `https://obscure-springs-34125.herokuapp.com/parcels/${parcelId}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
          body: JSON.stringify(status),
        }
      );

      const data = await res.json();

      if (data.success) {
        document.querySelector(
          '.form-box'
        ).innerHTML = `<h1 class="m-heading">Status Updated</h1>`;

        setTimeout(() => (window.location.href = '.userProfile.html'), 2000);
      } else {
        document.querySelector(
          '.form-box'
        ).innerHTML = `<h1 class="m-heading">Unsuccessful. Try Again..</h1>`;

        setTimeout(() => location.reload(), 2000);
      }
    } catch (err) {
      alert(err.message);
    }
  }
  //Logout User
  document.getElementById('logout').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = './login.html';
  });
}
