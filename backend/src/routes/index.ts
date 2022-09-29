import express, { Router } from "express";

const router = Router();

const root = __dirname.replace(/(\/|\\)(backend(\/|\\)dist(\/|\\)routes)(\/|\\){0,1}$/gi, '');
console.log("a raiz", root);

router.use("/assets/", express.static(`${root}/web/assets/`))
router.use("/", express.static(`${root}/web/dist`));

export default router;