/**
 * Products whose image on the product page is a real photograph, keyed
 * "<group-slug>/<product-slug>" (same keys as PRODUCT_IMAGE_FILES).
 * Every other product image is an AI-generated illustration and gets the
 * "Image for illustration only." note under the image card.
 */
export const REAL_PHOTO_KEYS: ReadonlySet<string> = new Set<string>([]);
