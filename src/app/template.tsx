/** Replays a short entrance on every route change (CSS only, no JS). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
