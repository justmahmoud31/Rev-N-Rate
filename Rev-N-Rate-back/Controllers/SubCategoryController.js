import SubCategory from '../Models/SubCategory.js';
import SubCatCatBrand from '../Models/SubCatcatBrand.js';
import Brand from '../Models/Brand.js';
import Category from '../Models/Category.js';

const AddSubCategory = async (req, res) => {
    const { categoryId, brandId } = req.params;
    const { subCategoryName, subCategoryPic } = req.body; 
    try {
        const category = await Category.Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        let brand = null;
        if (brandId) {
            brand = await Brand.findByPk(brandId);
            if (!brand) {
                return res.status(404).json({ error: "Brand not found" });
            }
        }

        if (!subCategoryName) {
            return res.status(400).json({ error: "subCategoryName is required" });
        }

        if (!subCategoryPic) {
            return res.status(400).json({ error: "subCategoryPic (URL) is required" });
        }

        const newSubCategory = await SubCategory.SubCategory.create({
            subCategoryName,
            subCategoryPic
        });

        await SubCatCatBrand.create({
            subCategoryId: newSubCategory.subCategoryId,
            categoryId: parseInt(categoryId, 10),
            brandId: brand ? brand.brandId : null
        });

        res.status(201).json({ Status: "Success", Message: "Sub Category has been Added", data: newSubCategory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getCategorySubCategories = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const existingCategory = await Category.Category.findByPk(categoryId);
        if (!existingCategory) {
            return res.status(404).json({ error: "Category not found" });
        }

        const subCatCatBrands = await SubCatCatBrand.findAll({ where: { categoryId } });
        if (subCatCatBrands.length === 0) {
            return res.status(404).json({ error: "No subcategories found for this category" });
        }

        const subCategoryIds = subCatCatBrands.map(sc => sc.subCategoryId);
        const brandIds = [...new Set(subCatCatBrands.map(sc => sc.brandId).filter(id => id !== null))];

        const [subCategories, brands] = await Promise.all([
            SubCategory.SubCategory.findAll({ where: { subCategoryId: subCategoryIds } }),
            Brand.findAll({ where: { brandId: brandIds } })
        ]);
        const subCategoryMap = subCategories.reduce((map, sc) => {
            map[sc.subCategoryId] = sc;
            return map;
        }, {});
        const brandMap = brands.reduce((map, brand) => {
            map[brand.brandId] = brand;
            return map;
        }, {});
        const result = [];
        subCatCatBrands.forEach(sc => {
            const subCategoryData = subCategoryMap[sc.subCategoryId];
            const brandData = sc.brandId ? brandMap[sc.brandId] : null;
            if (subCategoryData && (brandData || sc.brandId === null)) {
                result.push({
                    subCategory: subCategoryData,
                    brand: brandData
                });
            }
        });
        res.status(200).json({
            Status: "Success",
            Message: "Subcategories have been found",
            data: result
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};



export default { AddSubCategory, getCategorySubCategories };
