import * as api from '$lib/services/api';

export async function getCryptoPrice(id: string, currency: string): Promise<number[]> {
    const path = `coins/${id}/tickers`;
  
    console.log('cheogu')
    try {
      const data = await api.get(path);
  
      console.log('cheogu', data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const priceData = data.tickers.find((ticker: any) => ticker.target.toUpperCase() === currency.toUpperCase());
      console.log('cheogu', priceData)
      if (priceData) {
        return [priceData.last];
      } else {
        console.log(`Price not found for cryptocurrency or coin "${currency}".`);
        return [];
      }
    } catch (error) {
      console.error("Error fetching price:", error);
      return [];
    }
  }
  
  export function startPriceMonitoring(id: string, currency: string, interval: number = 5000): void {
    setInterval(async () => {
      const price = await getCryptoPrice(id, currency);
      if (price.length > 0) {
        console.log(`Current ${id} price in ${currency}: $${price[0]}`);
      }
    }, interval);
  }
  
