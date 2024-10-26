import './globals.css';
import { ThemeProvider } from '../context/ThemeContext'; // Ensure this is the correct path

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>  {/* Wrap the app with ThemeProvider */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}