const buttons = document.querySelectorAll('.room-btn')

buttons.forEach(btn => {
    btn.addEventListener('click', async function(event) {
        event.preventDefault();
        const currentButton = btn;
        const roomID = parseInt(currentButton.getAttribute('id'))
        console.log(roomID);
        if (roomID) {
            // Send a POST request to the API endpoint
            const response = await fetch('/api/chatrooms/id', {
              method: 'POST',
              body: JSON.stringify({ id: roomID }),
              headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                document.location.replace(`/chatroom/${roomID}`);
            }
            return;
          }
    });
});