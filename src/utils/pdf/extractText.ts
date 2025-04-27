import * as pdfjs from 'pdfjs-dist';

// Initialize PDF.js worker
const workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export const extractTextFromPDF = async (
  file: File, 
  progressCallback: (progress: number) => void
): Promise<string> => {
  const fileArrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjs.getDocument({ data: fileArrayBuffer });
  
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;
  let text = '';
  
  for (let i = 1; i <= numPages; i++) {
    const progress = Math.round((i / numPages) * 100);
    progressCallback(progress);
    
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item: any) => item.str).join(' ') + '\n';
  }
  
  return text;
};