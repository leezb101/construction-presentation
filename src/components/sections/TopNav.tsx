import type { NavItem } from "../../types";

export function TopNav({
  items,
  activeId,
}: {
  items: NavItem[];
  activeId: string;
}) {
  return (
    <header className="top-nav">
      <div className="brand-mark">
        <span className="brand-mark__badge" />
        <div>
          <strong>线性工地人机管理系统</strong>
          <span>郑州水务集团水务科技公司汇报示意</span>
        </div>
      </div>
      <nav>
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={item.id === activeId ? "is-active" : ""}
            aria-current={item.id === activeId ? "location" : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
