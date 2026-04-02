# 🌿 Palma

App de emergencias para la comunidad sorda en Chile.  
Un toque envía tu ubicación GPS a Carabineros y a tus contactos de confianza.

---

## Por qué existe Palma

En Chile, el número de emergencias 133 solo recibe llamadas de voz.

Las personas sordas quedan sin acceso directo a servicios de emergencia en los momentos más críticos.

Palma nació en memoria de **Camila Villavicencio**, profesora sorda y miembro activa de la comunidad sorda chilena, que no tuvo forma de comunicarse con los servicios de emergencia cuando más lo necesitaba.

Este proyecto es open source porque esta herramienta debe estar disponible para toda la comunidad sorda de Chile, sin barreras.

---

## Cómo funciona

1. La persona sorda presiona el botón SOS
2. Selecciona el tipo de emergencia — accidente, médica, seguridad o incendio
3. La app obtiene la ubicación GPS del dispositivo
4. Envía automáticamente nombre, tipo de emergencia y coordenadas a Carabineros y a los contactos de confianza registrados

---

## Correr localmente

```bash
git clone https://github.com/paskuvan/palma.git
cd palma
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el browser.