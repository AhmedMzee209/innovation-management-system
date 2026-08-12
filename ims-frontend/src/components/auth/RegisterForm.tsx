import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Lock, Phone, Eye, EyeOff,
  CheckCircle2, XCircle, Loader2, ChevronDown
} from 'lucide-react';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth/auth.service';
import Swal from 'sweetalert2';

// ─── Validation Schema (mirrors backend RegisterRequest) ─────
const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  middleName: z.string().max(50).optional(),
  lastName: z.string().min(1, 'Last name is required').max(50),
  email: z.string().email('Enter a valid email address').max(100),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Enter a valid phone number (e.g. +255712345678)').optional().or(z.literal('')),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER', '']).optional(),
  password: z.string()
    .min(8, 'Minimum 8 characters')
    .regex(/(?=.*[0-9])/, 'Must contain a number')
    .regex(/(?=.*[a-z])/, 'Must contain a lowercase letter')
    .regex(/(?=.*[A-Z])/, 'Must contain an uppercase letter')
    .regex(/(?=.*[@#$%^&+=!])/, 'Must contain a special character (@#$%^&+=!)'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

// ─── Password Strength Indicator ─────────────────────────────
const PasswordStrengthBar = ({ password }: { password: string }) => {
  const checks = [
    { label: '8+ characters', ok: password.length >= 8 },
    { label: 'Number', ok: /\d/.test(password) },
    { label: 'Uppercase', ok: /[A-Z]/.test(password) },
    { label: 'Lowercase', ok: /[a-z]/.test(password) },
    { label: 'Special char', ok: /[@#$%^&+=!]/.test(password) },
  ];
  const passed = checks.filter(c => c.ok).length;
  const strength = ['', 'Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'][passed];
  const colors = ['', 'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-emerald-400', 'bg-emerald-600'];

  if (!password) return null;

  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-2 space-y-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= passed ? colors[passed] : 'bg-gray-200 dark:bg-gray-700'}`} />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {checks.map(c => (
          <span key={c.label} className={`flex items-center gap-1 text-[11px] font-medium ${c.ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
            {c.ok ? <CheckCircle2 size={11} /> : <XCircle size={11} />} {c.label}
          </span>
        ))}
      </div>
      {passed > 0 && <p className={`text-xs font-bold ${colors[passed].replace('bg-', 'text-')}`}>{strength}</p>}
    </motion.div>
  );
};

// ─── Field wrapper ────────────────────────────────────────────
const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">{label}</label>
    {children}
    <AnimatePresence>
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="mt-1 text-xs text-red-500 flex items-center gap-1">
          <XCircle size={11} /> {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

const inputClass = "w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#0098c8]/30 focus:border-[#0098c8] transition-all";

// ─── Main Form ────────────────────────────────────────────────
export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { gender: '' },
  });

  const password = watch('password') ?? '';

  const registerMutation = useMutation({
    mutationFn: (payload: any) => authService.register(payload),
    onSuccess: (_, variables) => {
      Swal.fire({
        html: `
          <div class="flex flex-col items-center justify-center">
            <h2 class="text-lg font-bold text-[#0d2137] mb-2">Account Created!</h2>
            <div class="bg-gray-50 rounded-xl p-2 w-full text-center border border-gray-100 mb-3">
              <p class="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Your Email</p>
              <p class="text-sm font-bold text-[#0d2137] truncate">${variables.email}</p>
            </div>
            <div class="animate-spin rounded-full h-8 w-8 border-[3px] border-gray-100 border-t-[#0098c8] mb-2"></div>
            <p class="text-xs text-gray-500 font-medium">Redirecting to login...</p>
          </div>
        `,
        showConfirmButton: false,
        timer: 3500,
        width: '18rem',
        padding: '1.25rem',
        background: '#ffffff',
        customClass: {
          popup: 'rounded-2xl shadow-xl border border-gray-100',
        }
      }).then(() => {
        navigate('/login');
      });
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || err?.response?.data?.error || 'Registration failed. Please try again.';
      toast.error(msg);
    }
  });

  const onSubmit = (data: RegisterFormValues) => {
    const payload = {
      firstName: data.firstName,
      middleName: data.middleName || undefined,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber || undefined,
      gender: data.gender || undefined,
    };

    registerMutation.mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">

      {/* Name row */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="First Name *" error={errors.firstName?.message}>
          <div className="relative">
            <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input {...register('firstName')} placeholder="Ali" className={inputClass} />
          </div>
        </Field>
        <Field label="Last Name *" error={errors.lastName?.message}>
          <div className="relative">
            <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input {...register('lastName')} placeholder="Juma" className={inputClass} />
          </div>
        </Field>
      </div>

      {/* Middle name */}
      <Field label="Middle Name (optional)" error={errors.middleName?.message}>
        <div className="relative">
          <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input {...register('middleName')} placeholder="Hassan" className={inputClass} />
        </div>
      </Field>

      {/* Email */}
      <Field label="Email Address *" error={errors.email?.message}>
        <div className="relative">
          <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input {...register('email')} type="email" placeholder="ali.juma@suza.ac.tz" className={inputClass} />
        </div>
      </Field>

      {/* Phone + Gender row */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Phone (optional)" error={errors.phoneNumber?.message}>
          <div className="relative">
            <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input {...register('phoneNumber')} placeholder="+255712345678" className={inputClass} />
          </div>
        </Field>
        <Field label="Gender (optional)" error={errors.gender?.message}>
          <div className="relative">
            <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select {...register('gender')} className={`${inputClass} pl-4 pr-8 appearance-none`}>
              <option value="">Select...</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </Field>
      </div>

      {/* Password */}
      <Field label="Password *" error={errors.password?.message}>
        <div className="relative">
          <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="Min. 8 characters" className={`${inputClass} pr-10`} />
          <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        <PasswordStrengthBar password={password} />
      </Field>

      {/* Confirm Password */}
      <Field label="Confirm Password *" error={errors.confirmPassword?.message}>
        <div className="relative">
          <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input {...register('confirmPassword')} type={showConfirm ? 'text' : 'password'} placeholder="Re-enter password" className={`${inputClass} pr-10`} />
          <button type="button" onClick={() => setShowConfirm(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </Field>

      {/* Terms notice */}
      <p className="text-xs text-gray-400 text-center leading-relaxed">
        By creating an account you agree to the{' '}
        <a href="#" className="text-[#0098c8] font-semibold hover:underline">Terms of Service</a> and{' '}
        <a href="#" className="text-[#0098c8] font-semibold hover:underline">Privacy Policy</a>.
      </p>

      {/* Submit */}
      <button
        type="submit"
        disabled={registerMutation.isPending}
        className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-[#0098c8] to-[#0d2137] text-white font-bold text-sm rounded-xl shadow-sm hover:shadow-md hover:from-[#007aaa] hover:to-[#0d2137] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
      >
        {registerMutation.isPending ? (
          <><Loader2 size={16} className="animate-spin" /> Creating Account...</>
        ) : (
          'Create My Account'
        )}
      </button>

      {/* Sign in link */}
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 pt-1">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-[#0098c8] hover:text-[#0d2137] transition-colors">
          Sign In
        </Link>
      </p>
    </form>
  );
};
