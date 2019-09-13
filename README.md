# BOUN Kontenjan Kontrol

Boğaziçi Üniversitesi ders seçimi sırasında derste kalan kontenjanları görmenizi sağlar, yer açılınca e-posta bildirimi gönderir.

### Kurulum
    npm install

### Ayarlar

index.js içerisindeki lectures Array'ine derslerinizi obje olarak ekleyin.

```javascript
    let lectures = [
        {
            abbr: "XXX", // ÖRN: HTR
            code: "000", // 311
            section:"00", // 01
            email: "example@example.com" // E-posta bildirimlerinin gönderileceği e-posta adresi.
        }
    ];
```

E-posta gönderimi için kullanılacak olan e-posta adresinin ayarlarını gmailCredientials objesine ekleyin.
Bilgilerinizi girdikten sonra (https://myaccount.google.com/lesssecureapps) adresinden hesabınızı daha az güvenli uygulamalara izin verecek şekilde çalıştırmanız gerek.

```javascript
    let gmailCredientials = {
        user: 'example@gmail.com', // E-posta gönderimi için gmail hesabınızın bilgilerini girmelisiniz. Yeni ve boş bir e-posta adresi açmanızı öneriyorum.
        pass: 'example' // Bilgilerinizi girdikten sonra https://myaccount.google.com/lesssecureapps adresinden hesabınızı daha az güvenli uygulamalara izin verecek şekilde çalıştırmanız gerek.
    }
```

Döneminizi de dönem String'ine tanımladıktan sonra hazırsınız!

```javascript
    let donem = '2019/2020-1'; // Dönem numarasını doğru girmeye özen gösteriniz.
```

### Çalıştırma

Artık yapmanız gereken tek şey

    npm start

ile server'ı çalıştırmak. Bot 5 dakikada bir derslerinizin uygunluğunu kontrol edecek. Eğer sisteminizde bir servis gibi arkaplanda çalışmasını istiyorsanız

    npm i forever -g

    forever start index.js

konutuyla botu arkaplanda çalıştırabilir

    forever list

ile çalışan instance'ları görebilir,

    npm stop {pid}

ile de servisi durdurabilirsiniz.