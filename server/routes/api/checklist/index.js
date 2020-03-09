const express = require('express');
const getChecklist = require('./get-checklist');
const createChecklistItem = require('./create-checklist-item');
const updateChecklistItem = require('./update-checklist-item');
const toggleComplete = require('./toggle-complete');
const deleteChecklistItem = require('./delete-checklist-item');
const router = express.Router();

router.use('/get-checklist/', getChecklist);
router.use('/create-checklist-item', createChecklistItem);
router.use('/update-checklist-item', updateChecklistItem);
router.use('/toggle-complete', toggleComplete);
router.use('/delete-checklist-item', deleteChecklistItem);

module.exports = router;
