import Brand from "../Models/Brand.js";
import BrandLocations from "../Models/BrandLocations.js";
import BrandLocationSchema from "../validators/brandLocationsValidator.js";
const getBrandLocation = async (req, res) => {
  try {
    const { brandId } = req.params;
    const BrandLocation = await BrandLocations.findOne({ where: { brandId } });
    if (!BrandLocation) {
      return res
        .status(404)
        .json({ Status: "Not Found", Message: "Brand was not Found" });
    }
    res.status(200).json({
      Status: " Found",
      Message: "Brand Location Found",
      data: BrandLocation,
    });
  } catch (err) {
    res.status(500).json({
      Status: "Error",
      Message: "There was an error",
      Error: err.Message,
    });
  }
};
const addLocation = async (req, res) => {
  try {
    const { error } = BrandLocationSchema.validate(req.body);
    if (error) {
      return res
        .status(403)
        .josn({ Status: "Error", Message: error.details[0].message });
    }
    const { brandId, country, city, street, workingDays, startHour, endHour } =
      req.body;
    const ExistingBrand = await Brand.findByPk(brandId);
    if (!ExistingBrand) {
      return res
        .status(404)
        .json({ Status: "Not Found", Message: "Brand Not Found" });
    }
    const brandLocation = await BrandLocations.create({
      brandId,
      country,
      city,
      street,
      startHour,
      workingDays,
      endHour,
    });
    res.status(201).json({
      Status: "Success",
      Message: "Brand Location added successfully",
      Data: brandLocation,
    });
  } catch (err) {
    res.status(500).json({
      Status: "Error",
      Message: "There was an error",
      Error: err.Message,
    });
  }
};
const updateLocation = async (req, res) => {
  try {
    const { brandLocationId } = req.params;
    const Location = await BrandLocations.findByPk(brandLocationId);
    if (!Location) {
      return res
        .status(404)
        .json({ Status: "Not Found", Message: "Brand Locaiton Not Found" });
    }
    const {brandId,country,city,street,workingDays,startHour,endHour} = req.body;
    await BrandLocations.update({
      brandId,
      country,
      city,
      street,
      workingDays,
      startHour,
      endHour
    },{
      where : {brandLocationId}
    });
    const updatedLocation = await BrandLocations.findByPk(brandLocationId);
    res
      .status(200)
      .json({
        Status: "Found",
        Message: "Brand Location Updated",
        "data":updatedLocation
      });
  } catch (err) {
    res.status(500).json({
      Status: "Error",
      Message: "There was an error",
      Error: err.Message,
    });
  }
};
const deleteLocation = async(req,res)=>{
  try{
    const {brandLocationId} = req.params;
    const Location = await BrandLocations.findByPk(brandLocationId);
    if (!Location) {
      return res
        .status(404)
        .json({ Status: "Not Found", Message: "Brand Locaiton Not Found" });
    }
    await BrandLocations.destroy({where:{brandLocationId}});
    res.status(201).json({
      "Status":"Success",
      "Message":"BrandLocation Deleted"
    })
  }catch(err){
    res.status(500).json({
      Status: "Error",
      Message: "There was an error",
      Error: err.Message,
    });
  }
}
export default { addLocation, getBrandLocation ,updateLocation,deleteLocation};
