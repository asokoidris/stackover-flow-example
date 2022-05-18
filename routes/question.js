const express = require('express');
const controller = require('../controllers/question');
const validation = require('../validation/question');
const UserValidators = require('../validation/userAuth')

const router = express.Router();


router.post('/askQuestion',
    UserValidators.validatorUserToken,
    validation.validateAskQue,
    controller.askQue
);

router.get('/',
    controller.getAllQue
);

router.post('/questionUpVote/:id',
    UserValidators.validatorUserToken,
    validation.validateQue,
    controller.upVoteQue
);

router.post('/questionDownVote/:id',
    UserValidators.validatorUserToken,
    validation.validateQue,
    controller.downVoteQue
);

router.post('/answer/:id',
    UserValidators.validatorUserToken,
    controller.answerQuestion
);

router.post('/answerUpVote/:id',
    UserValidators.validatorUserToken,
    controller.upvoteAnswer
);

router.post('/answerDownVote/:id',
    UserValidators.validatorUserToken
);


module.exports = router;