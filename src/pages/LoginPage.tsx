import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from '../components/ui/Toaster';

type AuthMode = 'login' | 'signup';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      let success = false;
      
      if (mode === 'login') {
        success = await login(email, password);
        if (success) {
          toast.success({ 
            title: 'Login successful',
            description: 'Welcome back to Blinkit!'
          });
          navigate('/');
        } else {
          setError('Invalid email or password');
        }
      } else {
        success = await signup(name, email, password);
        if (success) {
          toast.success({ 
            title: 'Account created',
            description: 'Welcome to Blinkit! Your account has been created successfully.'
          });
          navigate('/');
        } else {
          setError('Failed to create account. Please try again.');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container-custom py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="font-bold text-xl text-black">B</span>
            </div>
            <span className="font-bold text-xl">Blinkit</span>
          </div>
          <h1 className="text-xl font-semibold">
            {mode === 'login' ? 'Login to your account' : 'Create a new account'}
          </h1>
        </div>
        
        {error && (
          <div className="bg-error/10 text-error p-3 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Your name"
              />
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="your@email.com"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder={mode === 'login' ? 'Your password' : 'Create a password (6+ characters)'}
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-primary text-black font-medium rounded-md py-3 transition hover:bg-primary/90 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading 
              ? 'Processing...' 
              : mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          {mode === 'login' ? (
            <p className="text-sm text-text-secondary">
              Don't have an account? {' '}
              <button 
                onClick={() => setMode('signup')} 
                className="text-accent hover:underline"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p className="text-sm text-text-secondary">
              Already have an account? {' '}
              <button 
                onClick={() => setMode('login')} 
                className="text-accent hover:underline"
              >
                Login
              </button>
            </p>
          )}
        </div>
        
        <div className="border-t border-gray-100 mt-6 pt-6">
          <p className="text-xs text-text-secondary text-center">
            By continuing, you agree to our{' '}
            <Link to="/terms" className="text-accent hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-accent hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;