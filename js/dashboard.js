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
  //   const ordersCanceled = document.querySelector('.order-details .no4');

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
        document.querySelector('.createOrder').classList.add('no-display');
        // document
        //     .querySelector('.cancelOrder')
        //     .classList.add('no-display');
        // document
        //     .querySelector('.changeDestination')
        //     .classList.add('no-display');

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
        document;
        //     .querySelector('.updateStatus')
        //     .classList.add('no-display');
        // document
        //     .querySelector('.updateLocation')
        //     .classList.add('no-display');

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
        orders.innerHTML += `<tr><td class="no-display">${i._id}</td><td>${i.description}</td><td>${i.pickupLocation}</td><td>${i.destination}</td><td>${i.recipientName}</td><td>${i.phone}</td><td>${i.presentLocation}</td><td>${i.status}</td>
                <td><i class="fas fa-edit editOrder"></i></td><td><i class="far fa-trash-alt deleteOrder"></i></td></tr>`;
      });

      numberOfOrders.textContent = data.length;
      ordersInTransit.textContent = data.filter(
        (i) => i.status === 'In-Transit'
      ).length;
      ordersDelivered.textContent = data.filter(
        (i) => i.status === 'Delivered'
      ).length;
      //   ordersCanceled.textContent = data.filter(
      //     (i) => i.status === 'Cancelled'
      //   ).length;

      //Delete Order
      document
        .querySelector('.list-orders')
        .addEventListener('click', function (e) {
          if (e.target.classList.contains('deleteOrder')) {
            const parcelId =
              e.target.parentElement.parentElement.firstChild.textContent;
            cancel(parcelId);
            e.target.parentElement.parentElement.remove();
          }
        });
    });

    welcome.textContent = localStorage.getItem('firstName');
  }

  getMe();

  //Change Destination
  const changeDestination = document.getElementById('change-destination');
  const newDestination = document.getElementById('new-destination');
  changeDestination.addEventListener('submit', newDestinations);

  //Update Current Location
  const updateLocation = document.getElementById('update-location');
  const newLocation = document.getElementById('new-location');
  updateLocation.addEventListener('submit', Location);

  //Update Current Status
  const updateStatus = document.getElementById('update-status');
  const newStatus = document.getElementById('new-status');
  updateStatus.addEventListener('submit', status);

  //Change Destination
  async function newDestinations(e) {
    e.preventDefault();

    const orderId = localStorage.getItem('parcelId');
    const destination = { destination: newDestination.value };

    try {
      const res = await fetch(
        `https://obscure-springs-34125.herokuapp.com/parcels/${orderId}/destination`,
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
          '.destination'
        ).innerHTML = `<h1 class="s-heading">Desination Succesfully Changed</h1>`;

        setTimeout(() => (window.location.href = './userProfile.html'), 2000);
      } else {
        document.querySelector(
          '.destination'
        ).innerHTML = `<h1 class="s-heading">Order Not Found</h1>`;

        setTimeout(() => location.reload(), 2000);
      }
    } catch (err) {
      alert(err.message);
    }
  }

  //Update Current Location
  async function Location(e) {
    e.preventDefault();

    const orderId = localStorage.getItem('parcelId');
    const presentLocation = { presentLocation: newLocation.value };

    try {
      const res = await fetch(
        `https://obscure-springs-34125.herokuapp.com/parcels/${orderId}/presentLocation`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
          body: JSON.stringify(presentLocation),
        }
      );

      const data = await res.json();

      if (data.success) {
        document.querySelector(
          '.location'
        ).innerHTML = `<h1 class="s-heading">Location Updated</h1>`;

        setTimeout(() => (window.location.href = './userProfile.html'), 2000);
      } else {
        document.querySelector(
          '.location'
        ).innerHTML = `<h1 class="s-heading">Unsuccessful. Try Again..</h1>`;

        setTimeout(() => location.reload(), 2000);
      }
    } catch (err) {
      alert(err.message);
    }
  }

  //Update Current Status
  async function status(e) {
    e.preventDefault();

    const orderId = localStorage.getItem('parcelId');
    const status = { status: newStatus.value };

    try {
      const res = await fetch(
        `https://obscure-springs-34125.herokuapp.com/parcels/${orderId}/status`,
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
          '.u-status'
        ).innerHTML = `<h1 class="s-heading">Status Updated</h1>`;

        setTimeout(() => (window.location.href = './userProfile.html'), 2000);
      } else {
        document.querySelector(
          '.u-status'
        ).innerHTML = `<h1 class="s-heading">Unsuccessful. Try Again..</h1>`;

        setTimeout(() => location.reload(), 2000);
      }
    } catch (err) {
      alert(err.message);
    }
  }

  //Cancel Order API Call
  async function cancel(parcelId) {
    try {
      const res = await fetch(
        `https://obscure-springs-34125.herokuapp.com/parcels/${parcelId}/cancel`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      window.location.reload();
    } catch (err) {}
  }

  //Edit Modal
  // const editbtn = document.querySelector('.')
  const modal = document.querySelector('.modal');
  const destinationModal = document.querySelector('.destination');
  const locationModal = document.querySelector('.location');
  const statusModal = document.querySelector('.u-status');
  // Open modal
  document
    .querySelector('.list-orders')
    .addEventListener('click', function (e) {
      if (e.target.classList.contains('editOrder')) {
        modal.style.display = 'block';
        const parcelId =
          e.target.parentElement.parentElement.firstChild.textContent;
        //Store ParcelID to local storage
        localStorage.setItem('parcelId', parcelId);

        if (localStorage.getItem('role') === 'admin') {
          destinationModal.style.display = 'none';
        } else if (localStorage.getItem('role') === 'user') {
          locationModal.style.display = 'none';
          statusModal.style.display = 'none';
        }
      }
    });
  // Close Modal
  document.querySelector('.close-btn').onclick = function () {
    localStorage.removeItem('parcelId');
    modal.style.display = 'none';
  };
  document.querySelector('.close-btn-2').onclick = function () {
    localStorage.removeItem('parcelId');
    modal.style.display = 'none';
  };
  window.onclick = function (e) {
    if (e.target == modal) {
      localStorage.removeItem('parcelId');
      modal.style.display = 'none';
    }
  };

  //Logout User
  const logout = document.getElementById('logout');
  logout.addEventListener('click', () => {
    localStorage.clear();

    window.location.href = './login.html';
  });
}
