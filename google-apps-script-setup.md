# Configurar Google Apps Script para recibir confirmaciones

## Pasos:

### 1. Abrir Google Apps Script
- Ve a: https://script.google.com
- Click en **"Nuevo proyecto"**

### 2. Pegar este código (borrar lo que haya y pegar):

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.openById('1FR2739bQZG9HeoYCXNhWO2p6hA5wORq8DDwzJRZwSOw').getActiveSheet();
  
  var nombre = e.parameter.nombre || '';
  var asistencia = e.parameter.asistencia || '';
  var fecha = e.parameter.fecha || '';
  
  sheet.appendRow([nombre, asistencia, fecha]);
  
  return ContentService.createTextOutput(JSON.stringify({result: 'ok'}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### 3. Guardar y Desplegar
1. Click en **"Implementar" → "Nueva implementación"**
2. En tipo, selecciona **"App web"**
3. Descripción: "Confirmaciones 15 años"
4. **Ejecutar como:** "Yo" (tu cuenta)
5. **Quién tiene acceso:** "Cualquier persona"
6. Click **"Implementar"**
7. **Copia la URL** que te da (se ve como: `https://script.google.com/macros/s/AKfycbx.../exec`)

### 4. Pegar la URL en el código
- Dámela y yo la pongo en el código, o búscala en index.html donde dice:
  `const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzPLACEHOLDER/exec';`
- Reemplaza `AKfycbzPLACEHOLDER` con tu URL real

### 5. Preparar la hoja de cálculo
- Asegúrate de que la primera fila tenga estos encabezados:
  - **A1:** Nombre
  - **B1:** Asistencia
  - **C1:** Fecha de confirmación
