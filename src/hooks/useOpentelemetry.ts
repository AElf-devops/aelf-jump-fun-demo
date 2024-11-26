import { useEffect, useState } from 'react';
import { Tracer } from '@opentelemetry/sdk-trace-base';
import { initWebTracerWithZone } from 'opentelemetry-launcher';
import { APP_SETTINGS } from '../../appsettings';

export function useOpentelemetry() {
  const [webTracerWithZone, setWebTracerWithZone] = useState<Tracer>();
  useEffect(() => {
    const _webTracerWithZone = initWebTracerWithZone(
      APP_SETTINGS.openTelemetry,
    );
    setWebTracerWithZone(_webTracerWithZone);
    console.log('getWebTracerWithZone done');
  }, []);
  return webTracerWithZone;
}
