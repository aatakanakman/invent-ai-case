**OMDb API Kullanım Dökümantasyonu**

**Base URL:**  
`http://www.omdbapi.com/`

**API Key:**  
`apikey=117b9279`

### **1. Film/Dizi Arama**

Belirli bir isme sahip filmleri, dizileri veya bölümleri listelemek için:

```
http://www.omdbapi.com/?apikey=117b9279&s={arama_terimi}
```

**Opsiyonel Parametreler:**

- `page={sayı}` → Sayfalama için
- `y={yıl}` → Belirli bir yıl için filtreleme
- `type={movie/series/episode}` → Tür bazlı filtreleme

**Örnek:**

```
http://www.omdbapi.com/?apikey=117b9279&s=batman&type=movie&page=2
```

---

### **2. IMDb ID ile Film/Dizi Bilgisi Çekme**

Belirli bir IMDb ID’sine sahip film/dizi bilgilerini almak için:

```
http://www.omdbapi.com/?apikey=117b9279&i={imdbID}
```

**Örnek:**

```
http://www.omdbapi.com/?apikey=117b9279&i=tt3896198
```

---

### **3. Film/Dizi Başlığıyla Bilgi Çekme**

Tam başlık kullanarak belirli bir film/dizi hakkında detaylı bilgi almak için:

```
http://www.omdbapi.com/?apikey=117b9279&t={başlık}
```

**Örnek:**

```
http://www.omdbapi.com/?apikey=117b9279&t=Inception
```

---

### **4. Yıla Göre Filtreleme**

Belirli bir yıl içinde yayımlanmış yapımları aramak için:

```
http://www.omdbapi.com/?apikey=117b9279&s={arama_terimi}&y={yıl}
```

**Örnek:**

```
http://www.omdbapi.com/?apikey=117b9279&s=avengers&y=2012
```

---

### **5. Sayfalama Kullanımı**

Her sayfada 10 sonuç görüntülenir. Farklı sayfalara erişmek için:

```
http://www.omdbapi.com/?apikey=117b9279&s={arama_terimi}&page={sayı}
```

**Örnek:**

```
http://www.omdbapi.com/?apikey=117b9279&s=harry potter&page=3
```

---

### **6. Plot Uzunluğu Seçme**

Film özetinin uzunluğunu belirlemek için:

```
http://www.omdbapi.com/?apikey=117b9279&t={başlık}&plot={short/full}
```

**Örnek:**

```
http://www.omdbapi.com/?apikey=117b9279&t=Inception&plot=full
```

---

### **7. Yanıt Formatı Seçme**

Varsayılan olarak JSON formatında dönen yanıtları XML formatına çevirmek için:

```
http://www.omdbapi.com/?apikey=117b9279&t={başlık}&r=xml
```

---

### **8. Rotten Tomatoes Puanı Çekme**

Rotten Tomatoes puanı almak için:

```
http://www.omdbapi.com/?apikey=117b9279&t={başlık}&tomatoes=true
```

---

### **Hata Kodları ve Yanıtlar**

**Geçersiz API Key:**

```
{
  "Response": "False",
  "Error": "Invalid API key!"
}
```

**Sonuç Bulunamadı:**

```
{
  "Response": "False",
  "Error": "Movie not found!"
}
```

**API Kullanım Limiti Aşıldı:**

```
{
  "Response": "False",
  "Error": "Request limit reached!"
}
```

Bu dökümantasyonu kullanarak API üzerinden film ve dizi bilgilerini sorgulayabilirsiniz. 🚀
