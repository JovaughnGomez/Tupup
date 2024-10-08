import { FindCategoryById, FindCategoryByName, FindCategoryWhichIncludesValue } from "@/app/controllers/categoryController";

export async function GetSearchDTO(value)
{
    const results = await FindCategoryWhichIncludesValue(value);
    if(!results.success)
        return results;

    const allCategories = [];
    results.categories.map((category) => 
        allCategories.push({ id: category.id, name: category.displayName, icon: category.icon, region: category.region })
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
            name: results.category.name,
            displayName: results.category.displayName,
            icon: results.category.icon,
            region: results.category.region,
            onSale: results.category.onSale,
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