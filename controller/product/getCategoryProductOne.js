const productsModel = require("../../models/productsModel");

const getCategoryProduct = async (req, res) => {
    try {
        const productCategory=await productsModel.distinct("category")

        // console.log("category",productCategory)
         
        //array to store one product from each category

        const productByCategory=[]
        for(const category of productCategory){
            const product =await productsModel.findOne({category})
            if(product){
                productByCategory.push(product)
            }
        }

        res.json({
            message:"category product",
            data:productByCategory,
            success:true,
            error:false
        })


    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

module.exports=getCategoryProduct