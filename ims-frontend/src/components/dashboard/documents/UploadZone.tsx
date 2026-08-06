import { useCallback, useState } from 'react';
import { UploadCloud, File, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addFilesToQueue, toggleQueueVisibility } from '@/store/slices/uploadSlice';
import { RootState } from '@/store';
import { motion, AnimatePresence } from 'framer-motion';

export const UploadZone = () => {
  const dispatch = useDispatch();
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      dispatch(addFilesToQueue(files));
      
      // Simulate upload progress
      files.forEach(file => {
        // In a real app, this would be actual API upload progress
        setTimeout(() => {
          // ... 
        }, 100);
      });
    }
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      dispatch(addFilesToQueue(files));
    }
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-2xl p-10 text-center transition-colors ${
        isDragActive 
          ? 'border-[#0098c8] bg-blue-50/50 dark:bg-blue-900/10' 
          : 'border-gray-300 dark:border-gray-700 hover:border-[#0098c8] dark:hover:border-[#0098c8]'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple
        className="hidden"
        id="file-upload"
        onChange={handleChange}
      />
      <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${
          isDragActive ? 'bg-[#0098c8] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
        }`}>
          <UploadCloud size={32} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
          Support for PDF, DOCX, XLSX, PPTX, JPG, PNG and MP4 up to 50MB per file.
        </p>
        <span className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-bold shadow-sm hover:opacity-90 transition-opacity">
          Browse Files
        </span>
      </label>
    </div>
  );
};
