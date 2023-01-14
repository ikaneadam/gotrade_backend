import { PaginationResultInterface } from './pagination.results';

export class Pagination<PaginationEntity> {
    public data: PaginationEntity[];
    public page_total: number;
    public total: number;

    constructor(paginationResults: PaginationResultInterface<PaginationEntity>) {
        this.data = paginationResults.data;
        this.page_total = paginationResults.data.length;
        this.total = paginationResults.total;
    }
}