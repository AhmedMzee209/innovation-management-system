import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, FileText, Loader2 } from 'lucide-react';
import { useUploadDocument } from '@/hooks/useInnovation';
import { toast } from 'sonner';

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  innovationId: string;
}

export const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({ isOpen, onClose, innovationId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState('PROPOSAL');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadDocument, isPending } = useUploadDocument();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    uploadDocument(
      { id: innovationId, file, documentType },
      {
        onSuccess: () => {
          toast.success('Document uploaded successfully');
          setFile(null);
          setDocumentType('PROPOSAL');
          onClose();
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || 'Failed to upload document');
        },
      }
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-[#0098c8] rounded-xl">
                  <Upload size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Upload Document</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Document Type *
                </label>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0098c8] bg-gray-50 dark:bg-gray-800/50"
                  required
                >
                  <option value="PROPOSAL">Proposal</option>
                  <option value="PRESENTATION">Presentation</option>
                  <option value="REQUIREMENTS">Requirements</option>
                  <option value="DESIGN">Design</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Select File *
                </label>
                
                <div 
                  className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                    file ? 'border-[#0098c8] bg-blue-50/50 dark:bg-blue-900/10' : 'border-gray-300 dark:border-gray-700 hover:border-[#0098c8] hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  
                  {file ? (
                    <>
                      <FileText className="text-[#0098c8] mb-2" size={32} />
                      <p className="text-sm font-medium text-gray-900 dark:text-white text-center break-all">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload className="text-gray-400 mb-2" size={32} />
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Click to browse or drag & drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, DOCX, PPTX up to 10MB
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending || !file}
                  className="px-6 py-2 text-sm font-medium text-white bg-[#0098c8] hover:bg-[#007aa3] rounded-lg transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <><Loader2 size={16} className="animate-spin mr-2" /> Uploading...</>
                  ) : (
                    'Upload'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
