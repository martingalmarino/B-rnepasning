# Børnepasning.dk - Comparador de Precios

## 🚀 Cómo ejecutar la aplicación

### Opción 1: Servidor Local (Recomendado)
Para ver todos los 20 municipios y funcionalidad completa:

```bash
# Navegar al directorio del proyecto
cd /ruta/al/proyecto/bornepasning

# Ejecutar servidor local
python3 -m http.server 8000

# Abrir en el navegador
http://localhost:8000
```

### Opción 2: Abrir directamente (Limitado)
Si abres `index.html` directamente desde el explorador de archivos:
- ❌ Solo verás 3 municipios (København, Aarhus, Odense)
- ❌ El mapa no funcionará completamente
- ❌ Aparecerá un mensaje de advertencia

## 📋 Características

### ✅ Funcionalidades Completas (con servidor local):
- **20 municipios** daneses con datos completos
- **Calculadora interactiva** con precios reales
- **Mapa interactivo** con Leaflet.js
- **Tabla de precios** responsive
- **Diseño responsive** para todos los dispositivos

### ⚠️ Funcionalidades Limitadas (sin servidor):
- **3 municipios** únicamente
- **Mapa básico** sin datos completos
- **Calculadora limitada**

## 🛠️ Solución de Problemas

### Problema: Solo veo 3 municipios
**Causa:** Abriendo el archivo HTML directamente (file://)
**Solución:** Usar el servidor local como se indica arriba

### Problema: El mapa no funciona
**Causa:** Restricciones CORS del navegador
**Solución:** Ejecutar desde servidor local

### Problema: Errores en consola
**Causa:** Carga de datos JSON fallida
**Solución:** Verificar que el servidor esté ejecutándose

## 📁 Estructura del Proyecto

```
bornepasning/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── app.js             # Lógica JavaScript
├── data/
│   └── priser2025.json # Datos de municipios (20 registros)
└── README.md          # Este archivo
```

## 🎯 Datos Incluidos

### Municipios Disponibles (con servidor local):
1. København
2. Frederiksberg  
3. Aarhus
4. Odense
5. Aalborg
6. Esbjerg
7. Roskilde
8. Herning
9. Sønderborg
10. Vejle
11. Randers
12. Horsens
13. Viborg
14. Kolding
15. Holstebro
16. Slagelse
17. Hillerød
18. Helsingør
19. Næstved
20. Silkeborg

### Datos por Municipio:
- **Vuggestue** (Guardería): Precio mensual
- **Børnehave** (Jardín de infancia): Precio mensual  
- **SFO** (Actividades extraescolares): Precio mensual
- **Madordning** (Comida): Precio mensual
- **Coordenadas** (lat/lng): Para el mapa
- **Fuente oficial**: Enlace a página del municipio

## 🌐 Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Diseño responsive y moderno
- **JavaScript ES6+** - Funcionalidad interactiva
- **Leaflet.js** - Mapas interactivos
- **Python HTTP Server** - Servidor de desarrollo

## 📱 Compatibilidad

- ✅ **Chrome/Edge** - Funcionalidad completa
- ✅ **Firefox** - Funcionalidad completa  
- ✅ **Safari** - Funcionalidad completa
- ✅ **Móviles** - Diseño responsive
- ✅ **Tablets** - Optimizado para touch

---

**Nota:** Para la mejor experiencia, siempre ejecuta la aplicación desde un servidor local usando `python3 -m http.server 8000` y accede a `http://localhost:8000`.
