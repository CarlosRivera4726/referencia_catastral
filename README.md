# Referencia Catastral Automatizada - Popayán

Este repositorio contiene un script de automatización desarrollado con **Node.js** y **Selenium WebDriver**. Su propósito es facilitar la descarga de documentos de referencia catastral del portal de la ciudad de Popayán, simulando la interacción de un usuario real.

Es un proyecto sencillo pero potente, diseñado como material educativo para aprender los fundamentos de la automatización web (Web Scraping / Browser Automation).

## 🚀 Características

- **Navegación Autónoma**: Abre el navegador y accede al sitio web automáticamente.
- **Búsqueda Inteligente**: Ingresa la referencia catastral definida en la configuración.
- **Manejo de Descargas**: Configura Chrome para guardar archivos PDF automáticamente sin cuadros de diálogo.
- **Modo Kiosk**: Utiliza opciones de impresión silenciosa.

## 📋 Requisitos Previos

- **Node.js**: Versión 20.6.0 o superior (para soporte nativo de archivos `.env`).
- **Google Chrome**: Tener el navegador instalado en tu sistema.

## 🛠️ Instalación

1. **Clonar el repositorio** (o descargar los archivos):

   ```bash
   git clone https://github.com/CarlosRivera4726/referencia_catastral.git
   cd referencia_catastral
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```
   Esto instalará `selenium-webdriver`, la librería principal utilizada para controlar el navegador.

## ⚙️ Configuración

Debes crear un archivo llamado `.env` en la raíz del proyecto para definir tus variables de entorno. Puedes usar el siguiente formato:

```env
URL=https://tributario.popayan.gov.co/ (o la URL específica de consulta)
REF_CATRASTAL=1234567890
```

> **Nota**: Asegúrate de colocar la URL exacta donde se encuentra el formulario de "Consulta de Contribuyente".

## ▶️ Ejecución

Para iniciar el proceso de descarga automática, ejecuta:

```bash
npm start
```

El script realizará lo siguiente:

1. Abrirá una ventana de Chrome.
2. Navegará al sitio.
3. Buscará la referencia.
4. Seleccionará el resultado.
5. Descargará el documento en una carpeta llamada `descargas` dentro del proyecto.

## 🔍 Detalles del Código (Para aprender)

Si estás usando este proyecto para aprender, presta atención a estos puntos clave en `index.js`:

1.  **Preferencias del Navegador**:

    ```javascript
    options.setUserPreferences({
      "download.default_directory": downloadPath, // Define dónde guardar archivos
      "savefile.default_directory": downloadPath,
      "printing.print_preview_sticky_settings.appState": JSON.stringify({...}) // Evita el popup de impresión
    });
    ```

    Esto es crucial para que la automatización no se detenga esperando que el usuario elija dónde guardar el archivo.

2.  **Esperas Explícitas (`driver.wait`)**:
    Selenium no sabe cuándo carga la página. Usamos `until.elementLocated` para esperar a que aparezcan los elementos (como la barra de búsqueda o el botón) antes de intentar interactuar con ellos.

3.  **⚠️ Nota sobre la Selección de Resultados**:
    Actualmente, el código busca un resultado específico en la línea 41:
    ```javascript
    By.xpath("//*[contains(text(), '010701620033901')]");
    ```
    Si deseas que el script seleccione dinámicamente cualquier resultado basado en tu variable de entorno, podrías modificar esa línea para usar `process.env.REF_CATRASTAL`.

## 📂 Estructura de Carpetas

- `index.js`: El cerebro del bot.
- `drivers/`: Carpeta que puede contener drivers específicos si no se usan los del sistema.
- `descargas/`: Carpeta generada automáticamente donde se guardarán los PDFs.
