const express = require("express");

const router = express.Router();

const homeController = require('../controllers/home.controller');
const lessonsController = require('../controllers/lessons.controller');
const employeesController = require('../controllers/employee.controller');
const membersController = require('../controllers/members.controller');
const managerController = require('../controllers/manager.controller');

router.get('/', homeController.getHomePage);

router.get('/manager',managerController.getManagerPage);
router.get('/totalNumbers',managerController.getTotalNumbers);
router.get('/activeMembers',managerController.getActiveMembers);
router.get('/bestTrainer',managerController.getBestTrainer);
router.get('/youngestMembers',managerController.getYoungestMembers);
router.get('/seniorTrainers',managerController.getSeniorTrainers);
router.get('/private_group_trainers',managerController.getPrivateAndGroupTrainers);

router.get('/lessons', lessonsController.getLessonsPage);
router.get('/groupLesson', lessonsController.getGroupLessonsPage);
router.get('/privateLesson', lessonsController.getPrivateLessonsPage);

router.get('/employees', employeesController.getEmployeePage);
router.get('/trainers', employeesController.getTrainerPage);

router.get('/members', membersController.getMembersPage);
router.get('/add', membersController.addMemberPage);
router.get('/delete/:id', membersController.deleteMember);
router.post('/add', membersController.addMember);
router.get('/enrollments', membersController.getEnrollments);

module.exports = router;
