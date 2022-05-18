const { successResponse, errorResponse } = require('../utils/response');
const { generateToken, decodeToken } = require('../utils/jwt');
const model = require('../model/index');

module.exports = {
    async SignUp(req, res) {
        try {
            const user = await model.User.create(req.body);
            const token = await generateToken(user);
            return successResponse(res, 201, "successfully created user", {
                user,
                token
            })
        } catch (error) {
            return errorResponse(res, 500, error.message)
        }
    },

    async SignIn(req, res, next) {
        try {
            const user = await model.User.findOne({ email: req.body.email }).select(
                '+password'
            );

            if (!user) {
                return errorResponse(res, 401, 'passsword or userName is incorrect');
            }
            const confirm = user.comparePassword(req.body.password);
            if (!confirm) {
                return errorResponse(res, 401, 'invalid credentials');
            }
            const token = await generateToken(user);
            const userInfo = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            };

            return successResponse(res, 200, 'successfully logged in', {
                userInfo,
                token
            });
        } catch (error) {
            return errorResponse(res, 500, error.message)
        }
    },

};