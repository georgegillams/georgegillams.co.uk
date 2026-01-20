import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const CloudflareTurnstile = props => {
  const { siteKey, onVerify, onError, onExpire, theme, size, className, ...rest } = props;
  const turnstileRef = useRef(null);
  const [widgetId, setWidgetId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load Turnstile script
  useEffect(() => {
    const loadTurnstileScript = () => {
      if (window.turnstile) {
        setIsLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      script.onload = () => setIsLoaded(true);
      script.onerror = () => {
        // eslint-disable-next-line no-console
        console.error('Failed to load Cloudflare Turnstile script');
        if (onError) onError('Failed to load Turnstile script');
      };
      document.head.appendChild(script);
    };

    loadTurnstileScript();
  }, [onError]);

  // Render Turnstile widget when script is loaded
  useEffect(() => {
    if (isLoaded && window.turnstile && turnstileRef.current && !widgetId) {
      const id = window.turnstile.render(turnstileRef.current, {
        sitekey: siteKey,
        callback: onVerify,
        'error-callback': onError,
        'expired-callback': onExpire,
        theme: theme || 'auto',
        size: size || 'normal',
      });
      setWidgetId(id);
    }
  }, [isLoaded, siteKey, onVerify, onError, onExpire, theme, size, widgetId]);

  // Reset widget when component unmounts
  useEffect(() => {
    return () => {
      if (widgetId && window.turnstile) {
        try {
          window.turnstile.remove(widgetId);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn('Error removing Turnstile widget:', error);
        }
      }
    };
  }, [widgetId]);

  // Method to reset the widget
  const reset = useCallback(() => {
    if (widgetId && window.turnstile) {
      window.turnstile.reset(widgetId);
    }
  }, [widgetId]);

  // Expose reset method via ref
  useEffect(() => {
    if (rest.ref && typeof rest.ref === 'object') {
      rest.ref.current = { reset };
    }
  }, [rest.ref, reset]);

  return <div ref={turnstileRef} className={className} />;
};

CloudflareTurnstile.propTypes = {
  siteKey: PropTypes.string.isRequired,
  onVerify: PropTypes.func,
  onError: PropTypes.func,
  onExpire: PropTypes.func,
  theme: PropTypes.oneOf(['light', 'dark', 'auto']),
  size: PropTypes.oneOf(['normal', 'compact']),
  className: PropTypes.string,
};

CloudflareTurnstile.defaultProps = {
  onVerify: () => {},
  onError: () => {},
  onExpire: () => {},
  theme: 'auto',
  size: 'normal',
  className: null,
};

export default CloudflareTurnstile;
