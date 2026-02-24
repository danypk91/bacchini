/**
 * Highlights "Bacchini" in an author string by wrapping it in <strong> tags.
 */
export function highlightAuthor(authors: string, name = 'Bacchini'): string {
  return authors.replace(
    new RegExp(`(${name})`, 'g'),
    '<strong class="text-text-primary font-semibold">$1</strong>',
  );
}

/**
 * Generates a DOI URL from a DOI string.
 */
export function doiUrl(doi: string): string {
  if (doi.startsWith('http')) return doi;
  return `https://doi.org/${doi}`;
}

/**
 * Generates an arXiv URL from an arXiv ID.
 */
export function arxivUrl(arxivId: string): string {
  if (arxivId.startsWith('http')) return arxivId;
  return `https://arxiv.org/abs/${arxivId}`;
}
