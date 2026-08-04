import { useState } from 'react';
import { useForm } from 'react-redux'; // Wait, React Hook Form is `react-hook-form`
// I will import it from react-hook-form. Let's make sure it's installed.
import { useForm as useRHF } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Camera, User, Mail, Phone, Building2, Shield, Lock, Save, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_ROLES } from '@/data/mockRoles';

const schema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  gender: z.enum(['Male', 'Female', 'Other']),
  role: z.string().min(1, 'Role is required'),
  school: z.string().optional(),
  department: z.string().optional(),
  hub: z.string().optional(),
  employeeId: z.string().optional(),
  status: z.enum(['Active', 'Inactive', 'Pending', 'Suspended']),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof schema>;

export const CreateUser = () => {
  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useRHF<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      status: 'Active',
      gender: 'Male'
    }
  });

  const onSubmit = async (data: FormValues) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(data);
    navigate('/dashboard/users');
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard/users" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-500 hover:text-gray-700 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Create User</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Add a new user to the system.</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Photo Section */}
          <div className="flex flex-col items-center sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center overflow-hidden">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Camera size={32} className="text-gray-400" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 p-1.5 bg-[#0098c8] hover:bg-[#007aa3] text-white rounded-full cursor-pointer shadow-sm transition-colors">
                <Camera size={14} />
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </label>
            </div>
            <div className="text-center sm:text-left pt-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Profile Photo</h3>
              <p className="text-xs text-gray-500 mt-1">JPG, GIF or PNG. Max size of 2MB.</p>
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-800" />

          {/* Personal Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <User size={16} className="mr-2 text-[#0098c8]" /> Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name <span className="text-red-500">*</span></label>
                <input {...register('firstName')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name <span className="text-red-500">*</span></label>
                <input {...register('lastName')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input {...register('email')} type="email" className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input {...register('phone')} className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
                <select {...register('gender')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-800" />

          {/* Role & Organization */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Building2 size={16} className="mr-2 text-[#0098c8]" /> Role & Organization
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">System Role <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <select {...register('role')} className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white">
                    <option value="">Select a role...</option>
                    {MOCK_ROLES.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                  </select>
                </div>
                {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account Status</label>
                <select {...register('status')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">School / Unit</label>
                <select {...register('school')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white">
                  <option value="">Select school...</option>
                  <option value="School of Computing">School of Computing</option>
                  <option value="School of Business">School of Business</option>
                  <option value="School of Education">School of Education</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Innovation Hub</label>
                <select {...register('hub')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white">
                  <option value="">Select hub...</option>
                  <option value="Central Hub">Central Hub</option>
                  <option value="Tech Hub">Tech Hub</option>
                </select>
              </div>
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-800" />

          {/* Security */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Lock size={16} className="mr-2 text-[#0098c8]" /> Security
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password <span className="text-red-500">*</span></label>
                <input {...register('password')} type="password" placeholder="At least 8 characters" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password <span className="text-red-500">*</span></label>
                <input {...register('confirmPassword')} type="password" placeholder="Confirm password" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Link to="/dashboard/users" className="px-6 py-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
              Cancel
            </Link>
            <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 bg-[#0098c8] hover:bg-[#007aa3] text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center disabled:opacity-70 disabled:cursor-not-allowed">
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <Save size={16} className="mr-2" />
              )}
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
