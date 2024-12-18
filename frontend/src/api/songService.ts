import Song from "@/types/Song";
import apiConfig from "@/config/apiConfig";

class SongService {
    getSongList() :Promise<Song[]> {
        return apiConfig.get('/api/song')
    }
}

export default new SongService();