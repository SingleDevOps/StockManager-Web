# StockManager - 库存管理系统

StockManager is a comprehensive inventory management system built with Next.js & React. It allows businesses to track inventory, manage stock movements (in and out), and generate sales summaries. The application can run as a web application or as a desktop application via Electron.

## Features

### Core Functionality
- **Inventory Management**: Track current inventory levels with detailed information
- **Stock In/Out Operations**: Record incoming and outgoing stock movements
- **Product Management**: Add new products with detailed specifications
- **Product Code Management**: Maintain a database of product codes and specifications
- **Sales Summary**: View aggregated sales data and inventory status

### User Interface
- **Responsive Design**: Works on various screen sizes
- **Dark/Light Theme**: Toggle between dark and light modes based on user preference
- **Intuitive Navigation**: Simple button-based navigation to all system functions
- **Filtering Capabilities**: Filter data in tables by various criteria

## Technology Stack

### Frontend
- [Next.js 15](https://nextjs.org/) - React framework with hybrid static & server rendering
- [React 19](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

### Backend
- [Supabase](https://supabase.io/) - Open source Firebase alternative with PostgreSQL database
- Custom database abstraction layer for inventory operations

## Project Structure

```
stockmanager-web/
├── backend/              # Database operations and API secrets
├── electron/             # Electron main process files
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js app directory with all pages
│   │   ├── add-new-product/
│   │   ├── stock-in/
│   │   ├── stock-out/
│   │   ├── view-product-codes/
│   │   ├── view-sales-summary/
│   │   ├── view-stock/
│   │   ├── view-stock-in/
│   │   └── view-stock-out/
│   │   └── page.tsx      # Home page
│   │   └── layout.tsx    # Root layout
│   └── components/       # Reusable React components
├── out/                  # Exported static files (generated)
└── dist/                 # Packaged Electron app (generated)
```

## System Functions

### 1. View Stock (查看库存)
View current inventory levels with filtering capabilities. Displays detailed information including:
- Product code, type, brand, color, and size
- Initial stock, purchased quantity, sold quantity, and current stock
- Ability to filter by any field

### 2. View Stock In (查看入库)
View all stock-in records with date, product information, quantities, and remarks.

### 3. View Stock Out (查看出库)
View all stock-out records with date, product information, quantities, and remarks.

### 4. View Product Codes (查看货物编码)
Maintain and view the product code database with full product specifications.

### 5. View Sales Summary (查看销售汇总)
View aggregated sales data showing product information, quantities sold, current stock levels, and sales figures.

### 6. Stock In (入库)
Record incoming stock with:
- Date of entry
- Product code and details
- Quantity received
- Remarks

### 7. Stock Out (出库)
Record outgoing stock with:
- Date of exit
- Product code and details
- Quantity dispatched
- Remarks

### 8. Add New Product (新增货物)
Add new products to the inventory system with:
- Product code
- Product type, brand, name, color, and size
- Initial quantity

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd stockmanager-web
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Development

To run the application in development mode:

```bash
npm run dev
```

This will start the Next.js development server on [http://localhost:3000](http://localhost:3000).

### Building for Web

To build the application for web deployment:

```bash
npm run build
npm run start
```

This will create an optimized production build and start the server.

## Database Structure

The application uses Supabase (PostgreSQL) with the following tables:

1. **库存表 (Inventory Table)**: Stores current inventory levels and product information
2. **入库表 (Stock In Table)**: Records all incoming stock transactions
3. **出库表 (Stock Out Table)**: Records all outgoing stock transactions
4. **货物编码表 (Product Code Table)**: Maintains the product code database
5. **销售汇总 (Sales Summary Table)**: Aggregated sales data

## Environment Variables

Create a `.env.local` file in the root directory with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

These values should also be configured in the [API_Secret.ts](file:///C:/StockManager-Web/stockmanager-web/backend/API_Secret.ts) file in the backend directory.

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run export` - Export as static files

## Deployment

### Web Deployment
The application can be deployed to any platform that supports Next.js, such as:
- Vercel (recommended)
- Netlify
- Traditional Node.js servers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to Next.js team for the excellent React framework
- Tailwind CSS for the utility-first CSS framework
- Supabase for the easy-to-use backend solution
- Electron team for making cross-platform desktop apps possible with web technologies
