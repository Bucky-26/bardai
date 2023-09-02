document.addEventListener('DOMContentLoaded', function () {
    const messageInput = document.getElementById('message-input');
    const chatMessages = document.getElementById('chat-messages');
    const sendButton = document.getElementById('send-button');
    const apiEndpoint = 'https://sensui-useless-apis.codersensui.repl.co/api/tools/bard?question=';

    sendButton.addEventListener('click', function () {
        const messageText = messageInput.value.trim();
        if (messageText !== '') {
          
            displayMessage('You', messageText);

            
            fetch(apiEndpoint + encodeURIComponent(messageText))
                .then((response) => response.json())
                .then((data) => {
                  
                    displayMessage('AI', data.message);

                   
                    if (data.imageUrls && data.imageUrls.length > 0) {
                        data.imageUrls.forEach((imageUrl) => {
                           
                            displayImage(imageUrl);
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

            messageInput.value = '';
            messageInput.focus();
        }
    });

    messageInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });

    function displayMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function displayImage(imageUrl) {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        const imageLink = document.createElement('a');
        imageLink.href = imageUrl;
        imageLink.target = '_blank'; // Open in a new tab
        imageLink.rel = 'noopener noreferrer';

        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = 'AI Image';

        imageLink.appendChild(image);
        imageContainer.appendChild(imageLink);

        chatMessages.appendChild(imageContainer);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
