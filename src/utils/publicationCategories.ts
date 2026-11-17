/**
 * Status-based filter categories shown on the Publications page, right after
 * the "All" pill. To add a category, append an entry here: `statuses` lists the
 * `status` values (from the publication YAML files) that belong to it.
 * A category with no matching papers is not shown.
 */
export const PUBLICATION_STATUSES = ['submitted', 'preprint', 'accepted', 'published'] as const;

export type PublicationStatus = (typeof PUBLICATION_STATUSES)[number];

export interface PublicationCategory {
  id: string;
  label: string;
  statuses: PublicationStatus[];
}

export const publicationCategories: PublicationCategory[] = [
  // Papers that are ready but not published yet.
  { id: 'preprints', label: 'Preprints', statuses: ['submitted', 'preprint', 'accepted'] },
];
