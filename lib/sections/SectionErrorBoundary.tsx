"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  sectionId: string;
  sectionType: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * SectionErrorBoundary
 *
 * Catches errors in individual sections and displays a fallback UI,
 * preventing the entire page from crashing.
 */
export class SectionErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error in development
    if (process.env.NODE_ENV === "development") {
      console.error(
        `[SectionErrorBoundary] Error in section "${this.props.sectionType}" (${this.props.sectionId}):`,
        error,
        errorInfo
      );
    }
  }

  render() {
    if (this.state.hasError) {
      // Show minimal fallback in production, detailed in development
      if (process.env.NODE_ENV === "development") {
        return (
          <section className="flex scroll-section flex-col justify-center py-16 md:py-24">
            <div className="mx-auto w-full max-w-screen-xl px-4">
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                    <svg
                      className="h-5 w-5 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-red-400">
                      Section Error: {this.props.sectionType}
                    </h3>
                    <p className="mt-1 text-sm text-red-300/70">
                      ID: {this.props.sectionId}
                    </p>
                    <pre className="mt-4 overflow-x-auto rounded-lg bg-red-950/50 p-4 text-xs text-red-200">
                      {this.state.error?.message}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      }

      // Production: show nothing or a minimal placeholder
      return null;
    }

    return this.props.children;
  }
}
