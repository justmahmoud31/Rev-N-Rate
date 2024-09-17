/* eslint-disable */

import { Navigate, useLocation, useNavigate } from "react-router-dom";
import CategoryItem from "../Componants/CategoryItem";
import Header from "../Componants/Header";
import Heading from "../Componants/Headnig";
import useBrands from "../Context/BrandsContext";
import useCategories from "../Context/CategoriesContext";
import { useEffect, useState } from "react";
import Footer from "../Componants/Footer";

function OneCategoryScreen() {
  const { allBrands, brandLoading } = useBrands();
  const { allCategories, loading } = useCategories();
  const navigate = useNavigate();
  const location = useLocation();
  const { category } = location.state;

  const [categoryBrands, setCategoryBrands] = useState([]);

  useEffect(() => {
    if (allBrands && category) {
      const filterBrands = allBrands.filter(
        (brand) => brand.categoryId === category.categoryId
      );
      setCategoryBrands(filterBrands);
    }
  }, [allBrands, category]);

  if (loading || brandLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow mx-12">
        <Heading
          className="mt-28 my-8 text-orange-500"
          value1={category.categoryName}
        />
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-9 mb-48">
          {categoryBrands && categoryBrands.length > 0 ? (
            categoryBrands.map((brand) => (
              <CategoryItem
                key={brand.brandId}
                name={brand.brandName}
                img={brand.logo}
                onClick={() =>
                  navigate(`/brand/${brand.brandId}`, { state: { brand } })
                }
              />
            ))
          ) : (
            <div>No Brands available</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OneCategoryScreen;
