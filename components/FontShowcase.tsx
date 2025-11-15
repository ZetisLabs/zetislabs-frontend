/**
 * FontShowcase Component
 *
 * Usage example demonstrating all GeneralSans font weights and styles.
 * This component can be used to test and showcase the font implementation.
 *
 * @example
 * ```tsx
 * import FontShowcase from "@/components/FontShowcase";
 *
 * export default function TestPage() {
 *   return (
 *     <div className="container mx-auto p-8">
 *       <FontShowcase />
 *     </div>
 *   );
 * }
 * ```
 */
export default function FontShowcase() {
  return (
    <div className="space-y-8 p-8">
      <h1 className="text-3xl font-bold mb-6">GeneralSans Font Showcase</h1>

      {/* Extralight - 200 */}
      <div className="space-y-2">
        <p className="font-extralight text-2xl">
          Extralight (200): The quick brown fox jumps over the lazy dog
        </p>
        <p className="font-extralight italic text-2xl">
          Extralight Italic (200): The quick brown fox jumps over the lazy dog
        </p>
      </div>

      {/* Light - 300 */}
      <div className="space-y-2">
        <p className="font-light text-2xl">
          Light (300): The quick brown fox jumps over the lazy dog
        </p>
        <p className="font-light italic text-2xl">
          Light Italic (300): The quick brown fox jumps over the lazy dog
        </p>
      </div>

      {/* Regular - 400 */}
      <div className="space-y-2">
        <p className="font-normal text-2xl">
          Regular (400): The quick brown fox jumps over the lazy dog
        </p>
        <p className="font-normal italic text-2xl">
          Regular Italic (400): The quick brown fox jumps over the lazy dog
        </p>
      </div>

      {/* Medium - 500 */}
      <div className="space-y-2">
        <p className="font-medium text-2xl">
          Medium (500): The quick brown fox jumps over the lazy dog
        </p>
        <p className="font-medium italic text-2xl">
          Medium Italic (500): The quick brown fox jumps over the lazy dog
        </p>
      </div>

      {/* Semibold - 600 */}
      <div className="space-y-2">
        <p className="font-semibold text-2xl">
          Semibold (600): The quick brown fox jumps over the lazy dog
        </p>
        <p className="font-semibold italic text-2xl">
          Semibold Italic (600): The quick brown fox jumps over the lazy dog
        </p>
      </div>

      {/* Bold - 700 */}
      <div className="space-y-2">
        <p className="font-bold text-2xl">
          Bold (700): The quick brown fox jumps over the lazy dog
        </p>
        <p className="font-bold italic text-2xl">
          Bold Italic (700): The quick brown fox jumps over the lazy dog
        </p>
      </div>

      {/* Real-world usage example */}
      <div className="mt-12 p-6 glass glass-card--inline rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Real-World Usage Example</h2>
        <p className="font-normal text-base mb-2">
          This is body text using Regular weight (400). It's perfect for paragraphs
          and general content that needs good readability.
        </p>
        <p className="font-medium text-sm text-foreground/70">
          This is caption text using Medium weight (500). Great for supporting text
          and metadata.
        </p>
        <div className="mt-4">
          <button className="btn-primary font-semibold text-sm px-4 py-2 rounded-md">
            Button with Semibold (600)
          </button>
        </div>
      </div>

      {/* CSS Variable usage example */}
      <div className="mt-12 p-6 border border-border rounded-lg">
        <h3 className="text-xl font-bold mb-3">Using CSS Variables</h3>
        <code className="block bg-card p-4 rounded text-sm">
          font-family: var(--font-general-sans), ui-sans-serif, system-ui;
        </code>
        <p className="mt-3 text-sm font-normal">
          The font is available globally through the CSS variable
          <code className="px-1 py-0.5 bg-card rounded">--font-general-sans</code>
        </p>
      </div>

      {/* Tailwind usage instructions */}
      <div className="mt-12 p-6 border border-border rounded-lg">
        <h3 className="text-xl font-bold mb-3">Tailwind Usage</h3>
        <div className="space-y-2 text-sm">
          <p><code className="bg-card px-2 py-1 rounded">font-extralight</code> - Weight 200</p>
          <p><code className="bg-card px-2 py-1 rounded">font-light</code> - Weight 300</p>
          <p><code className="bg-card px-2 py-1 rounded">font-normal</code> - Weight 400</p>
          <p><code className="bg-card px-2 py-1 rounded">font-medium</code> - Weight 500</p>
          <p><code className="bg-card px-2 py-1 rounded">font-semibold</code> - Weight 600</p>
          <p><code className="bg-card px-2 py-1 rounded">font-bold</code> - Weight 700</p>
          <p><code className="bg-card px-2 py-1 rounded">italic</code> - Italic style</p>
        </div>
      </div>
    </div>
  );
}
