import { useCallback } from 'react';

type HapticPattern = 'light' | 'medium' | 'success' | 'warning' | 'error';

export const useEliteInteractions = () => {
  const triggerHaptic = useCallback((pattern: HapticPattern = 'light') => {
    // Safety check for browser support
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        switch (pattern) {
          case 'light':
            // Subtle tap for menu clicks
            navigator.vibrate(10);
            break;
          case 'medium':
            // Standard button press
            navigator.vibrate(20);
            break;
          case 'success':
            // Double pulse for successful actions
            navigator.vibrate([50, 30, 50]);
            break;
          case 'warning':
            // Rapid vibration
            navigator.vibrate([30, 50, 30]);
            break;
          case 'error':
            // Long vibration
            navigator.vibrate([50, 100, 50, 100]);
            break;
          default:
            navigator.vibrate(10);
        }
      } catch (e) {
        // Fail silently on unsupported devices/browsers that might throw
      }
    }
  }, []);

  return { triggerHaptic };
};