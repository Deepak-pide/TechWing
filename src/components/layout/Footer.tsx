"use client";

export default function Footer() {
  return (
    <footer className="bg-muted py-6">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} BetaFlight. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
