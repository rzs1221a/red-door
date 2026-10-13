// Each page arrives with a short fade (globals.css .page-enter); the template remounts per route.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
