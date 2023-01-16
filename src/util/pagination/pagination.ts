import { PaginationResult } from './pagination.results';
import { PaginationOptions } from './pagination.options';

export class Pagination<PaginationEntity> {
    private data: PaginationEntity[]
    private nextPage: number
    private previousPage: number
    private hasNextPage: boolean
    private hasPreviousPage: boolean
    private lastPage: number

    constructor(paginationResults: PaginationResult<PaginationEntity>, paginationOptions: PaginationOptions) {
        this.data = paginationResults.data;
        this.hasNextPage = paginationOptions.limit * paginationOptions.page < paginationResults.total
        this.hasPreviousPage = paginationOptions.page > 1
        this.nextPage = paginationOptions.page + 1
        this.previousPage = paginationOptions.page - 1
        this.lastPage = Math.ceil( paginationResults.total / paginationOptions.limit)
    }
}

