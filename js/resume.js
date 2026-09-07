import * as pdfjsLib from
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs";

const pdfPath = "../assets/Mohammad_Ibrahim_Dar_Resume.pdf";
const container = document.getElementById("resume-container");

const pdf = await pdfjsLib.getDocument(pdfPath).promise;

// Only render page 1
const page = await pdf.getPage(1);

const originalViewport = page.getViewport({ scale: 1 });

// Make PDF width equal to container width
const containerWidth = container.clientWidth;

const scale = containerWidth / originalViewport.width;

const viewport = page.getViewport({ scale });

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

canvas.width = viewport.width;
canvas.height = viewport.height;

canvas.style.width = "70%";
canvas.style.height = "auto";
canvas.style.display = "block";

container.appendChild(canvas);

await page.render({
    canvasContext: context,
    viewport: viewport
}).promise;