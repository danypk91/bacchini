import { useState, useCallback } from 'react';

interface Props {
  years: number[];
  totalCount: number;
}

type FilterType = 'all' | 'year' | 'first-author' | 'highlighted';

export default function PublicationFilter({ years, totalCount }: Props) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(totalCount);

  const applyFilter = useCallback((filter: string) => {
    setActiveFilter(filter);

    const cards = document.querySelectorAll<HTMLElement>('[data-pub-card]');
    const dividers = document.querySelectorAll<HTMLElement>('[data-year-divider]');
    let count = 0;

    cards.forEach((card) => {
      let show = false;
      if (filter === 'all') {
        show = true;
      } else if (filter === 'first-author') {
        show = card.dataset.position === 'first' || card.dataset.position === 'co-first';
      } else if (filter === 'highlighted') {
        show = card.dataset.highlight === 'true';
      } else {
        // Year filter
        show = card.dataset.year === filter;
      }

      card.style.display = show ? '' : 'none';
      if (show) count++;
    });

    // Show/hide year dividers based on whether they have visible cards
    dividers.forEach((divider) => {
      const year = divider.dataset.yearDivider;
      if (filter === 'all') {
        divider.style.display = '';
      } else if (!isNaN(Number(filter))) {
        // Year filter: only show matching divider
        divider.style.display = year === filter ? '' : 'none';
      } else {
        // For first-author or highlighted, check if any card in that year is visible
        const yearCards = document.querySelectorAll<HTMLElement>(
          `[data-pub-card][data-year="${year}"]`
        );
        const hasVisible = Array.from(yearCards).some((c) => c.style.display !== 'none');
        divider.style.display = hasVisible ? '' : 'none';
      }
    });

    setVisibleCount(count);

    // Notify ScrollTrigger that layout changed so it recalculates positions
    requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent('publications:filtered'));
    });
  }, []);

  // Pill button style helper
  const pillClass = (filter: string) => {
    const isActive = activeFilter === filter;
    return [
      'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border',
      isActive
        ? 'bg-[#00d4ff]/15 text-[#00d4ff] border-[#00d4ff]/30'
        : 'bg-transparent text-[#94a3b8] border-[#1a1a2e] hover:border-[#94a3b8]/30 hover:text-[#e2e8f0]',
    ].join(' ');
  };

  return (
    <div className="sticky top-16 z-30 -mx-6 bg-[#0a0a0f]/90 px-6 py-4 backdrop-blur-lg border-b border-[#1a1a2e]">
      <div className="flex flex-wrap items-center gap-2">
        {/* All filter */}
        <button onClick={() => applyFilter('all')} className={pillClass('all')}>
          All
          <span className="ml-1.5 text-xs opacity-60">{totalCount}</span>
        </button>

        {/* Separator */}
        <div className="mx-1 h-4 w-px bg-[#1a1a2e]" />

        {/* Year filters */}
        {years.map((year) => (
          <button
            key={year}
            onClick={() => applyFilter(String(year))}
            className={pillClass(String(year))}
          >
            {year}
          </button>
        ))}

        {/* Separator */}
        <div className="mx-1 h-4 w-px bg-[#1a1a2e]" />

        {/* Special filters */}
        <button onClick={() => applyFilter('first-author')} className={pillClass('first-author')}>
          First Author
        </button>
        <button onClick={() => applyFilter('highlighted')} className={pillClass('highlighted')}>
          Highlighted
        </button>
      </div>

      {/* Result count */}
      {activeFilter !== 'all' && (
        <p className="mt-2 text-xs text-[#64748b]">
          Showing {visibleCount} of {totalCount} publications
        </p>
      )}
    </div>
  );
}
