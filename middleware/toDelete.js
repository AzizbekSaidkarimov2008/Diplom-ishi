const fs = require('fs')
const path = require('path')

const filePath = path.join(require.main.filename)
// console.log(filePath);

module.exports = async (fileName) => {
    if (fileName) {
        await fs.unlink(filePath + '/../../public/image/' + fileName, (err) => {
            if (err) {
                console.log(err);
            }
        })
    }
}