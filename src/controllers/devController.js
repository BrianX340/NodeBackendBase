
module.exports = {
    test: (req,res) => {
        try{
            return res.send('asd')
        }
        catch (e){
            console.error(e)
            return res.status(500).json({status:'error'})
        }
    }
};

