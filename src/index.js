/**
 * Application entry file.
 *
 * We create a drag and drop area and a file picker that are used to load PDFs.
 * Once a PDF is dropped or selected we read it from disk as an ArrayBuffer
 * which we can then pass to PSPDFKit.load() to initialize the viewer with the given PDF.
 *
 * We also add an `Export PDF` button to the main toolbar and monitor changes to
 * inform the users when they are about to leave the page or open a new document
 * and there is unsaved(exported) work.
 */
import PSPDFKit from "pspdfkit";

function load() {
  return PSPDFKit.load({
    container: ".App",
    document: "/assets/example.pdf",
    licenseKey: process.env.PSPDFKIT_LICENSE_KEY
  }).then(instance => {
    window.instance = instance
    return instance;
  });
}

load()
