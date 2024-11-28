# Cryptocurrency Dashboard

This project is an **interactive dashboard** for visualizing and analyzing cryptocurrency data in real-time. The goal is to provide dynamic and informative charts with the ability to apply filters and get periodic updates for cryptocurrency monitoring.

### **Technologies Used**
- **Svelte**: A modern, reactive framework for building user interfaces.
- **Skeleton**: A minimalistic CSS framework used for basic project structure and layout.
- **Tailwind CSS**: A utility-first CSS framework for building responsive and customizable interfaces.
- **ApexCharts**: A charting library used to create interactive and real-time visualizations of cryptocurrency data.
- **CoinGecko API**: A free API providing real-time and historical data on cryptocurrency prices, market caps, and trading volumes.

---

### **Features**
- **Interactive Charts**: 6 charts, with 3 of them updated in real-time using pooling requests.
- **Custom Filters**: Filters by date (last 7, 30, or 90 days), currency (USD, EUR, etc.), and cryptocurrency.
- **<[wip]> - Local Cache**: Uses **Local Storage** to store data and fallback when the API is offline. 
- **Responsiveness**: The interface is adaptable to desktop, tablet, and mobile devices.
- **<[Kind of]>Accessibility**: Supports keyboard navigation and provides clear chart labels for better accessibility.

---

### **How to Run the Project**

#### **Prerequisites**
Make sure you have **Node.js** installed on your machine. If not, download and install it from [Node.js](https://nodejs.org/).

1. Create a `.env` File

In the root of the project, create a `.env` file containing your CoinGecko API key. The file should define the variable `PUBLIC_COINGECKO_API_KEY` with your API key as the value:

```bash
PUBLIC_COINGECKO_API_KEY=YOUR_API_KEY
```
#### Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

#### Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

