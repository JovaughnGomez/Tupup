import { FindCategoryById, FindCategoryByName, FindCategoryWhichIncludesValue } from "@/app/controllers/categoryController";

export async function GetSearchDTO(value, type)
{
    const results = await FindCategoryWhichIncludesValue(value, type);
    if(!results.success)
        return results;

    const allCategories = [];
    results.categories.map((category) => 
        allCategories.push({ id: category.id, actualName: category.name, name: category.displayName, icon: category.icon, region: category.region })
    )
    
    return { success: true, categories:allCategories }
}

export async function GetCategoryDTO(name)
{
    const results = await FindCategoryByName(name);
    if(!results.success)
        return results;

    return {
        success: true,
        category: {
            id: results.category.id,
            productType: results.category.productType,
            name: results.category.name,
            displayName: results.category.displayName,
            icon: results.category.icon,
            region: results.category.region,
            allowMultiple: results.category.allowMultiple,
            notes: results.category.notes,
            description: results.category.description,
            guide: results.category.guide,
        }
    }
}

export async function GetControlPanelDTO(id)
{
    const results = await FindCategoryById(id);
    if(!results.success)
        return results;

    return {
        id: results.category.id,
        name: results.category.name,
        displayName: results.category.displayName,
    }
}