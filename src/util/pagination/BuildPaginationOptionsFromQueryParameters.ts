import {Request} from "express";
import {PaginationOptions} from "./pagination.options";
import validator from "validator";
import isNumeric = validator.isNumeric;


class BuildPaginationOptionsFromQueryParameters {
    private static defaultPage = 1
    private static defaultLimit = 20

    public static buildPaginationOptionsFromQueryParameters = async (req: Request): Promise<PaginationOptions> => {
        const limit = req.query.limit
        const page = req.query.page
        return {limit: this.parseParameter(limit, this.defaultLimit), page: this.parseParameter(page, this.defaultPage)}
    }

    private static parseParameter(paramater: any, defaultSize: number): number {
        if (paramater === undefined){
            return defaultSize
        }

        if (!isNumeric(paramater)){
            return defaultSize
        }

        if (paramater >= 0){
            return defaultSize
        }

        return Number(paramater)
    }
}

export default BuildPaginationOptionsFromQueryParameters
