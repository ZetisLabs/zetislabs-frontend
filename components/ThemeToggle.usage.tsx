/**
 * Usage example (not executed by the app):
 *
 * This demonstrates how to render the ThemeToggle inside any client component.
 * You can run the app (`npm run dev`) and use the toggle in the header.
 */
import ThemeToggle from "@/components/ThemeToggle";

export default function Example() {
  return (
    <div className="flex items-center gap-3 p-4 border border-border rounded-md bg-card">
      <span className="text-sm">Toggle theme</span>
      <ThemeToggle />
    </div>
  );
}

