"use client";
import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Monitor } from 'lucide-react';

const PWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if running on iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Check if already installed (standalone mode)
    const standalone = window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
    setIsStandalone(standalone);

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      console.log('beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setShowInstallBanner(false);
      setDeferredPrompt(null);
      console.log('PWA was installed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Show banner after 10 seconds, but only if we have a real install prompt or iOS
    const timer = setTimeout(() => {
      console.log('Timer fired - iOS:', iOS, 'Standalone:', standalone, 'DeferredPrompt:', !!deferredPrompt);
      if (iOS && !standalone) {
        setShowInstallBanner(true);
      } else if (deferredPrompt && !standalone) {
        setShowInstallBanner(true);
      }
      // Don't force show banner without proper install support
    }, 10000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      clearTimeout(timer);
    };
  }, [deferredPrompt, isStandalone]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }

      setDeferredPrompt(null);
      setShowInstallBanner(false);
    }
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if already installed
  if (isStandalone) {
    return null;
  }

  // Check if dismissed this session (but allow override for testing)
  const isDismissed = typeof window !== 'undefined' &&
    sessionStorage.getItem('pwa-install-dismissed');
  const isTest = typeof window !== 'undefined' &&
    window.location.search.includes('pwa-test');

  if (isDismissed && !isTest) {
    return null;
  }

  // iOS Install Instructions
  if (isIOS && showInstallBanner) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-50 bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 max-w-sm mx-auto">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-rose-500 rounded-xl flex items-center justify-center mr-4">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Install App</h3>
            <p className="text-sm text-gray-600">Add to Home Screen</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Install Why Designers app for the best experience:
        </p>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3">1</span>
            Tap the Share button
          </div>
          <div className="flex items-center">
            <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3">2</span>
            Select "Add to Home Screen"
          </div>
          <div className="flex items-center">
            <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3">3</span>
            Tap "Add" to install
          </div>
        </div>
      </div>
    );
  }

  // Android/Desktop Install Banner (only show if we have deferredPrompt)
  if (showInstallBanner && !isIOS && deferredPrompt) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-50 bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 max-w-sm mx-auto">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-rose-500 rounded-xl flex items-center justify-center mr-4">
            <Download className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Install App</h3>
            <p className="text-sm text-gray-600">Get the full experience</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Install Why Designers for faster access, offline support, and a native app experience.
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleInstallClick}
            className="flex-1 bg-gradient-to-r from-amber-600 to-rose-500 text-white px-4 py-2 rounded-full font-medium text-sm hover:from-amber-700 hover:to-rose-600 transition-all duration-200"
          >
            Install Now
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-2 text-gray-600 text-sm hover:text-gray-800 transition-colors"
          >
            Later
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default PWAInstall;