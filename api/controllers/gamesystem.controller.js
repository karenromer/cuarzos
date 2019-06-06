'use strict';
const _ = require('lodash');
const util = require('util');	// Required in swagger sample controller
var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
//var shortid = require('shortid');


const { piedras } = require('../models');	// Sequelize

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////


// Module Name
const MODULE_NAME = '[gamesystem.controller]';

// Error Messages
const GS_CT_ERR_GAMESYSTEM_NOT_FOUND = 'Gamesystem not found';

// Success Messages
const GS_CT_DELETED_SUCCESSFULLY = 'Gamesystem deleted successfully';

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////
function getPiedrasbyId(req, res) {
  //console.log("operadores.controller getOperadorById");
  try {

    console.log(req.swagger.params.id.value);
    var id = req.swagger.params.id.value;
   
    console.log("gamesystem by id..." + id);
    //console.log(gamesystems);

    piedras.findByPk(id)
    .then(mypiedra => {
    console.log(mypiedra);
    res.status(200).send(mypiedra);
   })

  } catch (error) {
    console.log("Was an error");
    controllerHelper.handleErrorResponse(MODULE_NAME, getPiedrabyId.name, error, res);
  }
}

function getPiedras(req, res) {

  try {
        
   console.log("piedras...");
   console.log(piedras);
   piedras.findAll({
    /*include: [{
      model: orderstatus
     
    }]

    include: [{ all: true, nested: true }]*/
      })
   .then((mypiedras) => {
     console.log(mypiedras);
     res.status(200).send(mypiedras);
     //utils.writeJson(res, consoles);
   }, (error) => {
     res.status(500).send(error);
   });

  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, getPiedras.name, error, res);
  }
}

function updatePiedras(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  //console.log("operadores.controller getOperadorById");
  try {
    var id = req.swagger.params.id.value;
   
    console.log("params : " + id);
    var myupdatepiedra = req.body;
    console.log("update gamesystems ... " + myupdatepiedra.name + " " + myupdatepiedra.descripcion);
 

    piedras.findByPk(id)
      .then(mypiedra => {
        console.log("Result of findById: " + mypiedra);
        if (!mypiedra) {
          res.status(401).send(({}));
        
        }
        return mypiedra
          .update({ 
            name: myupdatepiedra.name, 
            description: myupdatepiedra.description 
           })
          .then(() => res.status(200).send(mypiedra) )
          .catch(error => res.status(403).send(mypiedra));
        })
      .catch(error => {
          console.log("There was an error: " + error);
          //resolve(error);
    });

  } catch (error) {
      console.log("Was an error");
      controllerHelper.handleErrorResponse(MODULE_NAME, updatePiedras.name, error, res);
  }

}

function addPiedras(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  try {

    console.log("params : ");
    var mypiedra = req.body;
    console.log("gamesystems ... " + mypiedra);
 
      return piedras
        .create({
          name: mypiedra.name,
          colour: mypiedra.colour,
          description: mypiedra.description,
         
        }, {
        /*  include: [{
            model: order_detail,
            as: 'orderdetail'
          }] */
        })
        .then((mypiedra) => {
          res.status(201).send(mypiedra);
              
        })
        .catch((error) => res.status(400).send(error));
    

  } catch (error) {
    console.log("Was an error");
    controllerHelper.handleErrorResponse(MODULE_NAME, addPiedras.name, error, res);
  }
}


function deletePiedras(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');
 
  console.log(req.swagger.params.id.value);
  var id = req.swagger.params.id.value;
 
  piedras
    .findByPk(id)
    .then(mypiedra => {
      console.log("Result of findById: " + mypiedra);
      if (!mypiedra) {
        res.status(200).send({"success": 0, "description":"not found !"});
      }
      else
      {
      return mypiedra
        .destroy()
        .then(() => res.status(200).send({"success": 1, "description":"deleted!"}))
        .catch(error => res.status(403).send({"success": 0, "description":"error !"}))
      }
    })
    .catch(error => {
      console.log("There was an error: " + error);
    });


}

module.exports = {
  getPiedrasbyId,
  getPiedras,
  updatePiedras,
  addPiedras,
  deletePiedras,
  GS_CT_ERR_GAMESYSTEM_NOT_FOUND,
  GS_CT_DELETED_SUCCESSFULLY,
  MODULE_NAME
}