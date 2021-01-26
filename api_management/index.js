console.log("Heloo API");
const express =  require('express');
const sprintTrackerGrid = require('./sprintTracker/sprintTrackerGridData')
const saveSprintData = require('./sprintTracker/saveSprintTrackerData')
const routes = express.Router();

routes.use('/getSprintTrackerGrid.do',sprintTrackerGrid);
routes.use('/saveSprintTrackerData.do',saveSprintData);
console.log("testing")
module.exports = routes