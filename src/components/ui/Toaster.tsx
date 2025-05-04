import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export type ToastProps = {
  id?: string;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
};

type ToastState = ToastProps & {
  id: string;
  visible: boolean;
};

let toastCount = 0;
const toasts: ToastState[] = [];
let listeners: ((toasts: ToastState[]) => void)[] = [];

// Toast functions
export const toast = {
  success: (props: Omit<ToastProps, 'type'>) => addToast({ ...props, type: 'success' }),
  error: (props: Omit<ToastProps, 'type'>) => addToast({ ...props, type: 'error' }),
  info: (props: Omit<ToastProps, 'type'>) => addToast({ ...props, type: 'info' }),
  custom: (props: ToastProps) => addToast(props),
};

const addToast = (toast: ToastProps) => {
  const id = toast.id || `toast-${++toastCount}`;
  const newToast: ToastState = {
    ...toast,
    id,
    visible: true,
    type: toast.type || 'info',
    duration: toast.duration || 3000,
  };
  
  toasts.push(newToast);
  notifyListeners();
  
  setTimeout(() => {
    dismissToast(id);
  }, newToast.duration);
  
  return id;
};

const dismissToast = (id: string) => {
  const index = toasts.findIndex(t => t.id === id);
  if (index !== -1) {
    toasts[index].visible = false;
    notifyListeners();
    
    // Remove from array after animation
    setTimeout(() => {
      const removeIndex = toasts.findIndex(t => t.id === id);
      if (removeIndex !== -1) {
        toasts.splice(removeIndex, 1);
        notifyListeners();
      }
    }, 300);
  }
};

const notifyListeners = () => {
  listeners.forEach(listener => listener([...toasts]));
};

// Toaster component
export const Toaster = () => {
  const [currentToasts, setCurrentToasts] = useState<ToastState[]>([]);
  
  useEffect(() => {
    const updateToasts = (newToasts: ToastState[]) => {
      setCurrentToasts([...newToasts]);
    };
    
    listeners.push(updateToasts);
    return () => {
      listeners = listeners.filter(listener => listener !== updateToasts);
    };
  }, []);
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
      {currentToasts.map((toast) => (
        <div
          key={toast.id}
          className={`bg-white rounded-lg shadow-lg p-4 transition-all duration-300 ${
            toast.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          } ${
            toast.type === 'success' ? 'border-l-4 border-success' : 
            toast.type === 'error' ? 'border-l-4 border-error' : 
            'border-l-4 border-primary'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-sm">{toast.title}</h3>
              {toast.description && (
                <p className="text-text-secondary text-xs mt-1">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};