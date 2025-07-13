import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import {useRouter} from "next/router"
import { ReactElement, useEffect, useState } from 'react';
import 'chatui/dist/index.css';
import { Toaster } from 'react-hot-toast';
import ChatContext from '../context/ChatContext';
import { analytics } from '../utils/firebaseConfig';
import { logEvent } from 'firebase/analytics'

function SafeHydrate({ children }: { children: ReactElement }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  );
}

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const handleGoogleAnalytics = () => {
    const utmParams = new URLSearchParams(window.location.search);
    const utm_source = utmParams.get('utm_source');
  
    if (utm_source && analytics) {
      // Set the debug flag only once during initialization if required
      localStorage.setItem('firebase_debug_mode', 'true'); 
      
      console.log('Logging UTM source:', utm_source, analytics);
      logEvent(analytics, 'campaign', { // Use a standard Firebase event name like 'campaign'
        source: utm_source
      });
    }
  };

  useEffect(() => {      
      handleGoogleAnalytics();
  },[router.isReady])

  return (
    <ChakraProvider>
      <ChatContext>
        <div style={{ height: '100%' }}>
          <Toaster position="top-center" reverseOrder={false} />
          <SafeHydrate>
            <Component {...pageProps} />
          </SafeHydrate>
        </div>
      </ChatContext>
    </ChakraProvider>
  );
};

export default App;
