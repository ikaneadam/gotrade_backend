import {Repository} from "typeorm";
import {AppDataSource} from "../data-source";
import {Profile} from "../entity/Profile";
import {User} from "../entity/User";

class ProfileDAO {
    private profileRepository: Repository<Profile>

    constructor() {
        this.profileRepository = AppDataSource.getRepository(Profile)
    }

    public async createProfile(user: User, houseNumber: string, postalCode: string, email: string, phoneNumber: string, profilePictureURL: string): Promise<Profile> {
        console.log(user)
        const profile = new Profile();
        profile.user = user
        profile.email = email
        profile.houseNumber = houseNumber
        profile.postalCode = postalCode
        profile.phoneNumber = phoneNumber
        profile.profilePictureURL = profilePictureURL
        return this.profileRepository.save(profile)
    }

    public async getProfile(userUUID: string): Promise<Profile> {
        const profile = await this.profileRepository.find({
                relations: {
                    user: true
                },
                where: {
                    user: {
                        UUID: userUUID
                    }
                }
            }
        )
        return profile[0]
    }

    public async updateProfile(userUUID: string, houseNumber: string, postalCode: string, email: string, phoneNumber: string, profilePictureURL: string): Promise<Profile> {
        const profile = await this.getProfile(userUUID)
        profile.email = email
        profile.houseNumber = houseNumber
        profile.postalCode = postalCode
        profile.phoneNumber = phoneNumber
        profile.profilePictureURL = profilePictureURL
        return this.profileRepository.save(profile)
    }

    public async doesProfileExist(userUUID: string): Promise<boolean>{
        const profile = await this.getProfile(userUUID)
        return profile !== undefined
    }
}

export default ProfileDAO
