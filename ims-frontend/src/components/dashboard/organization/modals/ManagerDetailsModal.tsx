import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Shield, Building2, Calendar, UserCheck, UserX } from 'lucide-react';
import { UserAvatar } from '@/components/dashboard/users/UserAvatar';
import { StatusBadge } from '@/components/dashboard/users/StatusBadge';
import { cn } from '@/lib/utils';

interface ManagerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  manager: any | null;
  hubName?: string;
  assignment?: any | null;
}

export const ManagerDetailsModal = ({
  isOpen,
  onClose,
  manager,
  hubName,
  assignment,
}: ManagerDetailsModalProps) => {
  if (!manager) return null;

  const isActive = assignment?.active ?? manager?.enabled ?? true;
  const roleTitle = assignment?.roleTitle || manager?.role || 'Innovation Hub Manager';
  const displayHub = hubName || assignment?.hub?.name || 'SUZA Innovation Ecosystem';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-[#0098c8] to-[#0d2137] p-6 text-white">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center space-x-4">
                <UserAvatar
                  firstName={manager.firstName}
                  lastName={manager.lastName}
                  imageUrl={manager.profilePhoto || manager.avatarUrl}
                  size="lg"
                  className="border-2 border-white shadow-md"
                />
                <div>
                  <h2 className="text-xl font-bold">
                    {manager.firstName} {manager.lastName}
                  </h2>
                  <p className="text-sm text-blue-100 font-medium">{roleTitle}</p>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
              {/* Status & ID */}
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center space-x-2">
                  {isActive ? (
                    <UserCheck size={18} className="text-green-500" />
                  ) : (
                    <UserX size={18} className="text-gray-400" />
                  )}
                  <span className="text-xs font-bold text-gray-500 uppercase">Account Status</span>
                </div>
                <StatusBadge status={isActive ? 'Active' : 'Inactive'} />
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                  Contact Details
                </h3>
                <div className="space-y-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <Mail size={16} className="mr-3 text-[#0098c8]" />
                    <span className="font-medium">{manager.email || 'N/A'}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <Phone size={16} className="mr-3 text-[#0098c8]" />
                    <span className="font-medium">{manager.phoneNumber || manager.phone || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Hub Assignment Details */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                  Hub Assignment Info
                </h3>
                <div className="space-y-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <Building2 size={16} className="mr-3 text-purple-500" />
                    <div>
                      <p className="text-xs text-gray-400">Assigned Innovation Hub</p>
                      <p className="font-bold text-gray-900 dark:text-white">{displayHub}</p>
                    </div>
                  </div>
                  {assignment?.startDate && (
                    <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 pt-2 border-t border-gray-100 dark:border-gray-800">
                      <Calendar size={16} className="mr-3 text-emerald-500" />
                      <div>
                        <p className="text-xs text-gray-400">Assignment Start Date</p>
                        <p className="font-medium">
                          {new Date(assignment.startDate).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                  {manager.roles && manager.roles.length > 0 && (
                    <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 pt-2 border-t border-gray-100 dark:border-gray-800">
                      <Shield size={16} className="mr-3 text-amber-500" />
                      <div>
                        <p className="text-xs text-gray-400">System Role</p>
                        <p className="font-medium">{manager.roles.map((r: any) => r.name).join(', ')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
