import Markdoc from "@markdoc/markdoc";

export const partials = {
  "pagination-request": Markdoc.parse(`
    {% preview-object-item name="pagination" type="object" required=false description="List of pagination settings that can be applied to the request." /%}
    {% preview-object-item name="pagination.limit" type="string" required=false description="The amount of items to retrieve in a single request." /%}
    {% preview-object-item name="pagination.prev" type="string" required=false description="Fetch records in reverse order starting from the given cursor." /%}
    {% preview-object-item name="pagination.next" type="string" required=false description="Fetch records in forward order starting from the given cursor." note="If both a prev and next key is provided, only the prev value will be honored." /%}
  `),
  "pagination-response": Markdoc.parse(`
    {% preview-object-item name="result.pagination" type="object" description="Pagination results containing information for how to load prev and next results." /%}
    {% preview-object-item name="result.pagination.limit" type="number" description="Number of unspents set for the current request result." /%}
    {% preview-object-item name="result.pagination.prev" type="string" description="Value to provide to the pagination object in the next request." /%}
    {% preview-object-item name="result.pagination.next" type="string" description="Value to provide to the pagination object in the next request." /%}
  `)
};
