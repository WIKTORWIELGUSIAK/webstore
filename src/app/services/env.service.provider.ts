import { EnvService } from './env.service';

interface MyWindow extends Window {
  __env: Record<string, string>;
}

export const EnvServiceFactory = () => {
  const env = new EnvService();
  const browserWindow = window as unknown as MyWindow;
  const browserWindowEnv = browserWindow.__env || {};

  for (const key in browserWindowEnv) {
    if (browserWindowEnv.hasOwnProperty(key)) {
      (env as Record<string, any>)[key] = browserWindowEnv[key];
    }
  }

  return env;
};

export const EnvServiceProvider = {
  provide: EnvService,
  useFactory: EnvServiceFactory,
  deps: [],
};
