const { Model } = require('sequelize')
const Sequelize = require('sequelize')
const bcrypt = require('bcryptjs')

class User extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            provider: Sequelize.BOOLEAN
        },
        {
            sequelize
        })

        this.addHook('beforeSave', async user => {
            if(user.password) {
                return user.password_hash = await bcrypt.hash(user.password, 8)
            }
        })

        return this
    }

    static association(models) {
        this.belongsTo(models.Files, { foreignKey: 'avatar_id', as: 'avatar' })
    }

    async checkPassword(password) {
        return bcrypt.compare(password, this.password_hash)
    }
    
}

module.exports = User