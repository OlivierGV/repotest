import jetValidator from 'jet-validator';
import { Router, Request, Response, NextFunction } from 'express';

import Paths from '../common/Paths';
import PersonnageRouge from './PersonnageRoute';
import Personnage from '@src/models/Personnage';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

// **** Variables **** //

const apiRouter = Router(), validate = jetValidator();

// ** Validation d'un personnage ** //
function ValidatePersonnage(req: Request, res: Response, next: NextFunction) {
    if (req.body === null) {
      res
        .status(HttpStatusCodes.BAD_REQUEST)
        .send({ error: 'Personnage requis' })
        .end();
      return;
    }
  
    if (req.body.personnage === null) {
      res
        .status(HttpStatusCodes.BAD_REQUEST)
        .send({ error: 'Personnage requis' })
        .end();
      return;
    }
  
    const nouveauPersonnage = new Personnage(req.body.personnage);
    const error = nouveauPersonnage.validateSync();
    if (error !== null && error !== undefined) {
      res.status(HttpStatusCodes.BAD_REQUEST).send(error).end();
    } else {
      next();
    }
  }
  

// ** Add UserRouter ** //

// Init router
const personnageRouter = Router();

personnageRouter.get(Paths.Personnages.GetAll, PersonnageRouge.getAll);
personnageRouter.get(Paths.Personnages.GetOne, PersonnageRouge.getOne);
personnageRouter.get(Paths.Personnages.GetByNiveau, PersonnageRouge.getByNiveau);
personnageRouter.get(Paths.Personnages.orderByDate, PersonnageRouge.orderByDate);
personnageRouter.post(Paths.Personnages.Add, PersonnageRouge.add);
personnageRouter.put(Paths.Personnages.Update, PersonnageRouge.update);
personnageRouter.delete(Paths.Personnages.Delete, PersonnageRouge.delete);


// Add UserRouter
apiRouter.use(Paths.Personnages.Base, personnageRouter);


// **** Export default **** //

export default apiRouter;
