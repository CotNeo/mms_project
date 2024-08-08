// Gerekli kütüphaneleri yükleme
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

// Twilio hesap bilgileri (Twilio konsolundan alınır)
const accountSid = 'AC2b81f250d3d3472ac0cc67df79867a58'; // Doğru SID'i buraya yapıştırın
const authToken = '492e09aa0311b3e4107b994fb78ba1b7'; // Doğru Auth Token'ı buraya yapıştırın
const client = new twilio(accountSid, authToken);

// Express uygulaması oluşturma
const app = express();
const port = 3000;

// Gelen JSON verilerini işlemek için body-parser kullanma
app.use(bodyParser.json());

// Statik dosyaları sunmak için 'public' klasörünü kullanma
app.use(express.static('public'));

// GET isteği için basit bir hata yanıtı
app.get('/sendMMS', (req, res) => {
    res.status(405).send('GET isteği bu rota için desteklenmiyor. Lütfen POST isteği gönderin.');
});

// MMS gönderme için POST isteğini işleme
app.post('/sendMMS', (req, res) => {
    // İstek gövdesinden verileri çıkarma
    const { name, email, phone } = req.body;
    const message = `Name: ${name}, Email: ${email}`;

    // Hata ayıklama mesajı ekleme
    console.log('Received POST request to /sendMMS');
    console.log(`Request Body: ${JSON.stringify(req.body)}`);

    // Twilio kullanarak MMS mesajı gönderme
    client.messages.create({
        body: message, // Mesaj içeriği
        from: '+12534444767', // Twilio telefon numarası
        to: phone, // Formdan alınan telefon numarası
        mediaUrl: 'https://www.w3schools.com/w3images/lights.jpg' // Geçerli ve erişilebilir bir medya URL'si
    })
    .then(message => {
        // Başarılı mesaj gönderiminde yanıt gönderme
        console.log('MMS başarıyla gönderildi:', message.sid);
        res.json({ message: 'MMS başarıyla gönderildi!', sid: message.sid });
    })
    .catch(error => {
        // Hata durumunda hata mesajı gönderme
        console.error('Hata:', error); // Hata mesajını konsola yazdır
        res.status(500).json({ error: error.message, details: error });
    });
});

// Sunucuyu belirtilen portta başlatma
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
