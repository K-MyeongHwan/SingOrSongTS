import apiConfig from "@/config/apiConfig";
import User from "@/types/User";

class UserService {
    getUserBirthList() :Promise<String[]>{
        return apiConfig.post('/api/user/userBirth');
    }
}

export default new UserService();