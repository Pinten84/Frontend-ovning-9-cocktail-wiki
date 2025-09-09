
// Allow TypeScript to import CSS files
declare module '*.css';

// Extend Window type for dropCoconut
interface Window {
	dropCoconut?: () => void;
}
