import CategoryDAO from "../dao/CategoryDAO";
import UserFromTokenExtractor from "../util/UserFromTokenExtractor";

class CategoryService {
    private readonly doa: CategoryDAO;
    private readonly tokenExtractor: UserFromTokenExtractor;

    constructor() {
        this.doa = new CategoryDAO()
        this.tokenExtractor = new UserFromTokenExtractor()
    }


}

export default CategoryService
