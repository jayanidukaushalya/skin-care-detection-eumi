# Cataract Care Client

A modern web application built with Next.js and managed with pnpm.

## Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (version 16.x or higher)
- [pnpm](https://pnpm.io/) (version 7.x or higher)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/cataract-care-client.git
cd cataract-care-client
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `pnpm dev` - Starts the development server
- `pnpm build` - Creates an optimized production build
- `pnpm start` - Starts the production server
- `pnpm lint` - Runs ESLint to check code quality

## Project Structure

```
cataract-care-client/
├── .next/            # Next.js build output
├── node_modules/     # Project dependencies
├── public/          # Static files
├── src/             # Source code
│   ├── app/         # Routes
│   └── components/  # Support components
├── .env.example     # Environment variables template
├── .eslintrc.json   # ESLint configuration
├── .gitignore       # Git ignore rules
├── next.config.mjs  # Next.js configuration
├── package.json     # Project metadata and dependencies
├── pnpm-lock.yaml   # pnpm lock file
├── postcss.config.mjs # PostCSS configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── tsconfig.json    # TypeScript configuration
```

## Development

This project uses:
- [TypeScript](https://www.typescriptlang.org/) for type safety
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io/) for code formatting

## Build and Deployment

To create a production build:

```bash
pnpm build
pnpm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).