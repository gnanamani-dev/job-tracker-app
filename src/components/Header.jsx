const TABS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "applications", label: "Applications" },
  { id: "add", label: "+ Add job" },
];

export default function Header({ view, onChange, theme, onToggleTheme }) {
  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="brand">Job Tracker</h1>
        <div className="header-right">
          <nav className="nav">
            {TABS.map((t) => (
              <button
                key={t.id}
                className={`nav-btn ${view === t.id ? "active" : ""}`}
                onClick={() => onChange(t.id)}
              >
                {t.label}
              </button>
            ))}
          </nav>
          <button
            className="theme-btn"
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            {theme === "dark" ? "\u2600\uFE0F" : "\uD83C\uDF19"}
          </button>
        </div>
      </div>
    </header>
  );
}