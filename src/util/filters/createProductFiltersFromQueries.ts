import {ProductFilterOptions} from "./productFilter.options";
import {Between, LessThan, MoreThan} from "typeorm";

export class CreateProductFiltersFromQueries {

    private static isFilterPresent(filter: string): boolean{
        return undefined !== filter
    }

    public static createFilterOptions(productFilterOptions: ProductFilterOptions){
        let query = {Active: true}
        query = this.addUserFilterToQuery(query, productFilterOptions.user)
        query = this.addCategoryFilterToQuery(query, productFilterOptions.category)
        query = this.addPriceFilterToQuery(query, productFilterOptions.minimumPrice, productFilterOptions.maximumPrice)
        return query
    }

    private static addUserFilterToQuery(query: any, userQuery: string) {
        if (!this.isFilterPresent(userQuery)) {
            return query
        }
        const userFilter = {
            UUID: userQuery
        }
        query.user = userFilter
        return query
    }

    private static addCategoryFilterToQuery(query: any, categoryQuery: string){
        if (!this.isFilterPresent(categoryQuery)) {
            return query
        }

        const categoryFilter = {
            category: categoryQuery
        }

        query.category = categoryFilter
        return query
    }

    private static addPriceFilterToQuery(query: any, minimumPrice: string, maximumPrice: string){
        if (this.isFilterPresent(minimumPrice) && this.isFilterPresent(maximumPrice)) {
            query.price = Between(minimumPrice, maximumPrice)
            return query
        }

        if (this.isFilterPresent(minimumPrice)) {
            query.price = MoreThan(minimumPrice)
            return query
        }

        if (this.isFilterPresent(maximumPrice)) {
            query.price = LessThan(maximumPrice)
            return query
        }

        return query
    }
}

