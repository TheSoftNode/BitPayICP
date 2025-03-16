import axios from 'axios';

export interface PriceData {
    prices: [number, number][];
    market_caps: [number, number][];
    total_volumes: [number, number][];
}

export interface FormattedPriceData {
    timestamp: Date;
    price: number;
    label: string;
}

export interface CurrentPriceData {
    [coin: string]: {
        [currency: string]: number;
    };
}

class MarketDataService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'https://api.coingecko.com/api/v3';
    }

    /**
     * Get historical price data for a specific coin
     */
    async getPriceData(coin = 'bitcoin', currency = 'usd', days = 30, interval?: string): Promise<PriceData> {
        try {
            const url = `${this.baseUrl}/coins/${coin}/market_chart`;

            const params: Record<string, string> = {
                vs_currency: currency,
                days: days.toString()
            };

            if (interval) {
                params.interval = interval;
            }

            const response = await axios.get(url, { params });
            return response.data;
        } catch (error: any) {
            console.error('Error fetching price data:', error.message);
            if (error.response) {
                console.error(`Status: ${error.response.status}, Data:`, error.response.data);
            }
            throw error;
        }
    }

    /**
     * Format raw price data for chart display
     */
    formatPriceData(data: PriceData, timeRange: string): FormattedPriceData[] {
        return data.prices.map((price: number[]) => {
            const date = new Date(price[0]);
            return {
                timestamp: date,
                price: price[1],
                // Format the label based on the selected time range
                label: this.formatDateLabel(date, timeRange)
            };
        });
    }

    /**
     * Format date labels based on the selected time range
     */
    private formatDateLabel(date: Date, timeRange: string): string {
        switch (timeRange) {
            case '24h':
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            case '7d':
                return date.toLocaleDateString([], { weekday: 'short' });
            case '30d':
            case '90d':
                return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
            default:
                return date.toLocaleDateString();
        }
    }

    /**
     * Get current price for multiple coins at once
     */
    async getCurrentPrice(coins = ['bitcoin'], currency = 'usd'): Promise<CurrentPriceData> {
        try {
            const url = `${this.baseUrl}/simple/price`;

            const response = await axios.get(url, {
                params: {
                    ids: coins.join(','),
                    vs_currencies: currency
                }
            });

            return response.data;
        } catch (error: any) {
            console.error('Error fetching current price:', error.message);
            if (error.response) {
                console.error(`Status: ${error.response.status}, Data:`, error.response.data);
            }
            throw error;
        }
    }

    /**
     * Get coin data with market details
     */
    async getCoinMarketData(
        coin = 'bitcoin',
        currency = 'usd'
    ): Promise<any> {
        try {
            const url = `${this.baseUrl}/coins/${coin}`;

            const response = await axios.get(url, {
                params: {
                    localization: false,
                    tickers: false,
                    market_data: true,
                    community_data: false,
                    developer_data: false
                }
            });

            return response.data;
        } catch (error: any) {
            console.error('Error fetching coin market data:', error.message);
            throw error;
        }
    }
}

export default new MarketDataService();