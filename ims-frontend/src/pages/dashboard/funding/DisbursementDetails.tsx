import { useParams, Link } from 'react-router-dom';
import { MOCK_DISBURSEMENTS } from '@/data/mockFunding';
import { MOCK_STARTUPS } from '@/data/mockStartups';
import { ArrowLeft, Clock, CheckCircle2, Download, History, CreditCard } from 'lucide-react';
import { format, parseISO, addMonths } from 'date-fns';
import { DisbursementStatusBadge } from '@/components/dashboard/funding/cards/FundingStatusBadge';

export const DisbursementDetails = () => {
  const { id } = useParams();
  const disbursement = MOCK_DISBURSEMENTS.find(d => d.id === id);
  const startup = MOCK_STARTUPS.find(s => s.id === disbursement?.startupId);

  if (!disbursement || !startup) return <div className="p-8 text-center text-gray-500">Ledger not found</div>;

  // Generate a fake payment schedule based on the disbursement details
  const generateSchedule = () => {
    const schedule = [];
    const installments = 4;
    const baseAmount = disbursement.totalAmount / installments;
    
    let currentDate = parseISO(disbursement.nextInstallmentDate || new Date().toISOString());
    let accumulated = 0;

    for (let i = 1; i <= installments; i++) {
      const isPaid = accumulated < disbursement.amountDisbursed;
      const isNext = !isPaid && schedule.length > 0 && schedule[schedule.length - 1].status === 'Paid';
      
      let status = isPaid ? 'Paid' : (i === 1 || isNext ? 'Pending' : 'Scheduled');
      if (disbursement.status === 'Completed') status = 'Paid';

      schedule.push({
        id: `INV-${disbursement.id}-${String(i).padStart(2, '0')}`,
        installment: `Tranche ${i}`,
        amount: baseAmount,
        dueDate: format(currentDate, 'yyyy-MM-dd'),
        status,
      });

      accumulated += baseAmount;
      currentDate = addMonths(currentDate, 3); // Quarterly installments
    }
    return schedule;
  };

  const schedule = generateSchedule();
  const percentage = (disbursement.amountDisbursed / disbursement.totalAmount) * 100;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-6">
        <Link to="/dashboard/funding/disbursements" className="text-sm font-medium text-gray-500 hover:text-[#0098c8] flex items-center transition-colors">
          <ArrowLeft size={16} className="mr-1" /> Back to Ledger
        </Link>
        <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center">
          <Download size={16} className="mr-2" /> Download Statement
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Ledger Header */}
        <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight uppercase">
                  {disbursement.id}
                </h1>
                <DisbursementStatusBadge status={disbursement.status} />
              </div>
              <p className="text-sm text-gray-500 font-medium">Beneficiary: <Link to={`/dashboard/startups/${startup.id}`} className="text-[#0098c8] hover:underline font-bold">{startup.name}</Link></p>
            </div>
            
            <div className="text-right">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Total Approved Funding</p>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">${disbursement.totalAmount.toLocaleString()}</h2>
            </div>
          </div>

          <div className="space-y-2 max-w-2xl">
            <div className="flex justify-between text-sm font-bold">
              <span className="text-emerald-600">${disbursement.amountDisbursed.toLocaleString()} Disbursed</span>
              <span className="text-gray-500">${disbursement.remainingBalance.toLocaleString()} Remaining</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div className="bg-emerald-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${percentage}%` }}></div>
            </div>
          </div>
        </div>

        {/* Payment Schedule Table */}
        <div className="p-0">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              <History className="mr-2 text-blue-500" size={20} /> Payment Schedule & Timeline
            </h3>
            {disbursement.remainingBalance > 0 && (
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm flex items-center">
                <CreditCard size={16} className="mr-2" /> Process Next Tranche
              </button>
            )}
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Invoice / Ref</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Tranche</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {schedule.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="p-4 font-mono text-xs font-medium text-gray-600 dark:text-gray-400">
                    {payment.id}
                  </td>
                  <td className="p-4 font-bold text-gray-900 dark:text-white text-sm">
                    {payment.installment}
                  </td>
                  <td className="p-4 font-black text-gray-900 dark:text-white">
                    ${payment.amount.toLocaleString()}
                  </td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                    {format(parseISO(payment.dueDate), 'MMM d, yyyy')}
                  </td>
                  <td className="p-4">
                    {payment.status === 'Paid' ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                        <CheckCircle2 size={12} className="mr-1" /> Paid
                      </span>
                    ) : payment.status === 'Pending' ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                        <Clock size={12} className="mr-1" /> Action Required
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-500">
                        Scheduled
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
