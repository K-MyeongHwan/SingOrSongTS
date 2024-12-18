import Song from "@/types/Song";
import apiConfig from "@/config/apiConfig";
import Singer from "@/types/Singer";

class SingerService {
    getSingerBySingerNum(singerNum :number) :Promise<Singer> {
        return apiConfig.get(`/api/singer/${singerNum}`)
    }
}

export default new SingerService();