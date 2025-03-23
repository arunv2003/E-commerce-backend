const userModel = require("../../models/userModel");

const updateUser = async (req, res) => {
    try {
        const sessionUser = req.userId; 
    
        const { userId, name, email, role } = req.body;

        const payload = {
            ...(email && { email }),
            ...(name && { name }),
            ...(role && { role }),
        };
        
        // Fetch the current user (to check role)
        const user = await userModel.findById(sessionUser);
       
        if (!user) {
            return res.status(403).json({
                message: "Unauthorized: User not found",
                success: false,
                error: true
            });
        }
      

        // Update the user
        const updatedUser = await userModel.findByIdAndUpdate(userId, payload, { new: true });
       

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: true
            });
        }

        res.json({
            data: updatedUser,
            message: "User update successful",
            success: true,
            error: false
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            success: false,
            error: true
        });
    }
};

module.exports = updateUser;
