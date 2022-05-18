const model = require('../model');
const { successResponse, errorResponse } = require('../utils/response')

module.exports = {
    async askQue(req, res) {
        try {
            const { grade, category, question } = req.body;
            const user = req;
            console.log(grade, category, question);
            const saveQuestion = await model.Question.create({
                grade,
                category,
                question,
                
            });
            return successResponse(res, 200, {
                status: true,
                massage: 'successfully Posted Question',
                data: saveQuestion
            });

        } catch (error) {
            return errorResponse(res, 500, error.message)
        }
    },

    async getAllQue(req, res) {
        try {
            const allQue = await model.Question.find({});
            if (allQue.length > 0) {
                return successResponse(res, 200, {
                    status: true,
                    massage: 'Successfully Fetch All Questions',
                    data: allQue
                })
            }
            successResponse(res, 200, 'No question available')
        } catch (error) {
            return errorResponse(res, 500, error.massage);
        }
    },

    async upVoteQue(req, res) {
        const { id } = req.params;
        const user = req;
        
        try {
            const question = await model.Question.findOne({
                _id: id,
                voters: { $all: [user._id] }
            });
            if (!question) {
                const upVoteQue = await model.Question.findOneAndUpdate(
                    { _id: id },
                    { $push: { voters: user._id }, $inc: { vote: 1 } },
                    { new: true }
                );
                return successResponse(res, 200, 'Successfully up voted question')
            } else {
                return errorResponse(res, 400, 'You can only up vote once')
            }
        } catch (error) {
            return errorResponse(res, 500, error.message)
        }
    },

    async downVoteQue(req, res) {
        const { id } = req.params;
        const user = req;

        try {
            const question = await model.Question.findOne({
                _id: id,
                voters: { $all: [user._id] }
            });
            if (!question) {
                const downVoteQue = await model.Question.findOneAndUpdate(
                    { _id: id },
                    { $push: { voters: user._id }, $inc: { vote: -1 } },
                    { new: true }
                );
                return successResponse(res, 200, 'Successfully down voted',);
            } else {
                return errorResponse(res, 400, 'You have already down voted');
            }
        } catch (error) {
            return errorResponse(res, 500, error.message);
        }
    },

    async answerQuestion(req, res) {
        const { id } = req.params;
        const user  = req;
        const { answer } = req.body;
        try {
            const answerQuestion = await model.Question.findOneAndUpdate(
                { _id: id },
                {
                    $push: { answers: [{ answer: answer, userId: user._id }] }
                },

                { new: true }
            );
            return successResponse(res, 200, 'Successfully answered question', answerQuestion)
        } catch (error) {
            return errorResponse(res, 500, error.massage)
        }
    },

    async upvoteAnswer(req, res) {
        const { id } = req.params;
        const  user  = req;
        try {
            const answer = await model.Question.findOne({
                'answers._id': id,
                'answers.voters': { $all: [user._id] }
            }); console.log(answer);
            if (!answer) {
                const upVoteAns = await model.Question.findOneAndUpdate(
                    { 'answers._id': id },
                    { $push: { 'answer.voters': user._id }, $inc: { 'answers.vote': 1 } },
                    { new: true }
                );
                return successResponse(res, 200, 'Successfully up vote answer', upVoteAns)
            } else {
                return errorResponse(res, 400, 'You can only up vote once');
            }
        } catch (error) {
            return errorResponse(res, 500, error.message);
        }
    },
};