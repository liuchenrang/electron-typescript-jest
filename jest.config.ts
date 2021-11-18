import type {Config} from '@jest/types';


// Or async function
export default async (): Promise<Config.InitialOptions> => {
  return {
    preset: "ts-jest",
    verbose: true,
  };
};
