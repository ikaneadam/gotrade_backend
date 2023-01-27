import {DeleteResult, Repository} from "typeorm";
import {AppDataSource} from "../data-source";
import {Offer} from "../entity/Offer";
import NotificationDAO from "./NotificationDAO";
import {User} from "../entity/User";

class OfferDAO {
    private offerRepository: Repository<Offer>
    private notificationDAO: NotificationDAO

    constructor() {
        this.offerRepository = AppDataSource.getRepository(Offer)
        this.notificationDAO = new NotificationDAO()
    }


    public async updateOffer(offerUUID: string, offerPrice: number, user: User){
        const offer = await this.offerRepository.findOne({where: {UUID: offerUUID}})
        offer.offer = offerPrice
        return await this.offerRepository.save(offer).then(async (offer)=>{
            await this.notificationDAO.addProductOfferUpdateNotificationToUser(user, offerUUID)
            return offer
        })
    }

    public async deleteOffer(offerUUID: string, user: User): Promise<DeleteResult>{
        return await this.offerRepository.delete(offerUUID).then(async (deleteResult)=>{
            await this.notificationDAO.addProductOfferRevokedNotificationToUser(user, offerUUID)
            return deleteResult
        })
    }

    public async doesOfferExist(UUID: string): Promise<Boolean> {
        const offer = await this.offerRepository.findOne({where: {UUID: UUID}})
        return offer !== null
    }

    public async isOfferFromUser(offerUUID: string, userUUID: string): Promise<Boolean> {
        const offer = await this.offerRepository.findOne({
                relations: {
                    user: true,
                },
                where: {
                    UUID: offerUUID
                }
            }
        )

        if (offer === null) {
            return false
        }

        return offer.user.UUID === userUUID
    }
}

export default OfferDAO
