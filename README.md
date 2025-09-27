# Børnepasning.dk - Comparador de Precios

## 🚀 Cómo ejecutar la aplicación

### Opción 1: Vercel (Recomendado - Producción)
Para ver todos los 20 municipios y funcionalidad completa:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar a Vercel
vercel

# O conectar directamente desde GitHub
# https://vercel.com/new -> Importar repositorio GitHub
```

**Live Demo:** [https://bornepasning-dk.vercel.app](https://bornepasning-dk.vercel.app)

### Opción 2: Servidor Local (Desarrollo)
Para desarrollo local:

```bash
# Navegar al directorio del proyecto
cd /ruta/al/proyecto/bornepasning

# Ejecutar servidor local
python3 -m http.server 8000

# Abrir en el navegador
http://localhost:8000
```

### Opción 3: Abrir directamente (Limitado)
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
- **Vercel** - Hosting y deployment
- **Python HTTP Server** - Servidor de desarrollo local

## 📱 Compatibilidad

- ✅ **Chrome/Edge** - Funcionalidad completa
- ✅ **Firefox** - Funcionalidad completa  
- ✅ **Safari** - Funcionalidad completa
- ✅ **Móviles** - Diseño responsive
- ✅ **Tablets** - Optimizado para touch

## 🚀 Deployment en Vercel

### Configuración Automática
1. **Conectar GitHub**: Ve a [Vercel](https://vercel.com/new) y conecta tu repositorio GitHub
2. **Importar Proyecto**: Selecciona `martingalmarino/B-rnepasning`
3. **Deploy Automático**: Vercel detectará automáticamente la configuración

### Configuración Manual
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login en Vercel
vercel login

# Deploy desde el directorio del proyecto
vercel

# Deploy a producción
vercel --prod
```

### Archivos de Configuración
- ✅ `vercel.json` - Configuración de routing y headers
- ✅ `package.json` - Metadatos del proyecto
- ✅ `.gitignore` - Archivos a ignorar

### Ventajas de Vercel
- ✅ **HTTPS automático** - Sin problemas de CORS
- ✅ **CDN global** - Carga rápida en todo el mundo
- ✅ **Deploy automático** - Cada push a GitHub actualiza el sitio
- ✅ **Dominio personalizado** - Posibilidad de usar dominio propio
- ✅ **Analytics** - Métricas de uso incluidas

---

**Nota:** Para la mejor experiencia, usa Vercel para producción o ejecuta la aplicación desde un servidor local usando `python3 -m http.server 8000` y accede a `http://localhost:8000`.
