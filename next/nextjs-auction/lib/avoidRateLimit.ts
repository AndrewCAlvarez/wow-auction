export function avoidRateLimit(delay = 500) {
  // if (!process.env.IS_BUILD) {
  //   return;
  // }

  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

// DELAYS in ms. Used to avoid rate limits
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
