import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, X, Check, Info } from 'lucide-react';
import { getStoredConsent, hasStoredConsent } from '../../utils/consent/storage';
import { acceptAllConsent, rejectAllConsent, updateCustomConsent } from '../../utils/consent/manager';
import type { ConsentSettings } from '../../utils/consent/types';
import GlowingButton from '../common/GlowingButton';

const ConsentDialog: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [settings, setSettings] = useState<ConsentSettings>(() => getStoredConsent());
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasStoredConsent()) {
      setIsVisible(true);
    }
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    localStorage.setItem('consent_dialog_open', 'true');
    navigate(path);
  };

  const handleAcceptAll = () => {
    acceptAllConsent(settings);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    rejectAllConsent(settings);
    setIsVisible(false);
  };

  const handleCustomize = (type: keyof ConsentSettings) => {
    const newSettings = {
      ...settings,
      [type]: settings[type] === 'granted' ? 'denied' : 'granted'
    };
    setSettings(newSettings);
  };

  const handleSavePreferences = () => {
    updateCustomConsent(settings);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-lg mx-auto bg-[#0B0F19] rounded-xl border border-gray-800 shadow-xl">
        <div className="flex items-center justify-between p-3 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-semibold text-white">Privacy Settings</h2>
          </div>
          {showDetails && (
            <button
              onClick={() => setShowDetails(false)}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="p-3">
          {!showDetails ? (
            <>
              <p className="text-sm text-gray-400 mb-4">
                We use cookies to enhance your browsing experience and analyze our traffic.
              </p>
              <div className="space-y-2">
                <GlowingButton
                  onClick={handleAcceptAll}
                  icon={<Check className="w-4 h-4" />}
                  fullWidth
                  size="sm"
                >
                  Accept All
                </GlowingButton>
                <GlowingButton
                  onClick={() => setShowDetails(true)}
                  variant="secondary"
                  fullWidth
                  size="sm"
                >
                  Customize
                </GlowingButton>
                <GlowingButton
                  onClick={handleRejectAll}
                  variant="outline"
                  fullWidth
                  size="sm"
                >
                  Reject All
                </GlowingButton>
                <div className="text-xs text-gray-400 text-center pt-2">
                  <Link to="/privacy" onClick={(e) => handleLinkClick(e, '/privacy')} className="text-emerald-400 hover:underline">Privacy Policy</Link>
                  {' • '}
                  <Link to="/cookie-policy" onClick={(e) => handleLinkClick(e, '/cookie-policy')} className="text-emerald-400 hover:underline">Cookie Policy</Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-3 mb-4">
                {Object.entries(settings).map(([key, value]) => (
                  <div key={key} className="flex items-start gap-3">
                    <button
                      onClick={() => handleCustomize(key as keyof ConsentSettings)}
                      className={`w-8 h-5 rounded-full transition-colors relative ${
                        value === 'granted' ? 'bg-emerald-500' : 'bg-gray-700'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-3 h-3 rounded-full bg-white transition-transform ${
                          value === 'granted' ? 'translate-x-3' : 'translate-x-0'
                        }`}
                      />
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-white">
                          {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <Info className="w-3 h-3 text-gray-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <GlowingButton
                onClick={handleSavePreferences}
                fullWidth
                size="sm"
              >
                Save Preferences
              </GlowingButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsentDialog;