// app/layout.tsx
import { AuthProvider } from './context/authContext';
import './globals.css';


export const metadata = {
    title: 'Role Based Access Control',
    description: 'Next.js App with Role-Based Access Control',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}
