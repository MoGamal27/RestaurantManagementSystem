const appError = require('../utils/appError');
const asyncHandler = require('express-async-handler');



 exports.createOne = (Model) =>
    asyncHandler(async (req, res, next) => {
      const model = await Model.create(req.body);
  
      
      res.status(201).json({
        status: 'success',
        data: {
          model,
        },
      });
    });



exports.getAll = (Model) =>
    asyncHandler(async (req, res, next) => {
      const models = await Model.findAll();
      
    
      res.status(200).json({
        status: 'success',
        results: models.length,
        data: {
          models,
        },
      });
    });
  
    exports.getOne = (Model) =>
        asyncHandler(async (req, res, next) => {
          const { id } = req.params;

          if (!id) {
            return next(new appError('Please provide id', 400));
          }
          
          const model = await Model.findByPk(id);
      
         
          if (!model) {
            return next(new appError(`No model found for this id ${id}`, 404));
          }
      
          
          res.status(200).json({
            status: 'success',
            data: {
              model,
            },
          });
        });

        exports.updateOne = (Model) =>
            asyncHandler(async (req, res, next) => {
              const { id } = req.params;
              const model = await Model.findByPkAndUpdate(id, req.body, {
                new: true,
                runValidators: true,
              });
          
              
              if (!model) {
                return next(new appError(`No model found for this id ${id}`, 404));
              }
          
             
              res.status(200).json({
                status: 'success',
                data: {
                  model,
                },
              });
            });
          
            exports.deleteOne = (Model) =>
                asyncHandler(async (req, res, next) => {
                  const { id } = req.params;
                  const model = await Model.findByIdAndDelete(id);
              
                  
                  if (!model) {
                    return next(new appError(`No model found for this id ${id}`, 404));
                  }
              
                 
                  res.status(204).send();
                });

              
      