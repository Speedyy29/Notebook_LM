/**
 * PDFViewer Component
 * Displays PDF with navigation and page scrolling
 */

import { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

/**
 * PDFViewer component
 * @param {File} file - PDF file to display
 * @param {number} targetPage - Page to scroll to
 */
function PDFViewer({ file, targetPage }) {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);
  const pageRefs = useRef({});

  /**
   * Handle document load success
   */
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  /**
   * Update container width on resize
   */
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  /**
   * Scroll to target page when it changes
   */
  useEffect(() => {
    if (targetPage && pageRefs.current[targetPage]) {
      pageRefs.current[targetPage].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setCurrentPage(targetPage);
    }
  }, [targetPage]);

  /**
   * Handle zoom in
   */
  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2.0));
  };

  /**
   * Handle zoom out
   */
  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.6));
  };

  /**
   * Navigate to previous page
   */
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      pageRefs.current[newPage]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  /**
   * Navigate to next page
   */
  const goToNextPage = () => {
    if (currentPage < numPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      pageRefs.current[newPage]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  /**
   * Handle page visibility (update current page based on scroll)
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageNum = parseInt(entry.target.dataset.page, 10);
            setCurrentPage(pageNum);
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(pageRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [numPages]);

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage <= 1}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-sm font-medium text-gray-700 min-w-[80px] text-center">
            {currentPage} / {numPages || '...'}
          </span>

          <button
            onClick={goToNextPage}
            disabled={currentPage >= numPages}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            disabled={scale <= 0.6}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Zoom out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>

          <span className="text-sm font-medium text-gray-700 min-w-[50px] text-center">
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={handleZoomIn}
            disabled={scale >= 2.0}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Zoom in"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* PDF Document */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto custom-scrollbar p-4"
      >
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="loading-dots mb-2">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <p className="text-sm text-gray-600">Loading PDF...</p>
              </div>
            </div>
          }
          error={
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-red-600">
                <p className="font-medium">Failed to load PDF</p>
                <p className="text-sm">Please try uploading again</p>
              </div>
            </div>
          }
        >
          <div className="flex flex-col items-center gap-4">
            {Array.from(new Array(numPages), (el, index) => {
              const pageNumber = index + 1;
              return (
                <div
                  key={pageNumber}
                  ref={(el) => (pageRefs.current[pageNumber] = el)}
                  data-page={pageNumber}
                  className="bg-white shadow-lg"
                >
                  <Page
                    pageNumber={pageNumber}
                    scale={scale}
                    width={Math.min(containerWidth - 32, 800)}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                  />
                </div>
              );
            })}
          </div>
        </Document>
      </div>
    </div>
  );
}

export default PDFViewer;
