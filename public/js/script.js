document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Formun varsayılan submit davranışını engelle

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    fetch('/sendMMS', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, email: email, phone: phone })
    })
    .then(response => {
        if (!response.ok) {
            // Eğer response.ok false ise hata fırlat
            return response.json().then(errorData => {
                throw new Error(JSON.stringify(errorData));
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            document.getElementById('response').textContent = 'Error: ' + data.error;
            console.error('Error Details:', data.details); // Hata detaylarını konsola yazdır
        } else {
            document.getElementById('response').textContent = 'Success: ' + data.message;
        }
    })
    .catch((error) => {
        // JSON parse hatalarını da yakalayarak yönet
        let errorMessage;
        try {
            errorMessage = JSON.parse(error.message);
        } catch (e) {
            errorMessage = error.message;
        }
        document.getElementById('response').textContent = 'Fetch Error: ' + errorMessage;
        console.error('Fetch Error:', errorMessage);
    });
});
