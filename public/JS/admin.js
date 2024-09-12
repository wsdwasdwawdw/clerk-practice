document.addEventListener('DOMContentLoaded', event => {
    const db = firebase.firestore();
  
    function fetchUsers() {
      db.collection('users').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            const user = doc.data();
            displayUser(user);
          });
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    }
  
    function displayUser(user) {
      const userList = document.getElementById('user-list');
      const listItem = document.createElement('li');
      listItem.textContent = `UID: ${user.uid}, Email: ${user.email}`;
      userList.appendChild(listItem);
    }
  
    fetchUsers();
  });