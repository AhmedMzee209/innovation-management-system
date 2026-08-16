import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building2, Globe, CheckCircle2, FileText, Download, Edit, Loader2, Plus, Trash2, User } from 'lucide-react';
import { StatusBadge } from '@/components/dashboard/innovations/cards/StatusBadge';
import { format } from 'date-fns';
import { UserAvatar } from '@/components/dashboard/users/UserAvatar';
import { useInnovation, useRemoveTeamMember, useDeleteDocument, useSubmitInnovation } from '@/hooks/useInnovation';
import { useState } from 'react';
import { AddTeamMemberModal } from '@/components/dashboard/innovations/modals/AddTeamMemberModal';
import { UploadDocumentModal } from '@/components/dashboard/innovations/modals/UploadDocumentModal';
import { AssignReviewerModal } from '@/components/dashboard/innovations/modals/AssignReviewerModal';
import { toast } from 'sonner';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import { useRef } from 'react';

export const InnovationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: innovation, isLoading, isError } = useInnovation(id!);
  
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [isReviewerModalOpen, setIsReviewerModalOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const { mutate: removeTeamMember } = useRemoveTeamMember();
  const { mutate: deleteDocument } = useDeleteDocument();
  const { mutate: submitInnovation, isPending: isSubmitting } = useSubmitInnovation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="w-8 h-8 text-[#0098c8] animate-spin" />
      </div>
    );
  }

  if (isError || !innovation) {
    return (
      <div className="flex items-center justify-center h-[50vh] text-red-500">
        Failed to load innovation details.
      </div>
    );
  }

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit this innovation for review? You will not be able to edit it after submission.')) {
      submitInnovation(innovation.id, {
        onSuccess: () => {
          toast.success('Innovation submitted for review successfully');
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || 'Failed to submit innovation');
        }
      });
    }
  };

  const handleExportPDF = () => {
    if (!contentRef.current) return;
    
    const opt = {
      margin:       0.5,
      filename:     `${innovation.innovationCode || 'Innovation'}-Details.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(contentRef.current).save();
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-2">
        <Link to="/dashboard/innovations" className="flex items-center text-sm font-medium text-gray-500 hover:text-[#0098c8] transition-colors">
          <ArrowLeft size={16} className="mr-1.5" /> Back to Innovations
        </Link>
        <div className="flex space-x-3">
          {innovation.currentStatus === 'DRAFT' && (
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-4 py-2 bg-[#0098c8] text-white rounded-lg text-sm font-medium hover:bg-[#007aa3] transition-colors shadow-sm flex items-center disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 size={16} className="mr-2 animate-spin" /> : <CheckCircle2 size={16} className="mr-2" />}
              Submit for Review
            </button>
          )}
          {(innovation.currentStatus === 'SUBMITTED' || innovation.currentStatus === 'UNDER_REVIEW') && (
            <button 
              onClick={() => setIsReviewerModalOpen(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors shadow-sm flex items-center"
            >
              <User size={16} className="mr-2" />
              Assign Reviewer
            </button>
          )}
          <button 
            onClick={handleExportPDF}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center"
          >
            <Download size={16} className="mr-2" /> Export PDF
          </button>
          {innovation.currentStatus === 'DRAFT' && (
            <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#0098c8] rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center">
              <Edit size={16} className="mr-2" /> Edit
            </button>
          )}
        </div>
      </div>

      <div ref={contentRef} className="space-y-6">
        {/* Hero Banner */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 lg:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0098c8]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                {innovation.innovationCode || 'PENDING'}
              </span>
              <StatusBadge stage={innovation.currentStatus} />
              <span className="text-xs font-bold text-[#0098c8] bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded border border-blue-100 dark:border-blue-900/30">
                {innovation.category?.name || 'Uncategorized'}
              </span>
            </div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white leading-tight mb-4">
              {innovation.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl leading-relaxed mb-6">
              {innovation.abstractText || "No abstract provided."}
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center text-gray-500">
                <Building2 size={16} className="mr-2 text-gray-400" />
                {innovation.school?.name || 'N/A'}
              </div>
              <div className="flex items-center text-gray-500">
                <Globe size={16} className="mr-2 text-gray-400" />
                {innovation.hub?.name || 'N/A'}
              </div>
            </div>
          </div>

          <div className="w-full md:w-64 shrink-0 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-100 dark:border-gray-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Primary Innovator</h3>
            <div className="flex items-center space-x-3 mb-4">
              <UserAvatar firstName={innovation.ownerName ? innovation.ownerName.split(' ')[0] : 'User'} lastName={innovation.ownerName ? (innovation.ownerName.split(' ')[1] || '') : ''} size="md" />
              <div>
                <p className="font-bold text-gray-900 dark:text-white line-clamp-1" title={innovation.ownerName}>{innovation.ownerName}</p>
                <p className="text-xs text-gray-500 line-clamp-1" title={innovation.ownerEmail}>{innovation.ownerEmail}</p>
              </div>
            </div>
            <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Submitted:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {innovation.submissionDate ? format(new Date(innovation.submissionDate), 'MMM d, yyyy') : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 lg:p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Innovation Details</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#0098c8] mb-2">Problem Statement</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{innovation.problemStatement}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#0098c8] mb-2">Proposed Solution</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{innovation.proposedSolution}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Objectives</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{innovation.objectives || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Target Beneficiaries</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{innovation.targetBeneficiaries || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 lg:p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Business & Commercialization</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Expected Impact</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{innovation.expectedImpact || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Progress Tracker (Timeline) */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">Lifecycle Progress</h3>
            
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {innovation.currentStatus.replace(/_/g, ' ')}
                </span>
                <span className="text-sm font-bold text-[#0098c8]">
                  {(() => {
                    const status = innovation.currentStatus;
                    if (status === 'DRAFT') return '10%';
                    if (status === 'SUBMITTED') return '25%';
                    if (status === 'UNDER_REVIEW') return '40%';
                    if (status === 'EVALUATED') return '55%';
                    if (status === 'REVISION_REQUIRED') return '35%';
                    if (status === 'APPROVED_BY_SCHOOL') return '65%';
                    if (status === 'FORWARDED_TO_CENTRAL') return '80%';
                    if (status === 'APPROVED') return '100%';
                    if (status === 'REJECTED') return '0%';
                    if (status === 'ARCHIVED') return '100%';
                    return '0%';
                  })()}
                </span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-[#0098c8] h-2 rounded-full transition-all duration-1000 ease-out" 
                  style={{ 
                    width: (() => {
                      const status = innovation.currentStatus;
                      if (status === 'DRAFT') return '10%';
                      if (status === 'SUBMITTED') return '25%';
                      if (status === 'UNDER_REVIEW') return '40%';
                      if (status === 'EVALUATED') return '55%';
                      if (status === 'REVISION_REQUIRED') return '35%';
                      if (status === 'APPROVED_BY_SCHOOL') return '65%';
                      if (status === 'FORWARDED_TO_CENTRAL') return '80%';
                      if (status === 'APPROVED') return '100%';
                      if (status === 'REJECTED') return '0%';
                      if (status === 'ARCHIVED') return '100%';
                      return '0%';
                    })() 
                  }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-700 before:to-transparent">
              {innovation.statusHistory?.map((evt) => (
                <div key={evt.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-gray-900 bg-blue-100 text-[#0098c8] dark:bg-[#0098c8]/20 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">{evt.currentStatus}</h4>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{evt.changedDate ? format(new Date(evt.changedDate), 'MMM d, yyyy h:mm a') : 'N/A'}</p>
                    {evt.remarks && <p className="text-xs text-gray-600 dark:text-gray-400 italic">"{evt.remarks}"</p>}
                    <p className="text-[10px] text-gray-400 mt-1">by {evt.changedByName}</p>
                  </div>
                </div>
              ))}
              {(!innovation.statusHistory || innovation.statusHistory.length === 0) && (
                <p className="text-sm text-gray-500 text-center relative z-10">No status history available.</p>
              )}
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">Attached Documents</h3>
              <button 
                onClick={() => setIsDocModalOpen(true)}
                className="p-1.5 bg-blue-50 dark:bg-blue-900/20 text-[#0098c8] rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                title="Upload Document"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="space-y-3">
              {innovation.documents?.map(doc => (
                <div key={doc.id} className="flex items-center p-3 border border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center mr-3 shrink-0">
                    <FileText size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate" title={doc.originalFileName}>{doc.originalFileName}</p>
                    <p className="text-xs text-gray-500">{(doc.fileSize / 1024 / 1024).toFixed(2)} MB • {doc.uploadDate ? format(new Date(doc.uploadDate), 'MMM d, yyyy') : 'N/A'}</p>
                  </div>
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all">
                    <a href={`http://localhost:8080/api/innovations/documents/${doc.id}/download`} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-[#0098c8]">
                      <Download size={16} />
                    </a>
                    <button onClick={() => { if(window.confirm('Delete this document?')) deleteDocument({ id: innovation.id, documentId: doc.id }) }} className="p-2 text-gray-400 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {(!innovation.documents || innovation.documents.length === 0) && (
                <p className="text-sm text-gray-500 text-center py-4 border border-dashed border-gray-200 dark:border-gray-700 rounded-lg">No documents attached.</p>
              )}
            </div>
          </div>

          {/* Team Members */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">Team Members</h3>
              <button 
                onClick={() => setIsTeamModalOpen(true)}
                className="p-1.5 bg-blue-50 dark:bg-blue-900/20 text-[#0098c8] rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                title="Add Team Member"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <div className="space-y-3">
              {innovation.teamMembers?.map(member => (
                <div key={member.id} className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                      <User size={14} className="text-gray-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{member.name}</p>
                      <p className="text-[10px] uppercase font-bold text-[#0098c8] tracking-wider">{member.role}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => { if(window.confirm(`Remove ${member.name}?`)) removeTeamMember({ id: innovation.id, memberId: member.id }) }} 
                    className="p-1.5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              
              {(!innovation.teamMembers || innovation.teamMembers.length === 0) && (
                <p className="text-sm text-gray-500 text-center py-4 border border-dashed border-gray-200 dark:border-gray-700 rounded-lg">No external team members added.</p>
              )}
            </div>
          </div>

        </div>
      </div>
      </div>

      {/* Modals */}
      <AddTeamMemberModal 
        isOpen={isTeamModalOpen} 
        onClose={() => setIsTeamModalOpen(false)} 
        innovationId={innovation.id} 
      />
      
      <UploadDocumentModal 
        isOpen={isDocModalOpen} 
        onClose={() => setIsDocModalOpen(false)} 
        innovationId={innovation.id} 
      />
      
      <AssignReviewerModal 
        isOpen={isReviewerModalOpen} 
        onClose={() => setIsReviewerModalOpen(false)} 
        innovationId={innovation.id} 
      />
    </div>
  );
};
