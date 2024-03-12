/**
 * Middleware function to convert string fields to arrays based on delimiter.
 * @param {...string} args - List of field names to be converted to arrays.
 * @returns {Function} - Express middleware function.
 */
const stringToArray = function(...args) {
    return function(req, res, next) {
        const fields = args;
        fields.forEach(field => {
            if(req.body[field]){
                if(typeof req.body[field] == "string"){
                    if(req.body[field].indexOf("#") >=0){
                        // Split string by '#' delimiter and trim each item
                        req.body[field] = (req.body[field].split("#")).map(item => item.trim())
                    }else if(req.body[field].indexOf(",") >=0){
                        // Split string by ',' delimiter and trim each item
                        req.body[field] = (req.body[field].split(",")).map(item => item.trim())
                    }else{
                        // Convert single string to array with single item
                        req.body[field] = [req.body[field]]
                    }
                }
                // Trim each item in array
                if(Array.isArray(req.body[field])){
                    req.body[field] = req.body[field].map(item => item.trim())
                    // Remove duplicates from array
                    req.body[field] = [... new Set(req.body[field])]
                }
            }else{
                // Set field to empty array if it doesn't exist in request body
                req.body[field] = []
            }
        })
        next()
    }
}

// Export the stringToArray middleware function
module.exports = {
    stringToArray
}
