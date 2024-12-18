import apiConfig from "@/config/apiConfig";
import Platform from "@/types/Platform";

class PlatformService {
    getPlatformList() :Promise<Platform[]> {
        return apiConfig.get('/api/platform')
    }
    getUserCountByPlatId(platId :number) :Promise<Number[]> {
        return apiConfig.post(`/api/platform/${platId}`)
    }
}

export default new PlatformService();