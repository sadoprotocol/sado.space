import Markdoc from "@markdoc/markdoc";

export const partials = {
  "pagination-response": Markdoc.parse(`
    {% preview-object-item name="result.pagination" type="object" description="Pagination results containing information for how to load prev and next results." /%}
    {% preview-object-item name="result.pagination.limit" type="number" description="Number of unspents set for the current request result." /%}
    {% preview-object-item name="result.pagination.prev" type="string" description="Value to provide to the pagination object in the next request." /%}
    {% preview-object-item name="result.pagination.next" type="string" description="Value to provide to the pagination object in the next request." /%}
  `)
};
