import Song from "@/types/Song";
import apiConfig from "@/config/apiConfig";
import Category from "@/types/Category";

class CategoryService {
    getCategoryByCategoryNum(categoryNum :number) :Promise<Category> {
        return apiConfig.get(`/api/category/${categoryNum}`)
    }
}

export default new CategoryService();