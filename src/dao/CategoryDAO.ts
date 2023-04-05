import {Repository} from "typeorm";
import {AppDataSource} from "../data-source";
import {Review} from "../entity/Review";

class ReviewDAO {
    private reviewRepository: Repository<Review>

    constructor() {
        this.reviewRepository = AppDataSource.getRepository(Review)
    }

}

export default ReviewDAO
