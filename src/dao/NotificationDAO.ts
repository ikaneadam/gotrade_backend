import {Repository} from "typeorm";
import { Notification } from "../entity/Notification"
import {AppDataSource} from "../data-source";
import {User} from "../entity/User";
import {PaginationOptions} from "../util/pagination/pagination.options";
import {Pagination} from "../util/pagination/pagination";
import Translate from "../util/translate";
import notificationMessages from "../nl.json";

class NotificationDAO {
    private notificationRepository: Repository<Notification>

    constructor() {
        this.notificationRepository = AppDataSource.getRepository(Notification)
    }

    public async getNotification(UUID: string): Promise<Notification> {
        const notification = await this.notificationRepository.find({
                where: {
                    UUID: UUID
                }
            }
        )
        return notification[0]
    }

    public async getNotificationsFromUser(userUUID: string, options: PaginationOptions): Promise<Pagination<Notification>> {
        const [data, total] = await this.notificationRepository.findAndCount({
                take: options.limit,
                skip: (options.page-1) * options.limit,
                where: {
                    user: {
                        UUID: userUUID
                    }
                },
                order: {
                    createdDate: "ASC"
                }
            }
        )
        return new Pagination<Notification>({data, total}, options);
    }

    public async doesNotificationExist(UUID: string): Promise<Boolean> {
        const product = await this.notificationRepository.findOne({where: {UUID: UUID}})
        return product !== null
    }

    public async createNotification(user: User, notificationText: string, about: string): Promise<Notification> {
        const notification = new Notification()
        notification.notification = notificationText;
        notification.user = user
        notification.about = about
        return await this.notificationRepository.save(notification)
    }

    public async addProductOfferNotificationToUser(user: User, productUUID: string, offer: number): Promise<Notification> {
        const notification: string = Translate.translate(notificationMessages.notifications.incomingOffer, user.username, String(offer))
        return await this.createNotification(user, notification, productUUID)
    }

    public async addProductOfferUpdateNotificationToUser(user: User, productUUID: string): Promise<Notification> {
        const notification: string = Translate.translate(notificationMessages.notifications.updatedOffer, user.username)
        return await this.createNotification(user, notification, productUUID)
    }

    public async addProductOfferRevokedNotificationToUser(user: User, productUUID: string): Promise<Notification> {
        const notification: string = Translate.translate(notificationMessages.notifications.withdrawnOffer, user.username)
        return await this.createNotification(user, notification, productUUID)
    }
}

export default NotificationDAO
