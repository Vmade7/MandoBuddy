import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Sparkles, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { register as registerApi } from '@/services/auth';

export function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    displayName?: string;
    email?: string;
    password?: string;
  }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (displayName.trim().length === 0) errs.displayName = 'Please enter your display name';
    if (displayName.trim().length > 50) errs.displayName = 'Display name must be 50 characters or fewer';
    if (!email.includes('@')) errs.email = 'Please enter a valid email address';
    if (password.length < 6) errs.password = 'Password must be at least 6 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await registerApi({ email, password, display_name: displayName.trim() });
      login(res.data.access_token);
      toast.success('Account created! Welcome to MandoBuddy 🎉');
      navigate('/');
    } catch {
      // error toast already shown by apiClient
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <a href="/" className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <span className="font-semibold text-xl text-foreground">MandoBuddy</span>
          </a>
          <h1 className="text-2xl font-semibold text-foreground mt-4">Create Account</h1>
          <p className="text-muted-foreground text-sm mt-1">Start your Mandarin learning journey</p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl border border-border/50 shadow-sm p-8">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* Display Name */}
            <div>
              <label className="text-sm text-foreground mb-1.5 block">Display Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  autoComplete="name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name"
                  maxLength={50}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                    errors.displayName
                      ? 'border-red-300 focus:border-red-400 bg-red-50'
                      : 'border-border focus:border-primary bg-secondary/20'
                  }`}
                />
              </div>
              {errors.displayName && <p className="text-xs text-red-500 mt-1">{errors.displayName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-foreground mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                    errors.email
                      ? 'border-red-300 focus:border-red-400 bg-red-50'
                      : 'border-border focus:border-primary bg-secondary/20'
                  }`}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm outline-none transition-colors ${
                    errors.password
                      ? 'border-red-300 focus:border-red-400 bg-red-50'
                      : 'border-border focus:border-primary bg-secondary/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white rounded-xl py-3 text-sm font-medium transition-all hover:shadow-md"
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>
        </div>

        {/* Login link */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
